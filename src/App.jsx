//Import das funcões do router
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/utils/protectroute";
import { AuthProvider } from "./context/authContext";

//Import das páginas para navegação
import Index from "./web";
import Error from "./web/error";
import Login from "./web/login";
import Register from "./web/register";
import Home from "./web/home";
import Products from "./web/products";
import Services from "./web/services";
import ServiceDetails from "./web/serviceDetails";
import User from "./web/user";
import ProductsDetails from "./web/productsDetails";
import Pets from "./web/pets";
import Cart from "./web/cart";
import Payments from "./web/payments";

import Admin from "./web/admin/admin";
import AdminSales from "./web/admin/pages/adminSales";
import AdminEmployers from "./web/admin/pages/adminEmployers";
import AdminProducts from "./web/admin/pages/adminProducts";
import AdminUsers from "./web/admin/pages/adminUsers";
import AdminAppointments from "./web/admin/pages/adminAppointments";

//Import de components
import HeaderIndex from "./components/index/header";
import Header from "./components/layout/header";
import HeaderAdmin from "./components/admin/headerAdmin";

function LayoutIndex() {
  return (
    <div>
      <HeaderIndex />
      <Outlet />
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function LayoutAdmin() {
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LayoutIndex />}>
            <Route path="/" element={<Index />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/category/:category_id"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/specie/:specie_id"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductsDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services/:id"
              element={
                <ProtectedRoute>
                  <ServiceDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myPets"
              element={
                <ProtectedRoute>
                  <Pets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/" element={<LayoutAdmin />}>
            <Route
              path="/adminSales"
              element={
                <ProtectedRoute>
                  <AdminSales />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminEmployers"
              element={
                <ProtectedRoute>
                  <AdminEmployers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminProducts"
              element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminUsers"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminAppointments"
              element={
                <ProtectedRoute>
                  <AdminAppointments />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
