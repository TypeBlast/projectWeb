import React from "react";
import { TextField, Box } from "@mui/material";

function InputCep({ value, onChange }) {
  return (
    <TextField
      label="CEP"
      value={value}
      onChange={onChange}
      fullWidth
      required
      sx={{ marginTop: "15px" }}
    />
  );
}

export default InputCep;
