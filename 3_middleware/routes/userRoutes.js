const express = require("express");
const router = express.Router();

const getUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Ruta aún no implementada",
  });
  fs.readFile(`${__dirname}/assets/users.json`, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Ocurrió un error",
      });
    }
    const dataJSON = JSON.parse(data);
    res.json({
      status: "Success",
      data: dataJSON,
    });
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Ruta aún no implementada",
  });
  // Recibir una petición
  fs.readFile(`${__dirname}/assets/users.json`, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Ocurrió un error",
      });
    }
    const users = JSON.parse(data);
    const id = Number(req.params.id);
    const usersFiltrados = users.filter((user) => user.id === id);
    if (!usersFiltrados.length) {
      res.status(404).json({
        status: "fail",
        message: "Usuario no encontrado",
      });
    }
    res.json({
      status: "Success",
      data: usersFiltrados,
    });
  });
};

const postUser = (req, res) => {
  // Primero determino toda la info a agregar
  fs.readFile(`${__dirname}/assets/users.json`, (err, data) => {
    //   Obtengo lo que ya existe
    const dataJSON = JSON.parse(data);
    // Asigno a una variable lo que envía el post
    const nuevoUser = req.body;
    //   Le asigno un ID de acuerdo al lenght de lo que ya tengo
    nuevoUser.id = dataJSON.length;
    //   Le sumo mi nuevoUser a lo que ya tengo
    dataJSON.push(nuevoUser);
    // Ahora agrego la data
    fs.writeFile(
      `${__dirname}/assets/users.json`,
      JSON.stringify(dataJSON),
      (err) => {
        // Éxito al grabar? 201
        res.status(201).json({
          status: "success",
          data: {
            nuevoUser,
            createdAt: new Date(),
          },
        });
      }
    );
  });
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(`${__dirname}/assets/users.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const userNombre = dataJSON[id].name;
    const resultadoFiltrado = dataJSON.filter((user) => user.id !== id);

    // Ahora actualizo la data
    fs.writeFile(
      `${__dirname}/assets/users.json`,
      JSON.stringify(resultadoFiltrado),
      (err) => {
        res.status(201).send(`Borraste al usuario ${userNombre}`);
      }
    );
  });
};

const putUser = (req, res) => {
  fs.readFile(`${__dirname}/assets/users.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const userEditado = req.body;

    const newJson = dataJSON.map((user) => {
      user = user.id == userEditado.id ? userEditado : user;
      return user;
    });
    // Ahora actualizo la data
    fs.writeFile(
      `${__dirname}/assets/users.json`,
      JSON.stringify(newJson),
      (err) => {
        // Éxito al grabar? 201
        res.status(201).json({
          status: "success",
          data: {
            newJson,
          },
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
