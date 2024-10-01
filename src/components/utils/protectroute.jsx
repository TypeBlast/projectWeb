import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // Pegar o token do localStorage

  // Se o token não existir, redirecione para a página de erro
  return token ? children : <Navigate to="/error" />;
}

export default ProtectedRoute;
