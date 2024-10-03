import React, { useState } from 'react';
import axios from 'axios';

const InputDeleteProduct = () => {
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="ID do produto" />
      <button type="submit">Deletar Produto</button>
    </form>
  );
};

export default InputDeleteProduct;
