import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Button, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios/axios";

function BoxOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.getOrdersByUser();
      const ordersData = response.data.data;
      setOrders(ordersData);
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
      setError("Erro ao buscar pedidos.");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.cancelOrder(orderId);
      fetchOrders();
      setOpenConfirmModal(false);
    } catch (err) {
      console.error("Erro ao cancelar pedido:", err);
      setError("Erro ao cancelar pedido.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.deleteOrder(orderId);
      fetchOrders();
    } catch (err) {
      console.error("Erro ao excluir pedido:", err);
      setError("Erro ao excluir pedido.");
    }
  };

  const openConfirmationModal = (order) => {
    setSelectedOrder(order);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginTop: "50px" }}>
        <Box
          sx={{
            border: "1px solid #BFBFBF",
            borderRadius: "10px",
            width: "80%",
            minWidth: "300px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(191, 191, 191, 0.75)",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}>
            Meus Pedidos
          </Typography>

          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

          {orders.length === 0 ? (
            <Typography>Nenhum pedido encontrado.</Typography>
          ) : (
            <>
              {orders.map((order) => (
                <Grid container key={order.id} sx={{ marginBottom: "10px", borderBottom: "1px solid #D9D9D9", paddingBottom: "10px" }}>
                  <Grid item xs={8}>
                    <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                      Pedido #{order.id} - {order.productName || "Produto não especificado"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} container alignItems="center">
                    <Button
                      onClick={() => openConfirmationModal(order)}
                      sx={{ padding: "0", minWidth: "0", color: "#D9D9D9" }}
                    >
                      <FontAwesomeIcon icon={faTimes} style={{ fontSize: "15px" }} />
                    </Button>
                    {order.status === "cancelado" && (
                      <Button
                        onClick={() => handleDeleteOrder(order.id)}
                        sx={{ padding: "0", minWidth: "0", color: "#D9D9D9", marginLeft: "10px" }}
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ fontSize: "15px" }} />
                      </Button>
                    )}
                  </Grid>
                </Grid>
              ))}
            </>
          )}
        </Box>
      </Grid>

      {/* Modal de Confirmação de Cancelamento */}
      <Modal
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
      >
        <Box
          sx={{
            width: "40%",
            minWidth: "300px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            margin: "auto",
            marginTop: "100px",
          }}
        >
          <Typography id="confirm-modal-title" variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "20px" }}>
            Confirmar Cancelamento
          </Typography>
          <Typography sx={{ textAlign: "center", marginBottom: "20px" }}>
            Você tem certeza que deseja cancelar este pedido?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <Button onClick={handleCloseConfirmModal} sx={{ width: "150px", backgroundColor: "#EB389A", color: "#FFF", fontFamily: "Poppins-Bold", "&:hover": { backgroundColor: "#D5006D" } }}>
              Não
            </Button>
            <Button
              onClick={() => handleCancelOrder(selectedOrder.id)}
              sx={{ width: "150px", backgroundColor: "#EB389A", color: "#FFF", fontFamily: "Poppins-Bold", "&:hover": { backgroundColor: "#D5006D" } }}
            >
              Sim
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxOrders;
