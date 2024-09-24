import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";

//import fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  if (!product || product.id !== parseInt(id)) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="95vh"
    >
      <Box
        width="80%"
        maxWidth="900px"
        border="3px solid #BFBFBF"
        borderRadius="15px"
        minHeight="450px"
        paddingBottom="10px"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <img
                src={product.url}
                style={{
                  width: "100%",
                  borderTopLeftRadius: "15px",
                  height: "325px",
                }}
              />
            </Box>
            <Box
              sx={{ flexDirection: "row", display: "flex", marginTop: "25px" }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins-Bold",
                  fontSize: "1.3rem",
                  marginLeft: "25px",
                }}
              >
                {product.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins-Bold",
                  color: "#A8A8A8",
                  fontSize: "1.3rem",
                  marginLeft: "50px",
                  marginTop: "50px",
                }}
              >
                {product.price}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "75px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  width: "350px",
                  fontFamily: "Poppins-Regular",
                  color: "#A8A8A8",
                }}
              >
                {product.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                <Typography
                  sx={{
                    width: "40%",
                    backgroundColor: "#A8A8A8",
                    color: "#FFF",
                    textAlign: "center",
                    borderRadius: "3px",
                    padding: "5px",
                  }}
                >
                  {product.category}
                </Typography>
                <Typography
                  sx={{
                    width: "40%",
                    backgroundColor: "#A8A8A8",
                    color: "#FFF",
                    textAlign: "center",
                    borderRadius: "3px",
                    padding: "5px",
                  }}
                >
                  {product.specie}
                </Typography>
              </Box>
              <Box sx={{marginTop: "100px", display: "flex", justifyContent: "center", gap: "15px"}}>
                <Button sx={{width: "70%", backgroundColor: "#EB389A", fontFamily: "Poppins-Bold", color: "#FFF", textTransform: "capitalize", fontSize: "1.2rem"}}>Comprar</Button>
                <Button sx={{border: "2px solid #BFBFBF", borderRadius: "5px"}}>
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    style={{
                      fontSize: "25px",
                      color:
                        location.pathname === "/cart" ? "#EB389A" : "#BFBFBF",
                    }}
                  />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductDetails;
