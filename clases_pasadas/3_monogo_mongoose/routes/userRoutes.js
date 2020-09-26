const express = require("express");
const {
  getUser,
  getUsers,
  postUser,
  deleteUser,
  putUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/:id", putUser);

module.exports = router;
