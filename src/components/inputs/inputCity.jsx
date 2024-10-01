import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

function InputCity({ cities, value, onChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '10px', marginTop: "20px", fontSize: '20px', color: "#D9D9D9" }} />
      <FormControl variant="standard" sx={{ width: '220px', margin: "2px" }}>
        <InputLabel sx={{ color: '#D9D9D9' }}>Cidade</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          label="Cidade"
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
          {cities.map((city) => (
            <MenuItem key={city.id} value={city.id}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default InputCity;
