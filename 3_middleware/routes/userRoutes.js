const express = require("express");
const router = express.Router();

const getUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Ruta aún no implementada",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Ruta aún no implementada",
  });
};

const postUser = (req, res) => {};

const deleteUser = (req, res) => {};

const putUser = (req, res) => {};

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/:id", putUser);

module.exports = router;
