import React from "react";
import { Box, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const InputDate = ({ appointmentDate, setAppointmentDate }) => {
  const handleDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '10px', fontSize: '20px', color: "#D9D9D9" }} />
      <TextField
        label="Data do Agendamento"
        type="date"
        value={appointmentDate}
        onChange={handleDateChange}
        variant="standard"
        sx={{
          width: '220px',
          '& label': { color: '#D9D9D9' },
          '& label.Mui-focused': { color: '#A8A8A8' },
          '& .MuiInput-underline:before': { borderBottomColor: '#D9D9D9' },
          '& .MuiInput-underline:after': { borderBottomColor: '#A8A8A8' },
          '& .MuiInputBase-input': { color: '#333' },
        }}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};

export default InputDate;
