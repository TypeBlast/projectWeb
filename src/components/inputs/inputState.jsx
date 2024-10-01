import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';

function InputState({ states, value, onChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faMap} style={{ marginRight: '10px', marginTop: "20px", fontSize: '20px', color: "#D9D9D9" }} />
      <FormControl variant="standard" sx={{ width: '220px', margin: "2px" }}>
        <InputLabel sx={{ color: '#D9D9D9' }}>Estado</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          label="Estado"
          sx={{
            '& .MuiInputBase-input': {
              color: '#333',
            },
            '& .Mui-focused .MuiInputLabel-root': {
              color: '#A8A8A8',
            },
            '& .MuiInput-underline:before': {
              borderBottomColor: '#D9D9D9',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#A8A8A8',
            },
          }}
        >
          {states.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default InputState;
