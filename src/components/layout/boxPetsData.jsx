import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function PetModal({ open, onClose, pet, onUpdate }) {
  const [name, setName] = useState(pet.name);
  const [age, setAge] = useState(pet.age);
  const [specie, setSpecie] = useState(pet.specie);
  const [size, setSize] = useState(pet.size);

  const handleUpdate = () => {
    const updatedPet = {
      name,
      age,
      specie,
      size,
    };
    onUpdate(pet.id, updatedPet);
    onClose(); // Fecha o modal após a atualização
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: 24,
          maxWidth: "300px",
          width: "20%",
          margin: "auto",
        }}
      >
        <Typography variant="h6">Atualizar Dados do Pet</Typography>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Idade"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Espécie"
          value={specie}
          onChange={(e) => setSpecie(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tamanho"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button onClick={onClose} variant="outlined">Cancelar</Button>
          <Button onClick={handleUpdate} variant="contained">Atualizar</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PetModal;
