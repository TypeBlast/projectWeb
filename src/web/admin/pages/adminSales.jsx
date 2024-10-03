import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "../../../axios/axios"; 

function AdminSales() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.getAllOrders(); 
      const ordersData = response.data.data;
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
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
              <Card sx={{ margin: "10px" }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Pedido ID: {order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cliente: {order.customerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: R$ {order.total.toFixed(2)}
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
