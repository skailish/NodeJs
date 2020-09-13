const express = require("express");
const {
  getRefugio,
  getRefugios,
  postRefugio,
  deleteRefugio,
  putRefugio,
} = require("../controllers/refugioControllers");

const router = express.Router();
const fs = require("fs");

router.get("/", getRefugios);
router.get("/:id", getRefugio);
router.post("/", postRefugio);
router.delete("/:id", deleteRefugio);
router.put("/:id", putRefugio);

module.exports = router;
