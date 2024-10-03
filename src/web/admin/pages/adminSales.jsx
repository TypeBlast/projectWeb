import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "../../../axios/axios"; 

function AdminSales() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.getAllOrdersAllUsers(); 
      const ordersData = response.data.data;
      console.log(ordersData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container" style={{ padding: "20px" }}>
      {Array.isArray(orders) && orders.length > 0 ? (
        <Grid container spacing={2}>
          {orders.map((order, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${order.orderId}-${index}`}>
              <Card sx={{ margin: "10px" }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Pedido ID: {order.orderId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cliente: {order.userId} {/* Aqui você pode ajustar para o nome correto */}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: R$ {order.totalValue !== undefined ? order.totalValue.toFixed(2) : "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Nenhum pedido disponível.
        </Typography>
      )}
    </div>
  );
}

export default AdminSales;
