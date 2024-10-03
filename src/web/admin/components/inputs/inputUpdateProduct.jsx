import React, { useState } from 'react';
import axios from 'axios';

const InputUpdateProduct = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/products/${productId}`, productData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="ID do produto" />
      <input name="name" value={productData.name} onChange={handleChange} placeholder="Nome do produto" />
      <input name="price" value={productData.price} onChange={handleChange} placeholder="Preço" />
      <input name="stock" value={productData.stock} onChange={handleChange} placeholder="Estoque" />
      <button type="submit">Atualizar Produto</button>
    </form>
  );
};

export default InputUpdateProduct;
