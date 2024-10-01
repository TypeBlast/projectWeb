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
  useMediaQuery, // Importação correta
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
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
  const isMd = useMediaQuery(theme.breakpoints.down("md")); // Verifica se a tela é md ou menor

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
    try {
      const response = await sheets.removeFromCart({ productId });
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId !== productId)
        );
      } else {
        setError("Falha ao remover o item do carrinho.");
      }
    } catch (err) {
      setError("Falha ao remover o item do carrinho.");
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
        <Button sx={styles.buttonFinalizePurchase}>
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
                <Button onClick={() => handleRemoveFromCart(item.productId)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ fontSize: "20px", color: "#EB1A0E" }}
                  />
                </Button>
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
