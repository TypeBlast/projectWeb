import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Verifica se o token existe
  if (!token) {
    return <Navigate to="/error" />;
  }

  // Obtém a role do usuário
  const role = user?.data?.role; 

  // Verifica se a rota requer acesso administrativo
  const adminRoutes = ["/admin"];
  const requiresAdmin = adminRoutes.includes(window.location.pathname);

  // Se a rota requer acesso admin e o usuário não é admin, redireciona para erro
  if (requiresAdmin && role !== "admin") {
    return <Navigate to="/error" />;
  }

  // Se for admin ou a rota não requer admin, permite acesso
  return children;
}

export default ProtectedRoute;
