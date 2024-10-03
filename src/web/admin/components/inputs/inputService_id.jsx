import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConciergeBell } from "@fortawesome/free-solid-svg-icons";

const InputService = ({ services, selectedService, handleServiceChange }) => {
  return (
    <FormControl
      variant="standard"
      fullWidth
      margin="normal"
      sx={{
        maxWidth: "500px",
        width: "90%",
        margin: "0 auto",
      }}
    >
      <InputLabel
        id="service-select-label"
        sx={{ color: "#D9D9D9", fontFamily: "Poppins-Regular" }}
      >
        Serviço
      </InputLabel>
      <Select
        labelId="service-select-label"
        id="service-select"
        value={selectedService}
        onChange={handleServiceChange}
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
        IconComponent={() => (
          <FontAwesomeIcon
            icon={faConciergeBell}
            style={{
              marginRight: "20px",
              fontSize: "1.2rem",
              color: "#BFBFBF",
            }}
          />
        )}
        label="Selecione um Serviço"
      >
        {services && services.length > 0 ? (
          services.map((service) => (
            <MenuItem key={service.id} value={service.id}>
              {service.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Nenhum serviço disponível
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default InputService;
