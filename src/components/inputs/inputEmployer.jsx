import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const InputEmployer = ({ employers, selectedEmployer, onEmployerChange }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="employer-select-label">Selecione um funcionário</InputLabel>
      <Select
        labelId="employer-select-label"
        id="employer-select"
        value={selectedEmployer}
        onChange={onEmployerChange}
        label="Selecione um funcionário"
      >
        {employers && employers.length > 0 ? (
          employers.map((employer) => (
            <MenuItem key={employer.id} value={employer.id}>
              {employer.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Nenhum funcionário disponível
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default InputEmployer;
