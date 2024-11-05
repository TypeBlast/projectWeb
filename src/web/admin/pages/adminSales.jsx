import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Modal } from "@mui/material";
import axios from "../../../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faBan,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

function AdminSales() {
  const [orders, setOrders] = useState([]);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [confirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.getAllOrdersAllUsers();
      const ordersData = response.data.data;
      setOrders(ordersData);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      setOrders([]);
    }
  };

  const handleOpenInfoModal = (order) => {
    setSelectedOrder(order);
    setOpenInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setOpenInfoModal(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async () => {
    try {
      if (selectedOrderId) {
        await axios.deleteOrderByAdmin(selectedOrderId);
        fetchOrders();
        handleCloseConfirmDeleteModal();
      }
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      if (selectedOrderId) {
        await axios.cancelOrderByAdmin(selectedOrderId);
        fetchOrders();
        handleCloseConfirmCancelModal();
      }
    } catch (error) {
      console.error("Erro ao cancelar pedido:", error);
    }
  };

  const handleClickOpenConfirmDelete = (orderId) => {
    setSelectedOrderId(orderId);
    setConfirmDeleteModalOpen(true);
  };

  const handleClickOpenConfirmCancel = (orderId) => {
    setSelectedOrderId(orderId);
    setConfirmCancelModalOpen(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleCloseConfirmCancelModal = () => {
    setConfirmCancelModalOpen(false);
    setSelectedOrderId(null);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
          paddingRight: "140px",
        }}
      >
        <Typography
          sx={{
            marginLeft: "140px",
            fontFamily: "Poppins-Bold",
            fontSize: "1.5rem",
          }}
        >
          Pedidos Realizados
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            border: "1px solid #BFBFBF",
            borderRadius: "10px",
            width: "80%",
            margin: "auto",
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(191, 191, 191, 0.75)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}
          >
            Todos os Pedidos
          </Typography>

          <Grid
            container
            sx={{
              marginBottom: "10px",
              borderBottom: "2px solid #000",
              paddingBottom: "10px",
            }}
          >
            <Grid item xs={12} sm={3}>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Poppins-Bold" }}
              >
                ID do Pedido
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Poppins-Bold" }}
              >
                ID do Usuário
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Poppins-Bold" }}
              >
                Preço
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Poppins-Bold" }}
              >
                Status
              </Typography>
            </Grid>
          </Grid>

          {orders.length > 0 ? (
            orders.map((order) => (
              <Grid
                container
                key={order.orderId}
                sx={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #D9D9D9",
                  paddingBottom: "10px",
                }}
              >
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                    {order.orderId}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins-Regular",
                      color: "text.secondary",
                    }}
                  >
                    {order.userId}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins-Regular",
                      color: "text.secondary",
                    }}
                  >
                    R$ {order.totalValue ? order.totalValue.toFixed(2) : "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins-Regular",
                      color: "text.secondary",
                    }}
                  >
                    {order.status}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    onClick={() => handleOpenInfoModal(order)}
                    sx={{
                      backgroundColor: "#EB389A",
                      color: "#FFF",
                      textTransform: "capitalize",
                      fontSize: "1rem",
                      marginLeft: "10px",
                      "&:hover": { backgroundColor: "#D5006D" },
                    }}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Button>
                  {order.status === "Processando" && (
                    <Button
                      onClick={() =>
                        handleClickOpenConfirmCancel(order.orderId)
                      }
                      sx={{
                        backgroundColor: "#EB389A",
                        color: "#FFF",
                        textTransform: "capitalize",
                        fontSize: "1rem",
                        marginLeft: "10px",
                        "&:hover": { backgroundColor: "#D5006D" },
                      }}
                    >
                      <FontAwesomeIcon icon={faBan} />
                    </Button>
                  )}
                  {order.status === "Cancelado" && (
                    <Button
                      onClick={() =>
                        handleClickOpenConfirmDelete(order.orderId)
                      }
                      sx={{
                        backgroundColor: "#EB389A",
                        color: "#FFF",
                        textTransform: "capitalize",
                        fontSize: "1rem",
                        marginLeft: "10px",
                        "&:hover": { backgroundColor: "#D5006D" },
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))
          ) : (
            <Grid
              container
              sx={{
                marginBottom: "10px",
                borderBottom: "1px solid #D9D9D9",
                paddingBottom: "10px",
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="center"
                >
                  Nenhum pedido disponível.
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>

      {/* Modal de informações do pedido */}
      <Modal
        open={openInfoModal}
        onClose={handleCloseInfoModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            margin: "auto",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Informações do Pedido #{selectedOrder ? selectedOrder.orderId : ""}
          </Typography>
          {selectedOrder && (
            <>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                <strong>ID do Usuário:</strong> {selectedOrder.userId}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                <strong>Itens:</strong>
                {selectedOrder.items
                  .map(
                    (item) =>
                      `${item.productName} (Quantidade: ${item.quantity})`
                  )
                  .join(", ")}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                <strong>Endereço:</strong>
                <div>
                  {selectedOrder.addresses.number},{" "}
                  {selectedOrder.addresses.complement},{" "}
                  {selectedOrder.addresses.city}, {selectedOrder.addresses.cep}
                </div>
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                <strong>Preço Total:</strong> R${" "}
                {selectedOrder.totalValue.toFixed(2)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                <strong>Status:</strong> {selectedOrder.status}
              </Typography>
            </>
          )}

          <Button
            onClick={handleCloseInfoModal}
            sx={{ marginTop: "20px", backgroundColor: "#EB389A", color: "#FFF", "&:hover": { backgroundColor: "#D5006D" } }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>

      {/* Modal de confirmação de cancelamento */}
      <Modal
        open={confirmCancelModalOpen}
        onClose={handleCloseConfirmCancelModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            margin: "auto",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Confirmar Cancelamento
          </Typography>
          <Typography variant="body1">
            Tem certeza que deseja cancelar o pedido #{selectedOrderId}?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={handleCloseConfirmCancelModal}
              sx={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button onClick={handleCancelOrder} color="error">
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal de confirmação de deleção */}
      <Modal
        open={confirmDeleteModalOpen}
        onClose={handleCloseConfirmDeleteModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            margin: "auto",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Confirmar Deleção
          </Typography>
          <Typography variant="body1">
            Tem certeza que deseja deletar o pedido #{selectedOrderId}?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={handleCloseConfirmDeleteModal}
              sx={{
                width: "150px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#D5006D" },
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleDeleteOrder}sx={{
                width: "150px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#D5006D" },
              }}>
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminSales;
