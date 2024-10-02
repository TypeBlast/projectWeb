import React, { useState, useEffect } from "react";
import sheets from "../axios/axios"; // Importe o seu arquivo de configuração do Axios
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Paper,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const styles = {
  cartContainer: {
    padding: "20px",
  },
  cartList: {
    margin: "0px 20px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 10px",
    marginBottom: "25px",
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "50px",
  },
  productName: {
    fontFamily: "Poppins-Bold",
    color: "#A8A8A8",
    fontSize: "1.1rem",
  },
  productQuantity: {
    marginTop: "5px",
    fontFamily: "Poppins-Regular",
    color: "#A8A8A8",
    fontSize: "0.9rem",
  },
  productPrice: {
    marginTop: "20px",
    color: "#A8A8A8",
    marginRight: "20px",
    fontFamily: "Poppins-Bold",
    fontSize: "1.2rem",
  },
  fixedBox: {
    position: "fixed",
    width: "90%",
    top: "80%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-around",
  },
  buttonHandleClearCart: {
    border: "1.5px solid #BFBFBF",
    color: "#BFBFBF",
    borderRadius: "5px",
    textTransform: "unset",
    fontFamily: "Poppins-Bold",
    padding: "10px 50px",
    width: "25%",
  },
  buttonAddNewItems: {
    border: "1.5px solid #BFBFBF",
    color: "#BFBFBF",
    borderRadius: "5px",
    textTransform: "unset",
    fontFamily: "Poppins-Bold",
    width: "25%",
  },
  buttonFinalizePurchase: {
    backgroundColor: "#EB389A",
    color: "#FFF",
    borderRadius: "5px",
    textTransform: "unset",
    fontFamily: "Poppins-Bold",
    width: "40%",
  },
};

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await sheets.getCart();
      if (response.data && response.data.data && response.data.data.items) {
        setCartItems(response.data.data.items);
      } else {
        setCartItems([]);
      }
      setLoading(false);
    } catch (err) {
      setError("Falha ao carregar o carrinho.");
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0) // Remove o item se a quantidade for 0
    );

    // Lógica para atualizar o backend se necessário
    try {
      await sheets.removeFromCart({ productId, quantity: 1 });
    } catch (err) {
      setError("Falha ao remover o item do carrinho.");
    }
  };

  const handleAddToCart = async (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    // Lógica para atualizar o backend se necessário
    try {
      await sheets.addToCart({ productId, quantity: 1 });
    } catch (err) {
      setError("Falha ao adicionar o item ao carrinho.");
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await sheets.clearCart();
      if (response.status === 200) {
        setCartItems([]);
      }
    } catch (err) {
      setError("Falha ao limpar o carrinho.");
    }
  };

  const addNewItems = () => {
    navigate('/products');
  };

  const handleFinalizePurchase = () => {
    if (cartItems.length === 0) {
      alert("Por favor, adicione algum item ao carrinho antes de finalizar a compra.");
    } else {
      navigate('/payments');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={styles.cartContainer}>
      <Box sx={styles.fixedBox}>
        <Button onClick={handleClearCart} sx={styles.buttonHandleClearCart}>
          {isMd ? (
            <FontAwesomeIcon
              icon={faTrash}
              style={{ fontSize: "15px", color: "#BFBFBF" }}
            />
          ) : (
            <>
              Limpar Carrinho
              <FontAwesomeIcon
                icon={faTrash}
                style={{ fontSize: "15px", color: "#BFBFBF", marginLeft: "10px" }}
              />
            </>
          )}
        </Button>
        <Button onClick={addNewItems} sx={styles.buttonAddNewItems}>
          {isMd ? (
            <FontAwesomeIcon
              icon={faPlus}
              style={{ fontSize: "15px", color: "#BFBFBF" }}
            />
          ) : (
            <>
              Adicionar novo item
              <FontAwesomeIcon
                icon={faPlus}
                style={{ fontSize: "15px", color: "#BFBFBF", marginLeft: "10px" }}
              />
            </>
          )}
        </Button>
        <Button onClick={handleFinalizePurchase} sx={styles.buttonFinalizePurchase}>
          Finalizar compra
        </Button>
      </Box>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Seu carrinho está vazio.</Typography>
      ) : (
        <List sx={styles.cartList}>
          {cartItems.map((item) => (
            <ListItem
              key={item.productId}
              sx={styles.cartItem}
              component={Paper}
            >
              <Box sx={styles.productInfo}>
                <Typography sx={styles.productName}>
                  {item.productName}
                </Typography>
                <Typography sx={styles.productQuantity}>
                  Quantidade: {item.quantity}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginLeft: "auto",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    onClick={() => handleRemoveFromCart(item.productId)} // Remover 1 item
                    sx={{ minWidth: "30px", disabled: item.quantity === 0 }}
                    disabled={item.quantity === 0} // Desabilita se a quantidade for 0
                  >
                    <FontAwesomeIcon
                      icon={faMinus}
                      style={{ fontSize: "20px", color: "#EB1A0E" }}
                    />
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(item.productId)} // Adicionar 1 item
                    sx={{ minWidth: "30px" }}
                    disabled={item.quantity >= 10} // Desabilita se a quantidade for 10 ou mais
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ fontSize: "20px", color: "#4CAF50" }}
                    />
                  </Button>
                </Box>
                <Typography sx={styles.productPrice}>
                  ${parseFloat(item.productPrice).toFixed(2)}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default Cart;
