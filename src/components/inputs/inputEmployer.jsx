import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const InputEmployer = ({ employers, selectedEmployer, handleEmployerChange }) => {
  return (
    <FormControl
      fullWidth
      margin="normal"
      style={{ border: "1px solid #BFBFBF", borderRadius: "5px" }}
      sx={{
        maxWidth: "500px",
        width: "90%",
        margin: "0 auto",
      }}
    >
      <InputLabel
        id="employer-select-label"
        sx={{ color: "#A8A8A8", fontFamily: "Poppins-Regular" }}
      >
        Funcionário
      </InputLabel>
      <Select
        labelId="employer-select-label"
        id="employer-select"
        value={selectedEmployer}
        onChange={handleEmployerChange}
        IconComponent={() => (
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              marginRight: "20px",
              fontSize: "1.2rem",
              color: "#BFBFBF",
            }}
          />
        )}
        label="Selecione um Funcionário"
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
