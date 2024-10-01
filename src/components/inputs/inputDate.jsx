import React from "react";
import { TextField } from "@mui/material";

const InputDate = ({ appointmentDate, onDateChange }) => {
  return (
    <TextField
      type="date"
      label="Data da Consulta"
      fullWidth
      margin="normal"
      value={appointmentDate}
      onChange={onDateChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default InputDate;
