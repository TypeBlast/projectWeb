import React, { useState, useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios/axios"; // Ajuste se necessário

function BoxAppointments({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState({}); // Para armazenar as informações dos pets
  const [services, setServices] = useState({}); // Para armazenar as informações dos serviços
  const [employees, setEmployees] = useState({}); // Para armazenar as informações dos funcionários
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.getAppointmentByUser(); // Buscar os agendamentos
      const appointmentsData = response.data.data;
      setAppointments(appointmentsData); // Armazena os agendamentos

      // Para cada agendamento, buscar o pet, serviço e funcionário correspondentes
      await Promise.all(
        appointmentsData.map(async (appt) => {
          const petPromise = appt.pet_id ? axios.getPetById(appt.pet_id) : Promise.resolve(null);
          const servicePromise = appt.service_id ? axios.getServiceById(appt.service_id) : Promise.resolve(null);
          const employeePromise = appt.employer_id ? axios.getEmployeeById(appt.employer_id) : Promise.resolve(null);

          const [petResponse, serviceResponse, employeeResponse] = await Promise.all([petPromise, servicePromise, employeePromise]);

          // Atualiza os dados de pets
          if (petResponse) {
            setPets((prevPets) => ({
              ...prevPets,
              [appt.pet_id]: petResponse.data.data, // Armazena o pet usando o id como chave
            }));
          }

          // Atualiza os dados de serviços
          if (serviceResponse) {
            setServices((prevServices) => ({
              ...prevServices,
              [appt.service_id]: serviceResponse.data.data, // Armazena o serviço usando o id como chave
            }));
          }

          // Atualiza os dados de funcionários
          if (employeeResponse) {
            setEmployees((prevEmployees) => ({
              ...prevEmployees,
              [appt.employer_id]: employeeResponse.data.data, // Armazena o funcionário usando o id como chave
            }));
          }
        })
      );
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err);
      setError("Erro ao carregar agendamentos.");
    }
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginTop: "50px" }}>
        <Box
          sx={{
            border: "1px solid #BFBFBF",
            borderRadius: "10px",
            width: "80%",
            margin: "auto",
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(191, 191, 191, 0.75)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}
          >
            Meus Agendamentos
          </Typography>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          {appointments.length === 0 ? (
            <Typography>Nenhum agendamento encontrado.</Typography>
          ) : (
            appointments.map((appt) => (
              <Grid container key={appt.id} sx={{ marginBottom: "10px" }}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins-Regular",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendar}
                      style={{ color: "#D9D9D9" }}
                    />
                    {`${appt.appointment_date} - ${
                      services[appt.service_id]?.name || "Serviço não especificado"
                    } com ${
                      employees[appt.employer_id]?.name || "Funcionário não especificado"
                    }`}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins-Regular",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "5px",
                    }}
                  >
                    Pet: {pets[appt.pet_id]?.name || "Carregando..."}
                  </Typography>
                </Grid>
              </Grid>
            ))
          )}
        </Box>
      </Grid>
    </Box>
  );
}

export default BoxAppointments;
