import React, { useEffect, useState } from 'react';
import './css/categories/categories.css';
import sheets from '../../axios/axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await sheets.getAllCategories("/categories");

        // Acessando a propriedade correta da resposta da API
        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data); // O array de categorias está em response.data.data
        } else {
          console.error("A resposta da API não contém um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  // Função para gerar uma cor com base no índice
  const getColor = (index) => {
    const colors = ['#c084fc', '#f9a8d4', '#86efac', '#fde047', '#d8b4fe'];
    return colors[index % colors.length]; // Retorna a cor com base no índice
  };

  return (
    <div>
      <h3 className="category-title">Categorias</h3>
      <div className="category-container">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <button
              key={category.id}
              className="category-button"
              style={{ backgroundColor: getColor(index) }}
            >
              {category.name}
            </button>
          ))
        ) : (
          <p>Nenhuma categoria encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
