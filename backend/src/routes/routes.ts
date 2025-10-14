import { Router } from "express";
import { ativaDesativaUsuario as ativarDesativarUsuario, atualizarUsuario, criarUsuario, listarUsuarios } from "../controllers/UsuarioController";
import { login } from "../controllers/LoginController";
import { atualizarProduto, buscarProduto, buscarProdutoPorCodigoBarras, cadastrarProduto, cadastrarProdutoPorCodigo, excluirProduto, listarProdutos } from "../controllers/ProdutoController";
import { atualizarCompra, buscarCompra, cadastrarCompra, excluirCompra, listarCompras } from "../controllers/CompraController";
import { atualizarItemCompra, buscarItemCompra, cadastrarItemCompra, excluirItemCompra, listarItensCompra } from "../controllers/ItemCompraController";

const router = Router();

router.get("/listarUsuarios", listarUsuarios);
router.post("/criarUsuario", criarUsuario);
router.put("/atualizarUsuario", atualizarUsuario);
router.put("/ativarDesativarUsuario", ativarDesativarUsuario);

router.post("/login", login);

router.get("/listarProdutos", listarProdutos);
router.post("/criarProduto", cadastrarProduto);
router.post("/cadastrarProdutoPorCodigo", cadastrarProdutoPorCodigo);
router.put("/atualizarProduto/:id", atualizarProduto);
router.delete("/excluirProduto/:id", excluirProduto);
router.get("/procurarProduto/:id", buscarProduto);
router.get("/procurarProduto", buscarProduto);
router.get("/procurarProdutoPorCodigoBarras", buscarProdutoPorCodigoBarras);

router.get("/listarCompras", listarCompras);
router.post("/criarCompra", cadastrarCompra);
router.put("/atualizarCompra/:id", atualizarCompra);
router.delete("/excluirCompra/:id", excluirCompra);
router.get("/procurarCompra/:id", buscarCompra);
router.get("/procurarCompra", buscarCompra);

router.get("/listarItensCompra/:compra_id", listarItensCompra);
router.post("/criarItemCompra", cadastrarItemCompra);
router.put("/atualizarItemCompra/:id", atualizarItemCompra);
router.delete("/excluirItemCompra/:id", excluirItemCompra);
router.get("/procurarItemCompra/:id", buscarItemCompra);
router.get("/procurarItemCompra", buscarItemCompra);

export default router;