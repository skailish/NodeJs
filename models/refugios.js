const mongoose = require("mongoose");

// Defino un esquema o modelo con el método Schema
const refugiosSchema = new mongoose.Schema({
  nombre: {
    type: String,
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
});

// Creo un nuevo modelo basado en ese esquema
const Refugio = mongoose.model("Refugio", refugiosSchema, "refugios");

module.exports = Refugio;
