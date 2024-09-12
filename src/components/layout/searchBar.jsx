import React, { useState } from "react";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = (e) => {
    const icon = e.target.closest('.MuiOutlinedInput-root').querySelector('svg');
    const label = e.target.closest('.MuiFormControl-root').querySelector('.MuiInputLabel-root');

    if (icon) {
      icon.style.opacity = 0;
    }
    if (label) {
      label.style.opacity = 0;
    }

    setFocused(true);
  };

  const handleBlur = (e) => {
    const icon = e.target.closest('.MuiOutlinedInput-root').querySelector('svg');
    const label = e.target.closest('.MuiFormControl-root').querySelector('.MuiInputLabel-root');

    if (icon) {
      icon.style.opacity = 1;
    }
    if (label) {
      label.style.opacity = 1;
    }

    setFocused(false);
  };

  const handleClear = () => {
    setValue('');
    document.getElementById('outlined-search').focus();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <TextField
        id="outlined-search"
        label="O que seu pet precisa?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: "20px", color: "#BFBFBF", transition: 'opacity 0.2s ease-in-out' }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {value && (
                <IconButton onClick={handleClear} size="small" style={{ marginLeft: '8px' }}>
                  <CloseIcon style={{ color: "#BFBFBF" }} />
                </IconButton>
              )}
              {focused && value && !value && (
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ fontSize: "20px", color: "#BFBFBF" }}
                />
              )}
            </InputAdornment>
          ),
          style: { paddingLeft: '30px' },
        }}
        InputLabelProps={{
          shrink: false,
          style: { 
            position: 'absolute',
            fontFamily: "Poppins-Regular",
            color: '#BFBFBF',
            left: '75px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            transition: 'opacity 0.2s ease-in-out',
          },
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="search"
        variant="outlined"
        className="searchBar"
        sx={{
          width: '80vw', // Usa 80% da largura da viewport
          maxWidth: '800px', // Máximo de 1000px
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#BFBFBF',
              borderWidth: '2px',
              borderRadius: "10px"
            },
            '&:hover fieldset': {
              borderColor: '#BFBFBF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#BFBFBF',
            },
            '& input[type="search"]::-webkit-search-clear-button': {
              WebkitAppearance: 'none',
              appearance: 'none',
              display: 'none',
            },
            '& input[type="search"]::-webkit-search-cancel-button': {
              WebkitAppearance: 'none',
              appearance: 'none',
              display: 'none',
            },
          },
        }}
      />
    </Box>
  );
}

export default SearchBar;
