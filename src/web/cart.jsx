import React, { useState, useEffect } from "react";
import sheets from '../axios/axios'; // Importe o seu arquivo de configuração do Axios

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await sheets.getCart();
      console.log('Dados recebidos:', response.data);

      if (response.data && response.data.data && response.data.data.items) {
        setCartItems(response.data.data.items);
      } else {
        setCartItems([]);
      }

      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar o carrinho:', err);
      setError('Falha ao carregar o carrinho.');
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      console.log(`Tentando remover o item com ID: ${productId}`);
  
      // Envie o ID do produto no corpo da requisição POST
      const response = await sheets.removeFromCart({ productId });
  
      console.log('Resposta da API ao remover:', response);
  
      if (response.status === 200) {
        // Remove o item imediatamente do estado local
        setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
        console.log(`Item com ID ${productId} removido com sucesso.`);
      }
    } catch (err) {
      console.error('Erro ao remover o item do carrinho:', err);
      setError('Falha ao remover o item do carrinho.');
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await sheets.clearCart();
      if (response.status === 200) {
        setCartItems([]); // Limpa os itens no estado local
        console.log('Carrinho limpo com sucesso');
      }
    } catch (err) {
      console.error('Erro ao limpar o carrinho:', err);
      setError('Falha ao limpar o carrinho.');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.cartContainer}>
      <h1>Seu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul style={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.productId} style={styles.cartItem}>
              <div>
                <h2>{item.productName}</h2>
                <p>Quantidade: {item.quantity}</p>
                <p>Preço: R$ {parseFloat(item.productPrice).toFixed(2)}</p>
              </div>
              <button 
                style={styles.removeButton} 
                onClick={() => handleRemoveFromCart(item.productId)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button style={styles.clearButton} onClick={handleClearCart}>
          Limpar Carrinho
        </button>
      )}
    </div>
  );
}

const styles = {
  cartContainer: {
    width: '60%',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
  },
  cartList: {
    listStyleType: 'none',
    padding: 0,
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  removeButton: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  clearButton: {
    marginTop: '20px',
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Cart;
