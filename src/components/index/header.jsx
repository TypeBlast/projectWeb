import React, { useState } from 'react';

// Import MUI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/system';

// Import style
import './css/style.css';

import { useNavigate } from 'react-router-dom';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: 85,
  marginLeft: 20,
});

const ModalContent = styled(Box)({
  backgroundColor: 'white',
  padding: '20px',
  outline: 'none',
  width: '80%',
  maxWidth: '280px',
  borderRadius: 7,
});

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path); // Chama o hook de navegação
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton
          edge="start"
          color="black"
          aria-label="menu"
          onClick={handleModalOpen}
          sx={{ display: { xs: 'block', lg: 'none', marginTop: 50 } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" className="logo">
          PetExpress
        </Typography>
        <Box sx={{ display: { xs: 'none', lg: 'flex', marginLeft: '15%' } }}>
          <Button className="buttonHeader spacingHeader" onClick={() => handleNavigation('/error')}>Produtos</Button>
          <Button className="buttonHeader" onClick={() => handleNavigation('/error')}>Serviços</Button>
          <Button className="buttonHeader" onClick={() => handleNavigation('/error')}>Consultas</Button>
        </Box>
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, marginLeft: 'auto' }}>
        <Button className='buttonLogin' onClick={() => handleNavigation('/login')}>Entrar</Button>
        </Box>
        <StyledModal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="menu-modal-title"
          aria-describedby="menu-modal-description"
        >
          <ModalContent>
            <List>
              <ListItem button onClick={() => handleNavigation('/error')}>
                <ListItemText primary="Produtos" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation('/error')}>
                <ListItemText primary="Serviços" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation('/error')}>
                <ListItemText primary="Consultas" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Entrar" onClick={() => handleNavigation('/login')}/>
              </ListItem>
            </List>
          </ModalContent>
        </StyledModal>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
