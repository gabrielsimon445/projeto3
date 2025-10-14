import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import ProdutoList from "../pages/produto/list";
import ProdutoForm from "../pages/produto/form";
import ProcessoVenda from "../pages/processovenda";
import IniciarVenda from "../pages/iniciarvenda";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/produtos" element={<ProdutoList />} />
      <Route path="/produtos/novo" element={<ProdutoForm />} />
      <Route path="/produtos/:id" element={<ProdutoForm />} />
      <Route path="/processo-venda" element={<ProcessoVenda />} />
      <Route path="/iniciar-venda" element={<IniciarVenda />} />
    </Routes>
  );
};
