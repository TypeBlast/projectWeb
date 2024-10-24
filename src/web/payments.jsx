import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sheets from "../axios/axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAt,
  faIdCard,
  faPhone,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Payments = () => {
  const [cartId, setCartId] = useState(null);
  const [cartSummary, setCartSummary] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getCartId = async () => {
    try {
      const response = await sheets.getCart();
      console.log("Response getCart:", response);
      const cart = response.data?.data?.cart;
      if (cart && cart.id) {
        setCartId(cart.id);
        console.log("Cart ID found:", cart.id);
      } else {
        throw new Error("Cart ID not found in the response.");
      }
    } catch (err) {
      setError(err);
      console.error("Error in getCartId:", err);
    }
  };

  const getCartSummary = async () => {
    if (!cartId) return;

    try {
      const response = await sheets.getCartSummary(cartId);
      console.log("Response getCartSummary:", response);
      if (response.data) {
        console.log("Cart Summary Data:", response.data);
        setCartSummary(response.data);
      } else {
        throw new Error("Cart summary not found in the response.");
      }
    } catch (err) {
      setError(err);
      console.error("Error in getCartSummary:", err);
    }
  };

  const getAddresses = async () => {
    try {
      const response = await sheets.getAddressByUser();
      console.log("Response getAddresses:", response);
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        setAddresses(response.data.data);
        console.log("Addresses found:", response.data.data);
      } else {
        throw new Error("No addresses found or invalid response format.");
      }
    } catch (err) {
      setError(err);
      console.error("Error in getAddresses:", err);
    }
  };

  const getUserData = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const user = JSON.parse(storedUser);
        setUserData(user);
      } catch (error) {
        console.error("Erro ao fazer parse dos dados do usuário", error);
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  };

  // Função para processar o pagamento
  const processPayment = async () => {
    if (!cartId || !selectedAddress || !paymentMethod) {
      alert(
        "Por favor, selecione um endereço e um método de pagamento para o pagamento."
      );
      return;
    }

    const paymentData = {
      cartId: cartId,
      addressId: selectedAddress,
      paymentMethod: paymentMethod,
    };

    console.log("Payment Data before sending:", paymentData);

    try {
      const response = await sheets.processPayment(paymentData);
      console.log("Response processPayment:", response);
      alert("Pagamento realizado com sucesso!");
      setIsModalOpen(false);
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } catch (err) {
      setError(err);
      console.error(
        "Erro ao processar pagamento:",
        err.response?.data?.message || err.message
      );
      alert(
        "Erro ao processar pagamento: " +
          (err.response?.data?.message || "Erro desconhecido.")
      );
    }
  };

  const clearCart = async () => {
    try {
      await sheets.clearCart(cartId);
      alert("Carrinho limpo com sucesso!");
      window.location.reload();
    } catch (err) {
      setError(err);
      console.error("Erro ao limpar o carrinho:", err);
      alert(
        "Erro ao limpar o carrinho: " +
          (err.response?.data?.message || "Erro desconhecido.")
      );
    }
  };

  useEffect(() => {
    getCartId();
    getAddresses();
    getUserData();
  }, []);

  useEffect(() => {
    getCartSummary();
  }, [cartId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#fff",
        maxWidth: "900px",
        margin: "75px auto", // Centraliza horizontalmente com margem superior
        padding: "0 5%", // Adiciona um padding lateral de 5%
      }}
    >
      {cartSummary ? (
        <div style={{ paddingBottom: "20px" }}>
          <TableContainer
            component={Paper}
            style={{
              margin: "20px auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "2px solid #D9D9D9",
              borderRadius: "10px",
              overflow: "hidden",
              minWidth: "300px",
              width: "100%",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              {" "}
              {/* Adicionando scroll horizontal */}
              <Table style={{ marginTop: 4 }}>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#fff" }}>
                    <TableCell
                      style={{
                        color: "#000",
                        fontFamily: "Poppins-SemiBold",
                        fontSize: "1.1rem",
                      }}
                    >
                      Produtos
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#000",
                        fontFamily: "Poppins-SemiBold",
                        fontSize: "1.1rem",
                        textAlign: "center",
                      }}
                    >
                      Quantidade
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#000",
                        fontFamily: "Poppins-SemiBold",
                        fontSize: "1.1rem",
                        textAlign: "center",
                      }}
                    >
                      Preço Unitário
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#000",
                        fontFamily: "Poppins-SemiBold",
                        fontSize: "1.1rem",
                        textAlign: "center",
                      }}
                    >
                      Valor Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartSummary.data.summary.items.map((item, index) => (
                    <TableRow
                      key={index}
                      style={{ "&:hover": { backgroundColor: "#f1f1f1" } }}
                    >
                      <TableCell
                        style={{
                          color: "#000",
                          fontFamily: "Poppins-Regular",
                          padding: "16px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {item.productName || "Produto não encontrado"}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "#000",
                          fontFamily: "Poppins-Regular",
                          padding: "16px",
                          borderBottom: "1px solid #ddd",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "#000",
                          fontFamily: "Poppins-Regular",
                          padding: "16px",
                          borderBottom: "1px solid #ddd",
                          textAlign: "center",
                        }}
                      >
                        R$ {item.price}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "#000",
                          fontFamily: "Poppins-Medium",
                          padding: "16px",
                          borderBottom: "1px solid #ddd",
                          textAlign: "center",
                        }}
                      >
                        R$ {item.totalItemValue}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableContainer>
          <div
            style={{
              display: "flex",
              gap: "50%",
              backgroundColor: "#FFF",
              borderBottom: "2px solid #D9D9D9",
              marginTop: "25px",
              margin: "25px auto 0px auto",
            }}
          >
            <Typography
              style={{
                color: "#000",
                fontFamily: "Poppins-SemiBold",
                fontSize: "1rem",
              }}
            >
              Total de Itens: {cartSummary.data.summary.totalItems}
            </Typography>
            <Typography
              style={{
                color: "#000",
                fontFamily: "Poppins-SemiBold",
                fontSize: {md: "1rem", xs: "0.5rem"},
              }}
            >
              Valor do pedido: R$ {cartSummary.data.summary.totalValue}
            </Typography>
          </div>

          {userData && (
            <Paper
              style={{
                marginTop: "25px",
                border: "2px solid #D9D9D9",
                padding: "16px",
                backgroundColor: "#FFF",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                minWidth: "300px", // Largura mínima de 300px
              }}
            >
              <Typography
                variant="h6"
                style={{
                  color: "#000",
                  fontFamily: "Poppins-SemiBold",
                  textAlign: "center",
                }}
              >
                Confirme seus dados
              </Typography>
              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    sx={{
                      display: "flex",
                      gap: "15px",
                      fontFamily: "Poppins-Regular",
                      color: "#000",
                      fontSize: "1.1rem",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: "#D9D9D9", transform: "scale(1.2)" }}
                    />
                    {userData.name}
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      gap: "15px",
                      fontFamily: "Poppins-Regular",
                      color: "#000",
                      fontSize: "1.1rem",
                      marginTop: "10px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faAt}
                      style={{ color: "#D9D9D9", transform: "scale(1.2)" }}
                    />
                    {userData.email}
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      gap: "15px",
                      fontFamily: "Poppins-Regular",
                      color: "#000",
                      fontSize: "1.1rem",
                      marginTop: "10px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{ color: "#D9D9D9", transform: "scale(1.2)" }}
                    />
                    {userData.phone}
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      gap: "15px",
                      fontFamily: "Poppins-Regular",
                      color: "#000",
                      fontSize: "1.1rem",
                      marginTop: "10px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faIdCard}
                      style={{ color: "#D9D9D9", transform: "scale(1.2)" }}
                    />
                    {userData.cpf}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "30px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              style={{
                fontFamily: "Poppins-Bold",
                textTransform: "unset",
                color: "#fff",
                backgroundColor: "#ED45A1",
                width: "40%",
                marginRight: "10px",
                minWidth: "100px"
              }}
            >
              Fazer Pagamento
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearCart}
              style={{
                fontFamily: "Poppins-Bold",
                textTransform: "unset",
                backgroundColor: "#ED45A1",
                width: "40%",
                minWidth: "100px"
              }}
            >
              Limpar Carrinho
            </Button>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          style={{
            backgroundColor: "#FFF",
            color: "#000",
            fontFamily: "Poppins-Bold",
            textAlign: "center",
          }}
        >
          Pagamento
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#FFF", padding: "20px" }}>
          <Typography
            style={{ fontFamily: "Poppins-Regular", marginBottom: "16px" }}
          >
            Selecione um endereço para o pagamento:
          </Typography>
          <Select
            fullWidth
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            displayEmpty
            style={{
              marginBottom: "16px",
              borderRadius: "4px",
              border: "1px solid #D9D9D9",
            }}
          >
            <MenuItem value="">
              <em>Selecione um endereço</em>
            </MenuItem>
            {addresses.map((address) => (
              <MenuItem key={address.id} value={address.id}>
                {address.complement
                  ? ` Número: ${address.number}, CEP: ${address.cep}, Complemento: ${address.complement}`
                  : address.number}
              </MenuItem>
            ))}
          </Select>
          <Typography
            style={{ fontFamily: "Poppins-Regular", marginBottom: "16px" }}
          >
            Selecione um método de pagamento:
          </Typography>
          <Select
            fullWidth
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            displayEmpty
            style={{ borderRadius: "4px", border: "1px solid #D9D9D9" }}
          >
            <MenuItem value="">
              <em>Selecione um método</em>
            </MenuItem>
            <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
            <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
            <MenuItem value="Pix">Pix</MenuItem>
            <MenuItem value="Boleto">Boleto</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#FFF",
          }}
        >
          <Button
            onClick={processPayment}
            color="primary"
            style={{
              backgroundColor: "#ED45A1",
              color: "#FFF",
              fontFamily: "Poppins-Bold",
              marginRight: "8px",
              textTransform: "unset",
            }}
          >
            Confirmar Pagamento
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            color="primary"
            style={{
              backgroundColor: "#ED45A1",
              color: "#FFF",
              fontFamily: "Poppins-Bold",
              textTransform: "unset"
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Payments;
