import React from "react";
import InputMask from "react-input-mask";
import { TextField, Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';

function InputCep({ value, onChange }) {
  const handleChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, ''); 
    onChange({ target: { value: newValue } }); 
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faMailBulk} style={{ marginRight: '10px', marginTop: "20px", fontSize: '20px', color: "#D9D9D9" }} />
      <InputMask
        mask="99999-999"
        value={value}
        onChange={handleChange}
        style={{ border: 'none' }}
      >
        {() => (
          <TextField
            id="cep"
            label="CEP"
            variant="standard"
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
        )}
      </InputMask>
    </Box>
  );
}

export default InputCep;
