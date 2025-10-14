import { Router } from "express";
import { criarUsuario } from "../controllers/UsuarioController";
import { login } from "../controllers/LoginController";
import { atualizarProduto, buscarProduto, buscarProdutoPorCodigoBarras, cadastrarProduto, cadastrarProdutoPorCodigo, excluirProduto, listarProdutos } from "../controllers/ProdutoController";

const router = Router();

router.post("/criarUsuario", criarUsuario);

router.post("/login", login);

router.get("/listarProdutos", listarProdutos);
router.post("/criarProduto", cadastrarProduto);
router.post("/cadastrarProdutoPorCodigo", cadastrarProdutoPorCodigo);
router.put("/atualizarProduto/:id", atualizarProduto);
router.delete("/excluirProduto/:id", excluirProduto);
router.get("/procurarProduto/:id", buscarProduto);
router.get("/procurarProduto", buscarProduto);
router.get("/procurarProdutoPorCodigoBarras", buscarProdutoPorCodigoBarras);

export default router;