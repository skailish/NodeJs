const mongoose = require("mongoose");

// Defino un esquema o modelo con el método Schema
const usuariosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  }
});

// Creo un nuevo modelo basado en ese esquema
const Usuario = mongoose.model("Usuario", usuariosSchema, "usuarios");

module.exports = Usuario;
