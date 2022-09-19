import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/product/:productId" element={<Product />} />
    </Routes>
  );
}

export default App;
