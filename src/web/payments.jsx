import React, { useEffect, useState } from "react";
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
  Grid
} from "@mui/material";

const Payments = () => {
  const [cartId, setCartId] = useState(null);
  const [cartSummary, setCartSummary] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [userData, setUserData] = useState(null); 

  
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
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
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
      alert("Por favor, selecione um endereço e um método de pagamento para o pagamento.");
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
      window.location.reload();
    } catch (err) {
      setError(err);
      console.error("Erro ao processar pagamento:", err.response?.data?.message || err.message);
      alert("Erro ao processar pagamento: " + (err.response?.data?.message || "Erro desconhecido."));
      window.location.reload();
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
      alert("Erro ao limpar o carrinho: " + (err.response?.data?.message || "Erro desconhecido."));
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
    <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px", maxWidth: "900px", margin: "0 auto", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", marginTop: 30  }}>
      <Typography variant="h5" gutterBottom style={{ color:'#000', fontFamily:'Poppins-Bold', textAlign:'center', marginTop:'10px' }}>
        Carrinho de Compras PetExpress
      </Typography >
      {cartSummary ? (
        <div>
          
          <TableContainer component={Paper} style={{ marginTop: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
  <Table style={{ marginTop: 4 }}>
    <TableHead>
      <TableRow style={{ backgroundColor: '#f8f8f8' }}>
        <TableCell style={{ color: '#ED45A1', fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>Produto</TableCell>
        <TableCell style={{ color: '#ED45A1', fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>Quantidade</TableCell>
        <TableCell style={{ color: '#ED45A1', fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>Preço Unitário</TableCell>
        <TableCell style={{ color: '#ED45A1', fontFamily: 'Poppins-Bold', fontWeight: 'bold' }}>Valor Total</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {cartSummary.data.summary.items.map((item, index) => (
        <TableRow key={index} style={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
          <TableCell style={{ color: '#000', fontFamily: 'Poppins-Regular', padding: '16px', borderBottom: '1px solid #ddd' }}>
            {item.productName || "Produto não encontrado"}
          </TableCell>
          <TableCell style={{ color: '#000', fontFamily: 'Poppins-Regular', padding: '16px', borderBottom: '1px solid #ddd' }}>{item.quantity}</TableCell>
          <TableCell style={{ color: '#000', fontFamily: 'Poppins-Regular', padding: '16px', borderBottom: '1px solid #ddd' }}>R$ {item.price}</TableCell>
          <TableCell style={{ color: '#000', fontFamily: 'Poppins-Medium', padding: '16px', borderBottom: '1px solid #ddd' }}>R$ {item.totalItemValue}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#f8f8f8', borderTop: '1px solid #ddd', borderRadius: '0 0 8px 8px' }}>
    <Typography style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 15 }}>
      Total de Itens: {cartSummary.data.summary.totalItems}
    </Typography>
    <Typography style={{ color: '#000', fontFamily: 'Poppins-Medium', fontSize: 16 }}>
      Valor do pedido: R$ {cartSummary.data.summary.totalValue}
    </Typography>
  </div>
</TableContainer>


          


          
          {userData && (
  <Paper style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    <Typography variant="h6" style={{ color: '#ED45A1', fontFamily: 'Poppins-Bold', textAlign: 'center' }}>Confirme seus dados:</Typography>
    <Divider style={{ margin: '10px 0' }} />
    <Grid container spacing={2} style={{ marginTop: '10px' }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ padding: '10px', textAlign: 'center', backgroundColor: '#FDEDF6' }}>
          <CardContent>
            <Typography style={{ color: '#000', fontFamily: 'Poppins-Regular' }}>Nome:</Typography>
            <Typography style={{ color: '#000', fontFamily: 'Poppins-Bold' }}>{userData.name}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ padding: '10px', textAlign: 'center', backgroundColor: '#FDEDF6' }}>
          <CardContent>
            <Typography style={{ color: '#000', fontFamily: 'Poppins-Regular' }}>Email:</Typography>
            <Typography style={{ color: '#000', fontFamily: 'Poppins-Bold' }}>{userData.email}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ padding: '10px', textAlign: 'center', backgroundColor: '#FDEDF6' }}>
          <CardContent>
            <Typography style={{ color: '#000', fontFamily: 'Poppins-Regular' }}>Telefone:</Typography>
            <Typography style={{ color: '#000', fontFamily: 'Poppins-Bold' }}>+{userData.phone}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card style={{ padding: '10px', textAlign: 'center', backgroundColor: '#FDEDF6' }}>
          <CardContent>
            <Typography style={{ color: '#000', fontFamily: 'Poppins-Regular' }}>CPF:</Typography>
            <Typography style={{ color: '#000', fontFamily: 'Poppins-Bold' }}>{userData.cpf}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Paper>
)}


<div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
  <Button
    variant="contained"
    onClick={() => setIsModalOpen(true)}
    style={{ fontFamily: "Poppins-Medium", color: '#fff', backgroundColor: '#ED45A1', marginRight: '10px' }}
  >
    Fazer Pagamento
  </Button>
  <Button
    variant="contained"
    color="secondary"
    onClick={clearCart}
    style={{ fontFamily: "Poppins-Medium", backgroundColor: '#ED45A1' }}
  >
    Limpar Carrinho
  </Button>
</div>


        </div>
      ) : (
        <p>Carregando...</p>
      )}

           
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ backgroundColor: '#ED45A1', color: '#FFF', fontFamily: 'Poppins-Bold', textAlign: 'center' }}>
            Pagamento
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
            <Typography style={{ fontFamily: 'Poppins-Regular', marginBottom: '16px' }}>
            Selecione um endereço para o pagamento:
            </Typography>
            <Select
            fullWidth
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            displayEmpty
            style={{ marginBottom: '16px', borderRadius: '4px', border: '1px solid #ED45A1' }} 
            >
            <MenuItem value="">
                <em>Selecione um endereço</em>
            </MenuItem>
            {addresses.map((address) => (
                <MenuItem key={address.id} value={address.id}>
                {address.complement ? ` Número: ${address.number}, CEP: ${address.cep}, Complemento: ${address.complement}` : address.number}
                </MenuItem>
            ))}
            </Select>
            <Typography style={{ fontFamily: 'Poppins-Regular', marginBottom: '16px' }}>
            Selecione um método de pagamento:
            </Typography>
            <Select
            fullWidth
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            displayEmpty
            style={{ borderRadius: '4px', border: '1px solid #ED45A1' }} 
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
        <DialogActions style={{ justifyContent: 'center', padding: '16px', backgroundColor: '#f9f9f9' }}>
            <Button onClick={processPayment} color="primary" style={{ backgroundColor: '#ED45A1', color: '#FFF', fontFamily: 'Poppins-Medium', marginRight: '8px' }}>
            Confirmar Pagamento
            </Button>
            <Button onClick={() => setIsModalOpen(false)} color="primary" style={{ backgroundColor: '#ED45A1', color: '#FFF', fontFamily: 'Poppins-Medium' }}>
            Cancelar
            </Button>
        </DialogActions>
        </Dialog>

    </div>
  );
};

export default Payments;
