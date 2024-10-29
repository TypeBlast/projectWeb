import React from "react";
import InputMask from "react-input-mask"; // Importa a biblioteca
import { TextField, Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function InputPhone({ value, onChange }) {
  const handleChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    if (newValue.length <= 11) { // Aceita apenas até 11 dígitos
      onChange({ target: { value: newValue } }); // Passa apenas os dígitos para o onChange
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px', marginTop: "20px", fontSize: '20px', color: "#D9D9D9" }} />
      <InputMask
        mask="(99) 99999-9999" // Aplica a máscara somente se houver valor
        value={value}
        onChange={handleChange}
        style={{ border: 'none' }} // Remove o estilo de underline
      >
        {() => (
          <TextField
            id="phone"
            label="Telefone"
            variant="standard"
            sx={{
              margin: "2px",
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

export default InputPhone;
