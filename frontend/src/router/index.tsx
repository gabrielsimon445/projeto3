import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import ProdutoList from "../pages/produto/list";
import ProdutoForm from "../pages/produto/form";

export const Router = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/produtos" element={<ProdutoList />} />
      <Route path="/produtos/novo" element={<ProdutoForm />} />
      <Route path="/produtos/:id" element={<ProdutoForm />} />
    </Routes>
  );
};
