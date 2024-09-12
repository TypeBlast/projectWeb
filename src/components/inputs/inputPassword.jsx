import React, { useState } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";

function InputPassword({ value, onChange }) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleToggleSecureText = () => {
    setSecureTextEntry((prev) => !prev);
  };

  const handleChange = (event) => {
    onChange(event);
  };

  const isInputNotEmpty = value.length > 0;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon
        icon={faKey}
        style={{
          marginRight: "10px",
          marginTop: "20px",
          fontSize: "20px",
          color: "#D9D9D9",
        }}
      />
      <TextField
        id="password"
        label="Senha"
        variant="standard"
        type={secureTextEntry ? "password" : "text"}
        value={value}
        onChange={handleChange}
        sx={{
          margin: "2px",
          width: "220px", // Controla o tamanho
          "& label": {
            color: "#D9D9D9", // Cor do label
          },
          "& label.Mui-focused": {
            color: "#A8A8A8", // Cor do label quando focado
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "#D9D9D9", // Cor da linha inferior antes do foco
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#A8A8A8", // Cor da linha inferior quando focado
          },
          "& .MuiInputBase-input": {
            color: "#333", // Cor do texto digitado
          },
        }}
        InputProps={{
          endAdornment: isInputNotEmpty && (
            <IconButton onClick={handleToggleSecureText} edge="end">
              <FontAwesomeIcon
                icon={secureTextEntry ? faEye : faEyeSlash}
                style={{

                  fontSize: "20px",
                  color: "#D9D9D9",
                }}
              />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}

export default InputPassword;
