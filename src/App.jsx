//Import das funcões do router
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

//Import das páginas para navegação
import Index from "./web";
import Error from "./web/error";
import Login from "./web/login";
import Register from "./web/register";

//Import de components
import HeaderIndex from "./components/index/header";
import InputEmail from "./components/inputs/inputEmail";
import InputPassword from "./components/inputs/inputPassword";
import InputCPF from "./components/inputs/inputCPF";
import InputName from "./components/inputs/inputName";
import InputPhone from "./components/inputs/inputPhone";

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
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
