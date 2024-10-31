import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import sheets from "../../axios/axios"; // O arquivo onde seu Axios está configurado

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  const role = user?.role;

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const response = await sheets.getUser(user?.id);
        setIsAuthorized(true);
      } catch (error) {

        if (error.response && error.response.status === 401) {

          setIsAuthorized(false);
        }
      } finally {
        setLoading(false);
      }
    }

    verifyToken();

    const adminRoutes = ["/admin", "/adminSales", "/adminEmployers", "/adminProducts", "/adminUsers"];
    setIsAdminRoute(adminRoutes.includes(window.location.pathname));
  }, [token, user]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/error" />;
  }

  if (isAdminRoute && role === undefined) {
    return <Navigate to="/error" />;
  }

  if (isAdminRoute && role !== "admin") {
    return <Navigate to="/error" />;
  }

  return children;
}

export default ProtectedRoute;
