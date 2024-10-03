import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const InputCategory = ({ categories, selectedCategory, handleCategoryChange }) => {
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
        id="category-select-label"
        sx={{ color: "#D9D9D9", fontFamily: "Poppins-Regular" }}
      >
        Categoria
      </InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
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
            icon={faChevronDown}
            style={{
              marginRight: "20px",
              fontSize: "1.2rem",
              color: "#BFBFBF",
            }}
          />
        )}
        label="Selecione uma Categoria"
      >
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Nenhuma categoria disponível
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default InputCategory;
