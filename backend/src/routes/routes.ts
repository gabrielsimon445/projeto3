import { Router } from "express";
import { criarUsuario, listarUsuarios } from "../controllers/UsuarioController";
import { login } from "../controllers/LoginController";
import { atualizarProduto, cadastrarProduto, listarProdutos } from "../controllers/ProdutoController";

const router = Router();

router.get("/listarUsuarios", listarUsuarios);
router.post("/criarUsuario", criarUsuario);
//atualizar usuario
//exclui usuario(soft delete)
router.post("/login", login);
//checkout
router.get("/listarProdutos", listarProdutos);
router.post("/criarProduto", cadastrarProduto);
router.put("/atualizarProduto/:id", atualizarProduto);
//excluir produto(soft delete)
//buscar produto por id
//buscar produto por nome

//fazer pedido
//listar pedidos
//atualizar pedido
//cancelar pedido(soft delete)

export default router;