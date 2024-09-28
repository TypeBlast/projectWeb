import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sheets from '../../axios/axios';
import './css/species/species.css';
import ImageDogs from '../../assets/images/speciesDog.png';
import ImageCats from '../../assets/images/speciesCat.png';
import ImageRabbits from '../../assets/images/speciesRabbits.png';
import ImageFish from '../../assets/images/speciesFish.png';
import ImageBirds from '../../assets/images/speciesBirds.png';
import ImageReptiles from '../../assets/images/speciesReptiles.png';
import ImageHamster from '../../assets/images/speciesHamster.png';

const Species = () => {
  const [species, setSpecies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await sheets.getAllSpecies("/species");
        if (Array.isArray(response.data.data)) {
          setSpecies(response.data.data);
        } else {
          console.error("A resposta da API não contém um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar espécies:", error);
      }
    };

    fetchSpecies();
  }, []);

  const getColor = (index) => {
    const colors = ['#CE88F8', '#FF8DBA', '#85F78D', '#fde047'];
    return colors[index % colors.length];
  };

  const handleSpecieClick = (specie_id) => {
    navigate(`/products/specie/${specie_id}`);
  };

  const getImage = (name) => {
    switch (name.toLowerCase()) {
      case 'cachorro':
        return ImageDogs;
      case 'gato':
        return ImageCats;
      case 'coelho':
        return ImageRabbits;
      case 'peixe':
        return ImageFish;
      case 'pássaro':
        return ImageBirds;
      case 'réptil':
        return ImageReptiles;
      case 'hamster':
        return ImageHamster;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="specie-title">Espécies</h3>
      <div className="specie-container">
        {species.length > 0 ? (
          species.map((specie, index) => (
            <div key={specie.id} className="specie-wrapper">
              <button
                className="specie-button"
                style={{ borderColor: getColor(index) }}
                onClick={() => handleSpecieClick(specie.id)}
              >
                <img src={getImage(specie.name)} alt={specie.name} className="specie-image" />
              </button>
              <span className="specie-text" style={{ color: getColor(index) }}>{specie.name}</span>
            </div>
          ))
        ) : (
          <p>Nenhuma categoria encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default Species;
