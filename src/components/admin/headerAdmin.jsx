import React, { useState } from "react";

// Import MUI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";

//import fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

// Import style
import "../layout/css/style.css";

import { useNavigate, useLocation } from "react-router-dom";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  marginTop: 85,
  marginLeft: 20,
});

const ModalContent = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  outline: "none",
  width: "80%",
  maxWidth: "280px",
  borderRadius: 7,
});

function HeaderAdmin() {
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path); // Chama o hook de navegação
  };

  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "activeButton" : "");
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton
          edge="start"
          color="black"
          aria-label="menu"
          onClick={handleModalOpen}
          sx={{ display: { xs: "block", lg: "none", marginTop: 50 } }}
        >
          <MenuIcon />
        </IconButton>
        <Button
          sx={{
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent", // Remove a cor de fundo ao passar o mouse
              boxShadow: "none", // Remove o box-shadow ao passar o mouse
            },
          }}
          onClick={() => handleNavigation("/home")}
        >
          <Typography
            variant="h6"
            component="div"
            className="logo"
            sx={{ textTransform: "capitalize" }}
          >
            PetExpress
          </Typography>
        </Button>
        <Box sx={{ display: { xs: "none", lg: "flex", marginLeft: "5%" } }}>
          <Button
            className={`buttonHeader ${isActive("/adminProducts")}`}
            onClick={() => handleNavigation("/adminProducts")}
          >
            Produtos
          </Button>
          <Button
            className={`buttonHeader ${isActive("/adminEmployers")}`}
            onClick={() => handleNavigation("/adminEmployers")}
          >
            Funcionários
          </Button>
          <Button
            className={`buttonHeader ${isActive("/adminSales")}`}
            onClick={() => handleNavigation("/adminSales")}
          >
            Vendas
          </Button>
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
              marginLeft: "30%",
              marginTop: "50px",
            },
          }}
        >
          <Button onClick={() => handleNavigation("/adminAppointments")}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{
                fontSize: "20px",
                color: location.pathname === "/adminAppointments" ? "#EB389A" : "#BFBFBF",
              }}
            />
          </Button>
          <Box
            sx={{
              borderLeft: "2px solid #BFBFBF",
              height: "24px",
              margin: "8px 8px",
            }}
          />
          <Button onClick={() => handleNavigation("/adminUsers")}>
            <FontAwesomeIcon
              icon={faUsers}
              style={{
                fontSize: "20px",
                color: location.pathname === "/adminUsers" ? "#EB389A" : "#BFBFBF",
              }}
            />
          </Button>
        </Box>

        <StyledModal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="menu-modal-title"
          aria-describedby="menu-modal-description"
        >
          <ModalContent>
            <List>
              <ListItem button onClick={() => handleNavigation("/adminProducts")}>
                <ListItemText primary="Produtos" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation("/adminEmployers")}>
                <ListItemText primary="Funcionários" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation("/adminSales")}>
                <ListItemText primary="Vendas" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation("/adminAppointments")}>
                <ListItemText primary="Agendamentos" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation("/adminUsers")}>
                <ListItemText primary="Usuários" />
              </ListItem>
            </List>
          </ModalContent>
        </StyledModal>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderAdmin;
