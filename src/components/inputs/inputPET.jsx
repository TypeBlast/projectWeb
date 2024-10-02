import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const InputPet = ({ pets, selectedPet, handlePetChange }) => {
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
        id="pet-select-label"
        sx={{ color: "#A8A8A8", fontFamily: "Poppins-Regular" }}
      >
        Pet
      </InputLabel>
      <Select
        labelId="pet-select-label"
        id="pet-select"
        value={selectedPet}
        onChange={handlePetChange}
        IconComponent={() => (
          <FontAwesomeIcon
            icon={faPlus}
            style={{
              marginRight: "20px",
              fontSize: "1.2rem",
              color: "#BFBFBF",
            }}
          />
        )}
        label="Selecione um Pet"
      >
        {pets && pets.length > 0 ? (
          pets.map((pet) => (
            <MenuItem key={pet.id} value={pet.id}>
              {pet.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Nenhum pet disponível
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default InputPet;
