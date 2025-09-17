import { Router } from "express";
import { ativaDesativaUsuario as ativarDesativarUsuario, atualizarUsuario, criarUsuario, listarUsuarios } from "../controllers/UsuarioController";
import { login } from "../controllers/LoginController";
import { atualizarProduto, buscarProduto, cadastrarProduto, excluirProduto, listarProdutos } from "../controllers/ProdutoController";

const router = Router();

router.get("/listarUsuarios", listarUsuarios);
router.post("/criarUsuario", criarUsuario);
router.put("/atualizarUsuario", atualizarUsuario);
router.put("/ativarDesativarUsuario", ativarDesativarUsuario);

router.post("/login", login);

router.get("/listarProdutos", listarProdutos);
router.post("/criarProduto", cadastrarProduto);
router.put("/atualizarProduto/:id", atualizarProduto);
router.delete("/excluirProduto/:id", excluirProduto);
router.get("/procurarProduto/:id", buscarProduto);
router.get("/procurarProduto", buscarProduto);


//fazer pedido
//listar pedidos
//atualizar pedido
//cancelar pedido(soft delete)

export default router;