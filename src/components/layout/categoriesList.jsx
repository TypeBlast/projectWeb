import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Hook de navegação
import './css/categories/categories.css';
import sheets from '../../axios/axios';  // Importa seu axios configurado

const Categories = () => {
  const [categories, setCategories] = useState([]);  // Estado para armazenar categorias
  const navigate = useNavigate();  // Instancia o hook de navegação

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await sheets.getAllCategories("/categories");  // Requisição para obter categorias
        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data);  // Define as categorias no estado
        } else {
          console.error("A resposta da API não contém um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();  // Chama a função para buscar categorias ao montar o componente
  }, []);

  // Função para gerar uma cor com base no índice
  const getColor = (index) => {
    const colors = ['#BA60E8', '#FF4C4C', '#5BF165', '#FF8C2D', '#4C9FFF'];  // Cores predefinidas
    return colors[index % colors.length];  // Retorna a cor correspondente ao índice
  };

  // Função chamada ao clicar em uma categoria
  const handleCategoryClick = (category_id) => {
    navigate(`/products/category/${category_id}`);
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
              style={{ backgroundColor: getColor(index) }}  // Aplica cor dinâmica ao botão
              onClick={() => handleCategoryClick(category.id)}  // Adiciona a função de clique
            >
              {category.name}  {/* Exibe o nome da categoria */}
            </button>
          ))
        ) : (
          <p>Nenhuma categoria encontrada.</p>  // Exibe mensagem caso não haja categorias
        )}
      </div>
    </div>
  );
};

export default Categories;
