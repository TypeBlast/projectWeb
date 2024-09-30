import React, { useEffect, useState } from "react";
import sheets from "../../axios/axios";
import CarouselItem from "./carrouselItem";
import imageServices from "../../assets/images/imageServices.png";
import imageConsults from "../../assets/images/imageConsults.png";
import imageUnhas from "../../assets/images/imageCortarUnhas.png";
import imageVacina from "../../assets/images/imageVacinas.png";
import imageTosa from "../../assets/images/imageTosa.png";
import { useNavigate } from "react-router-dom";

const ServicesList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await sheets.getAllServices();
        setServices(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar serviços", error);
      }
    };

    fetchServices();
  }, []);

  const serviceImages = [
    imageServices,
    imageUnhas,
    imageConsults,
    imageVacina,
    imageTosa,
  ];
  const colors = ["#BA60E8", "#FF6561", "#5BF165", "#FDFF61"];

  const navigate = useNavigate();
  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div>
      <h3
        style={{
          color: "#ec4899",
          fontSize: "24px",
          fontFamily: "Poppins-Bold",
          marginTop: "50px",
        }}
      >
        Serviços
      </h3>
      <CarouselItem
        items={services}
        colors={colors}
        images={serviceImages}
        handleClick={handleServiceClick}
        itemKey="id"
      />
    </div>
  );
};

export default ServicesList;
