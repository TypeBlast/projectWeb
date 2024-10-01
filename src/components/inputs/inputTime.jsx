import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const InputTime = ({ availableTimes, appointmentTime, onTimeChange }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="time-select-label">Hora da Consulta</InputLabel>
      <Select
        labelId="time-select-label"
        id="time-select"
        value={appointmentTime}
        onChange={onTimeChange}
        label="Hora da Consulta"
      >
        {availableTimes.map((time) => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputTime;
