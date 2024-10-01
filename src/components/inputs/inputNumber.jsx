import React from "react";
import { TextField, Box } from "@mui/material";

function InputNumber({ value, onChange }) {
  return (
    <TextField
      label="Número"
      value={value}
      onChange={onChange}
      fullWidth
      required
      sx={{ marginTop: "15px" }}
    />
  );
}

export default InputNumber;
