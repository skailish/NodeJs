const express = require("express");
const router = express.Router();

const getRefugios = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Ruta aún no implementada",
  });
};

const getRefugio = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Ruta aún no implementada",
  });
};

const postRefugio = (req, res) => {};

const deleteRefugio = (req, res) => {};

const putRefugio = (req, res) => {};

router.get("/", getRefugios);
router.get("/:id", getRefugio);
router.post("/", postRefugio);
router.delete("/:id", deleteRefugio);
router.put("/:id", putRefugio);

module.exports = router;
