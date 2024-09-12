import React from "react";

import { TextField, Box } from "@mui/material";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

function InputCPF({ value, onChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <FontAwesomeIcon icon={faIdCard} style={{ marginRight: '10px', marginTop: "20px", fontSize: '20px', color: "#D9D9D9" }} />
    <TextField
      id="cpf"
      label="CPF"
      variant="standard"
      value={value} // Define o valor do input
      onChange={onChange} // Define a função de alteração
      sx={{
        margin: "5px",
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

export default InputCPF;
