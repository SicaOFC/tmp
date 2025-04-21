const express = require("express");
const router = express.Router();

const UserController = require(`./controllers/UserController`);

router.post("/usuario/cadastro", UserController.CriarUsuario);
router.post("/usuario/token", UserController.GerarToken);
router.get("/usuario/login", UserController.LogarUsuario);
router.delete("/usuario/deletar", UserController.DeletarUsuario);
router.patch("/usuario/editar", UserController.EditarUsuario);

module.exports = router;
