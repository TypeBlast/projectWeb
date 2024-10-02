import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const InputTime = ({ appointmentTime, setAppointmentTime }) => {
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const generateAvailableTimes = () => {
      const times = [];
      for (let hour = 8; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
          times.push(time);
        }
      }
      setAvailableTimes(times);
    };

    generateAvailableTimes();
  }, []);

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px', fontSize: '20px', color: "#D9D9D9" }} />
      <FormControl variant="standard" sx={{ width: '220px' }}>
        <InputLabel sx={{ color: '#D9D9D9' }}>Hora da Consulta</InputLabel>
        <Select
          value={appointmentTime}
          onChange={handleTimeChange}
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
          {availableTimes.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default InputTime;
