import React from "react";
import { TextField, MenuItem } from "@mui/material";

function InputState({ states, value, onChange }) {
  return (
    <TextField
      label="Estado"
      select
      value={value}
      onChange={onChange}
      fullWidth
      required
      sx={{ marginTop: "15px" }}
    >
      {Array.isArray(states) && states.map((state) => (
        <MenuItem key={state.id} value={state.id}>
          {state.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default InputState;
