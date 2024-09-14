import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 10000, // Tempo de espera máximo
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' // Certifique-se de que este cabeçalho esteja presente
    },
  });

const sheets = {
    logUser: (user) => api.post("/auth/login", user),
    postUser: (user) => api.post("/user/", user),
    putUser: (user, id) => api.put(`/user/${id}`, user),
    deleteUser: (id) => api.delete(`/user/${id}`),
    getUser: (id) => api.get(`/user/${id}`),
    getAllUsers: () => api.get("/user"),
}

export default sheets;
