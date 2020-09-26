const mongoose = require("mongoose");

// Defino un esquema o modelo con el método Schema
const gatitosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: Number,
  colores: {
    type: Array,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  disponible: {
    type: Boolean,
    default: false,
  },
});

// Creo un nuevo modelo basado en ese esquema
const Gatito = mongoose.model("Gatito", gatitosSchema, "gatitos");

module.exports = Gatito;
