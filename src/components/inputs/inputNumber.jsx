import React from "react";
import { TextField, Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

function InputNumber({ value, onChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faHashtag} style={{ marginRight: '10px', marginTop: "20px", fontSize: '20px', color: "#D9D9D9" }} />
      <TextField
        id="number"
        label="Número"
        variant="standard"
        value={value}
        onChange={onChange}
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

export default InputNumber;
