import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import sheets from "../../axios/axios"; // O arquivo onde seu Axios está configurado

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Usuário armazenado:", user);

  const role = user?.role;

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        console.log("Token não encontrado");
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const response = await sheets.getUser(user?.id);
        console.log("Resposta do servidor:", response);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Erro ao verificar token:", error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) {
          console.log("Token inválido");
          setIsAuthorized(false);
        }
      } finally {
        setLoading(false);
      }
    }

    verifyToken();

    const adminRoutes = ["/admin", "/adminSales", "/adminEmployers", "/adminProducts", "/adminUsers"];
    setIsAdminRoute(adminRoutes.includes(window.location.pathname));
    console.log("Verificando se é rota de admin:", isAdminRoute);
  }, [token, user]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/error" />;
  }

  if (isAdminRoute && role === undefined) {
    console.error("Cargo não encontrado no objeto do usuário.");
    return <Navigate to="/error" />;
  }

  if (isAdminRoute && role !== "admin") {
    console.log("Acesso negado a uma rota de administrador.");
    return <Navigate to="/error" />;
  }

  return children;
}

export default ProtectedRoute;
