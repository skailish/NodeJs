const express = require("express");
const router = express.Router();
const fs = require("fs");

const getUsers = (req, res) => {
  fs.readFile(`./assets/users.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    res.json({
      requestedAt: req.requestedAt,
      status: "success",
      data: dataJSON,
    });
    if (err) {
      res.sendStatus(500).send("Algo anda mal");
    }
  });
};

const getUser = (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(`./assets/users.json`, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Ocurrió un error",
      });
    }
    const dataJson = JSON.parse(data);
    const user = dataJson[id];
    if (!user) {
      return res.status(404).json({
        requestedAt: req.requestedAt,
        status: "fail",
        message: "User no encontrado",
      });
    }
    res.json({
      status: "Success",
      data: user,
    });
  });
};

const postUser = (req, res) => {
  const nuevoUser = req.body;
  if (nuevoUser) {
    fs.readFile(`./assets/users.json`, (err, data) => {
      const dataJSON = JSON.parse(data);
      nuevoUser.id = dataJSON.length;
      dataJSON.push(nuevoUser);
      fs.writeFile(`./assets/users.json`, JSON.stringify(dataJSON), (err) => {
        res.status(201).json({
          status: "success",
          data: {
            nuevoUser,
            createdAt: new Date(),
          },
        });
      });
    });
  }
};

const putUser = (req, res) => {
  fs.readFile(`./assets/users.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const idUserAEditar = Number(req.params.id);
    const userEditado = req.body;
    let userEncontrado = dataJSON.find((user) => user.id === idUserAEditar);

    if (userEncontrado) {
      let userActualizado = {
        id: userEncontrado.id,
        name: userEditado.name,
        shortDesc: userEditado.shortDesc,
        longDesc: userEditado.longDesc,
        img: userEditado.img,
        colores: userEditado.colores,
        sexo: userEditado.sexo,
        disponible: userEditado.disponible,
      };
      let targetIndex = dataJSON.indexOf(userEncontrado);
      dataJSON.splice(targetIndex, 1, userActualizado);

      fs.writeFile(`./assets/users.json`, JSON.stringify(dataJSON), (err) => {
        res.status(201).json({
          status: "success",
          data: dataJSON,
        });
      });
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteUser = (req, res) => {
  fs.readFile(`./assets/users.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);

    const userNombre = dataJSON[id].name;
    const arrUsersFiltrado = dataJSON.filter((user) => user.id !== id);

    fs.writeFile(
      `./assets/users.json`,
      JSON.stringify(resultadoFiltrado),
      (err) => {
        res.status(202).json({
          requestedAt: req.requestedAt,
          status: "success",
          message: `Borraste el usuario ${userNombre}`,
          data: arrUsersFiltrado,
        });
      }
    );
  });
};

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/:id", putUser);

module.exports = router;
