import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Button, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios/axios";

function BoxOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [openItemsModal, setOpenItemsModal] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.getAllOrders();
      const ordersData = response.data || [];
      setOrders(ordersData);
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
      setError("Erro ao buscar pedidos.");
    }
  };

  const handleOpenItemsModal = (orderId, items) => {
    setSelectedOrderId(orderId);
    setSelectedOrderItems(items);
    setOpenItemsModal(true);
  };

  const handleCloseItemsModal = () => {
    setOpenItemsModal(false);
    setSelectedOrderId(null);
    setSelectedOrderItems([]);
  };

  // Função para cancelar o pedido
  // Função para cancelar o pedido e atualizar o status na lista de pedidos
  const handleCancelOrder = async (orderId) => {
    try {
      await axios.cancelOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Cancelado" } : order
        )
      );
    } catch (err) {
      console.error("Erro ao cancelar o pedido:", err);
      setError("Não foi possível cancelar o pedido.");
    }
  };

  // Função para deletar o pedido
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.deleteOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId)); // Atualiza a lista de pedidos
      handleCloseItemsModal(); // Fecha o modal após deletar o pedido
    } catch (err) {
      console.error("Erro ao deletar o pedido:", err);
      setError("Não foi possível deletar o pedido.");
    }
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginTop: "50px" }}>
        <Box
          sx={{
            border: "1px solid #BFBFBF",
            borderRadius: "10px",
            width: { xs: "100%", sm: "80%" },
            minWidth: "300px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(191, 191, 191, 0.75)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}
          >
            Meus Pedidos
          </Typography>

          {error ? (
            <Typography sx={{ color: "red", textAlign: "center" }}>
              {error}
            </Typography>
          ) : orders.length === 0 ? (
            <Typography sx={{ textAlign: "center" }}>
              Nenhum pedido encontrado.
            </Typography>
          ) : (
            // Exibir todos os pedidos
            orders.map((order) => (
              <Grid
                container
                key={order.id}
                sx={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #D9D9D9",
                  paddingBottom: "10px",
                }}
                onClick={() => handleOpenItemsModal(order.id, order.items)}
              >
                <Grid item xs={8}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                    Pedido: #{order.id} -{" "}
                    {order.orderDate || "Data não especificada"} Status{" "}
                    {order.status}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  container
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelOrder(order.id);
                    }}
                    sx={{
                      padding: "0",
                      minWidth: "0",
                      color: "#D9D9D9",
                      "&:hover": { color: "#EB389A" },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ fontSize: "15px" }}
                    />
                  </Button>
                </Grid>
              </Grid>
            ))
          )}
        </Box>
      </Grid>

      {/* Modal para exibir os itens do pedido */}
      <Modal
        open={openItemsModal}
        onClose={handleCloseItemsModal}
        aria-labelledby="items-modal-title"
        aria-describedby="items-modal-description"
      >
        <Box
          sx={{
            width: { xs: "80%", sm: "40%" },
            minWidth: "300px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            margin: "auto",
            marginTop: "100px",
          }}
        >
          <Typography
            id="items-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", marginBottom: "20px" }}
          >
            Itens do Pedido #{selectedOrderId}
          </Typography>
          {selectedOrderItems.length ? (
            selectedOrderItems.map((item, index) => (
              <Box key={index} sx={{ marginBottom: "10px" }}>
                <Typography>Produto: {item.productName}</Typography>
                <Typography>Quantidade: {item.quantity}</Typography>
                <Typography>Preço: R$ {item.price}</Typography>
              </Box>
            ))
          ) : (
            <Typography>Nenhum item encontrado para este pedido.</Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={() => handleDeleteOrder(selectedOrderId)}
              sx={{
                width: "150px",
                backgroundColor: "#FF0000",
                color: "#FFF",
                fontFamily: "Poppins-Bold",
                "&:hover": { backgroundColor: "#CC0000" },
                marginRight: "10px",
              }}
            >
              Deletar Pedido
            </Button>
            <Button
              onClick={handleCloseItemsModal}
              sx={{
                width: "150px",
                backgroundColor: "#EB389A",
                color: "#FFF",
                fontFamily: "Poppins-Bold",
                "&:hover": { backgroundColor: "#D5006D" },
              }}
            >
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxOrders;
