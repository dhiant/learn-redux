import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import CheckOut from "./pages/CheckOut";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
}

export default App;
