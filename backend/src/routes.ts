import { Router } from "express";
import { listarUsuarios, criarUsuario } from "./controllers/usuarios";

const router = Router();

router.get("/usuarios", listarUsuarios);
router.post("/criarUsuario", criarUsuario);

export default router;