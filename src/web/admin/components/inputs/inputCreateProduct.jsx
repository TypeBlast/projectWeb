import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function CreateProduct({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    species_id: "",
    price: "",
    stock: "",
    url: ""
  });

  // Atualizar o estado com base nos inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submeter o formulário
  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Nome" name="name" value={formData.name} onChange={handleChange} variant="standard" />
      <TextField label="Descrição" name="description" value={formData.description} onChange={handleChange} variant="standard" />

      {/* Campo para Categoria como TextField de número */}
      <TextField
        label="Categoria ID"
        name="category_id"
        type="number"
        value={formData.category_id}
        onChange={handleChange}
        variant="standard"
      />

      {/* Campo para Espécie como TextField de número */}
      <TextField
        label="Espécie ID"
        name="species_id"
        type="number"
        value={formData.species_id}
        onChange={handleChange}
        variant="standard"
      />

      <TextField label="Preço" name="price" type="number" value={formData.price} onChange={handleChange} variant="standard" />
      <TextField label="Estoque" name="stock" type="number" value={formData.stock} onChange={handleChange} variant="standard" />
      <TextField label="URL da Imagem" name="url" value={formData.url} onChange={handleChange} variant="standard" />

      <Button onClick={handleSubmit} variant="contained">Criar Produto</Button>
    </Box>
  );
}

export default CreateProduct;
