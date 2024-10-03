import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InputGetAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Lista de Produtos</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - R${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputGetAllProducts;
