import React from "react";
import { TextField, Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons'; // Ícone para estoque

function InputStock({ value, onChange }) {
  // Função para permitir apenas números
  const handleChange = (event) => {
    const regex = /^[0-9]*$/; // Aceita apenas números inteiros
    if (event.target.value === "" || regex.test(event.target.value)) {
      onChange(event); // Só permite a mudança se o valor for válido
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon
        icon={faBox}
        style={{
          marginRight: '10px',
          marginTop: "20px",
          fontSize: '20px',
          color: "#D9D9D9",
        }}
      />
      <TextField
        id="stock"
        label="Estoque"
        variant="standard"
        value={value}
        onChange={handleChange} // Utiliza a função customizada
        inputProps={{
          inputMode: 'numeric', // Melhora o suporte para entrada numérica em dispositivos móveis
          pattern: '[0-9]*', // Aceita apenas números
        }}
        sx={{
          margin: "2px",
          width: '220px',
          '& label': {
            color: '#D9D9D9',
          },
          '& label.Mui-focused': {
            color: '#A8A8A8',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#D9D9D9',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#A8A8A8',
          },
          '& .MuiInputBase-input': {
            color: '#333',
          },
        }}
      />
    </Box>
  );
}

export default InputStock;
