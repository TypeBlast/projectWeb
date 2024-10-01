import React from "react";
import { TextField, Box } from "@mui/material";

function InputComplement({ value, onChange }) {
  return (
    <TextField
      label="Complemento"
      value={value}
      onChange={onChange}
      fullWidth
      sx={{ marginTop: "15px" }}
    />
  );
}

export default InputComplement;
