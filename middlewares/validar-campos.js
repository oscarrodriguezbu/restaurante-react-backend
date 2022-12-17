const { response } = require("express");
const { validationResult, check } = require("express-validator");

const validarCampos = (req, resp = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

const validarRegistro = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 20 })
    .withMessage("El nombre es demasiado largo")
    .escape(),
  check("email")
    .not()
    .isEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no tiene un formato valido")
    .isLength({ max: 60 })
    .withMessage("El email es demasiado largo"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 8 })
    .withMessage("El password debe tener al menos ocho caracteres")
    .matches("[0-9]")
    .withMessage("El password debe contener al menos un numero")
    .matches("[a-z]")
    .withMessage("El password debe contener al menos una letra minuscula")
    .matches("[A-Z]")
    .withMessage("El password debe contener al menos una letra mayuscula")
    .matches(/^(?=(.*[\W]){1,})/)
    .withMessage("El password debe contener al menos una caracter especial")
    .escape(),
  // check("password2")
  //   .escape()
  //   .not()
  //   .isEmpty()
  //   .withMessage("Confirmar constraseña no puede estar vacío")
  //   .custom((value, { req }) => value === req.body.password)
  //   .withMessage("Las contraseñas son diferentes"),
];

const validarLogin = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no tiene un formato valido"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("El password es obligatorio")
    .escape(),
];

module.exports = {
  validarCampos,
  validarRegistro,
  validarLogin,
};
