//Import das funcões do router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Import das páginas para navegação
import Index from "./web";

//Import de components
import HeaderIndex from "./components/index/header";

function LayoutIndex() {
  <div>
    <HeaderIndex />
    <Outlet />
  </div>;
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
