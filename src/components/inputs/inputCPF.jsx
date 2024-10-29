import React from "react";
import InputMask from "react-input-mask"; // Importa a biblioteca
import { TextField, Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

function InputCPF({ value, onChange }) {
  const handleChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    onChange({ target: { value: newValue } }); // Passa apenas os dígitos para o onChange
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faIdCard} style={{ marginRight: '10px', marginTop: "20px", fontSize: '20px', color: "#D9D9D9" }} />
      <InputMask
        mask="999.999.999-99" // Máscara de CPF
        value={value}
        onChange={handleChange}
        style={{ border: 'none' }}
      >
        {() => (
          <TextField
            id="cpf"
            label="CPF"
            variant="standard"
            sx={{
              margin: "5px",
              width: '220px',
              '& label': { color: '#D9D9D9' },
              '& label.Mui-focused': { color: '#A8A8A8' },
              '& .MuiInput-underline:before': { borderBottomColor: '#D9D9D9' },
              '& .MuiInput-underline:after': { borderBottomColor: '#A8A8A8' },
              '& .MuiInputBase-input': { color: '#333' },
            }}
          />
        )}
      </InputMask>
    </Box>
  );
}

export default InputCPF;