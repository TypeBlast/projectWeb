import axios from "axios";

// Configuração do Axios com timeout e cabeçalhos padrões
const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 10000, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Função para obter o token armazenado no localStorage
const getToken = () => localStorage.getItem('token');

// Interceptor para adicionar o token de autenticação somente em rotas específicas
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    // Condição para adicionar o token apenas em rotas específicas
    const authenticatedRoutes = [
      '/addresses',    // Rotas de endereços
      '/auth',         // Rotas de autenticação
      '/orders',       // Rotas de pedidos
      '/payments',     // Rotas de pagamentos
      '/appointments', // Rotas de agendamentos
      '/carts',         // Rotas de carrinho
      '/pets'          // Rotas de pets
    ];

    // Verifica se a URL da requisição começa com alguma das rotas autenticadas
    if (token && authenticatedRoutes.some(route => config.url.startsWith(route))) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Definindo todas as rotas e funções do serviço (sheets)
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

  // Rotas de categorias
  getAllCategories: () => api.get("/categories"),

  // Rotas de serviços
  createService: (service) => api.post("/services", service),
  getAllServices: () => api.get("/services"),
  getServiceById: (id) => api.get(`/services/${id}`),
  updateService: (id, service) => api.put(`/services/${id}`, service),
  deleteService: (id) => api.delete(`/services/${id}`),

  // Rotas de endereços (Address)
  createAddress: (address) => api.post("/addresses", address), 
  getAllAddresses: () => api.get("/addresses"),
  getAddressById: (id) => api.get(`/addresses/${id}`),
  updateAddress: (id, address) => api.put(`/addresses/${id}`, address),
  deleteAddress: (id) => api.delete(`/addresses/${id}`),

  // Rotas de agendamentos (Appointments)
  createAppointment: (appointment) => api.post("/appointments", appointment),
  getAllAppointments: () => api.get("/appointments"),
  getAppointmentById: (id) => api.get(`/appointments/${id}`),
  updateAppointment: (id, appointment) => api.put(`/appointments/${id}`, appointment),
  deleteAppointment: (id) => api.delete(`/appointments/${id}`),

  // Rotas de carrinho (Cart)
  addToCart: (item) => api.post("/carts/add", item),
  removeFromCart: (item) => api.post("/carts/remove", item),
  clearCart: () => api.delete("/carts/clear"),
  getCart: () => api.get("/carts"),
  deleteCart: () => api.delete("/carts/delete"),

  // Rotas de pets (Pets)
  createPet: (pet) => api.post("/pets", pet),
  getAllPets: () => api.get("/pets"),
  getPetById: (id) => api.get(`/pets/${id}`),
  updatePet: (id, pet) => api.put(`/pets/${id}`, pet),
  deletePet: (id) => api.delete(`/pets/${id}`),
};

export default sheets;
