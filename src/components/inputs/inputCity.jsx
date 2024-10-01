import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import sheets from "../../axios/axios"; // Supondo que este seja o caminho do arquivo onde o axios está configurado

function InputCity({ stateId, value, onChange, disabled }) {
  const [cities, setCities] = useState([]); // Estado para armazenar as cidades
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const fetchCities = async () => {
      if (!stateId) return; // Se nenhum estado foi selecionado, não buscar cidades
      setLoading(true);
      try {
        const response = await sheets.getAllCitiesByStateId(stateId); // Buscando cidades pela API
        setCities(response.data.data); // Atualiza o estado com as cidades
      } catch (error) {
        console.error("Erro ao carregar as cidades: ", error);
      } finally {
        setLoading(false); // Define o carregamento como finalizado
      }
    };

    fetchCities();
  }, [stateId]); // O useEffect será disparado quando o stateId mudar

  return (
    <TextField
      label="Cidade"
      select
      value={value}
      onChange={onChange}
      fullWidth
      required
      sx={{ marginTop: "15px" }}
      disabled={disabled || !stateId || loading} // Desabilita o input enquanto carrega ou se não houver estado
    >
      {loading ? (
        <MenuItem disabled>Carregando...</MenuItem>
      ) : cities.length > 0 ? (
        cities.map((city) => (
          <MenuItem key={city.id} value={city.id}>
            {city.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>Nenhuma cidade encontrada</MenuItem>
      )}
    </TextField>
  );
}

export default InputCity;
