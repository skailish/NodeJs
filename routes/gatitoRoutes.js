const express = require("express");

const {
  getGatito,
  getGatitos,
  postGatito,
  deleteGatito,
  putGatito,
  patchGatito,
} = require("../controllers/gatitoControllers");

const router = express.Router();

router.get("/", getGatitos);
router.get("/:id", getGatito);
router.post("/", postGatito);
router.delete("/:id", deleteGatito);
router.put("/:id", putGatito);
router.patch("/:id", patchGatito);

module.exports = router;
