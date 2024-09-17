//Import das funcões do router
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

//Import das páginas para navegação
import Index from "./web";
import Error from "./web/error";
import Login from "./web/login";
import Register from "./web/register";
import Home from "./web/home";
import Products from "./web/products";
import Services from "./web/services";
import User from "./web/user";

//Import de components
import HeaderIndex from "./components/index/header";
import Header from "./components/layout/header";

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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutIndex />}>
            <Route path="/" element={<Index />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/user" element={<User />} />
          </Route>
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
