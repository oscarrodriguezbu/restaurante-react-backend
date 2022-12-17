const { Router } = require("express");

const router = Router();
const { createUser, login, renewToken } = require("../controllers/auth");
const {
  validarRegistro,
  validarLogin,
  validarCampos,
} = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post("/new", [...validarRegistro, validarCampos], createUser);

router.post("/", [...validarLogin, validarCampos], login);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
