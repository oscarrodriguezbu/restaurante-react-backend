const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt");

const createUser = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    // Validadr email existente
    let user = await User.findOne({ email });
    if (user) {
      return resp.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo.",
      });
    }

    //Instanciar modelo
    user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(12);
    user.password = bcrypt.hashSync(password, salt);

    //Guardar en bd
    await user.save();

    //Generar JWT
    const token = await generarJWT(user.id, user.name, user.profile_img_url);

    //Registro exitoso
    resp.status(201).json({
      ok: true,
      msg: "register",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const login = async (req, resp = response) => {
  const { email, password } = req.body;
  const errorMessage = "Usuario y/o contraseña no son correctos";

  try {
    // Validadr email existente
    let user = await User.findOne({ email });
    if (!user) {
      return resp.status(400).json({
        ok: false,
        msg: errorMessage,
      });
    }

    //Confirmar las contraseñas
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return resp.status(400).json({
        ok: false,
        msg: errorMessage,
      });
    }

    //Generar JWT
    const token = await generarJWT(user.id, user.name, user.profile_img_url);

    //Login exitoso
    resp.status(201).json({
      ok: true,
      msg: "login",
      uid: user.id,
      name: user.name,
      profile_img_url: user.profile_img_url,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const renewToken = async (req, resp = response) => {
  const { uid, name, profile_img_url } = req;

  try {
    //Generar JWT
    const token = await generarJWT(uid, name, profile_img_url);

    resp.status(201).json({
      ok: true,
      msg: "Renew token",
      uid,
      name,
      profile_img_url,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

module.exports = {
  createUser,
  login,
  renewToken,
};
