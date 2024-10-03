import React from "react";
import { TextField, Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

function InputPrice({ value, onChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon 
        icon={faDollarSign} 
        style={{ marginRight: '10px', marginTop: "20px", fontSize: '20px', color: "#D9D9D9" }} 
      />
      <TextField
        id="price"
        label="Preço do Produto"
        variant="standard"
        value={value} // Define o valor do input
        onChange={onChange} // Define a função de alteração
        type="number" // Tipo numérico para o preço
        placeholder="0.00" // Placeholder para o preço
        inputProps={{ 
          min: "0", // Impede valores negativos
          step: "0.01" // Permite valores decimais
        }}
        sx={{
          margin: "2px",
          width: '220px', // Controla o tamanho
          '& label': {
            color: '#D9D9D9', // Cor do label
          },
          '& label.Mui-focused': {
            color: '#A8A8A8', // Cor do label quando focado
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#D9D9D9', // Cor da linha inferior antes do foco
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#A8A8A8', // Cor da linha inferior quando focado
          },
          '& .MuiInputBase-input': {
            color: '#333', // Cor do texto digitado
          },
        }}
      />
    </Box>
  );
}

export default InputPrice;
