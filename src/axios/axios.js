import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 10000, // Tempo de espera máximo
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json', // Certifique-se de que este cabeçalho esteja presente
  },
});

const sheets = {
  // Rotas de usuários
  logUser: (user) => api.post("/auth/login", user),
  postUser: (user) => api.post("/user/", user),
  putUser: (user, id) => api.put(`/user/${id}`, user),
  deleteUser: (id) => api.delete(`/user/${id}`),
  getUser: (id) => api.get(`/user/${id}`),
  getAllUsers: () => api.get("/user"),

  // Rotas de produtos
  createProduct: (product) => api.post("/products", product),
  getAllProducts: () => api.get("/products"),
  getProductById: (id) => api.get(`/products/${id}`),
  updateProduct: (id, product) => api.put(`/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getProductsByCategory: (category_id) => api.get(`/products/category/${category_id}`),
  getProductsByName: (name) => api.get(`/products/search/${name}`),
};

export default sheets;
