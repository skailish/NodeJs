const express = require("express");
const router = express.Router();
const fs = require("fs");

// Acá defino mis funciones, que luego en los middleware voy a invocar
const getGatitos = (req, res) => {
  console.log(__dirname);
  fs.readFile(`./assets/cats.json`, (err, data) => {
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

const getGatito = (req, res) => {
  const id = Number(req.params.id);
  // Recibir una petición
  fs.readFile(`./assets/cats.json`, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Ocurrió un error",
      });
    }
    const dataJson = JSON.parse(data);
    const gatito = dataJson[id];
    if (!gatito) {
      return res.status(404).json({
        requestedAt: req.requestedAt,
        status: "fail",
        message: "Gato no encontrado",
      });
    }
    res.json({
      status: "Success",
      data: gatito,
    });
  });
};

const postGatito = (req, res) => {
  // Asigno a una variable lo que envía el post
  const nuevoGato = req.body;
  if (nuevoGato) {
    // Primero determino toda la info a agregar
    fs.readFile(`./assets/cats.json`, (err, data) => {
      //   Obtengo lo que ya existe
      const dataJSON = JSON.parse(data);
      //   Le asigno un ID de acuerdo al lenght de lo que ya tengo
      nuevoGato.id = dataJSON.length;
      //   Le sumo mi nuevoGato a lo que ya tengo
      dataJSON.push(nuevoGato);
      // Ahora agrego la data
      fs.writeFile(`./assets/cats.json`, JSON.stringify(dataJSON), (err) => {
        // Éxito al grabar? 201
        res.status(201).json({
          status: "success",
          data: {
            nuevoGato,
            createdAt: new Date(),
          },
        });
      });
    });
  }
};

const putGatito = (req, res) => {
  fs.readFile(`./assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const idGatitoAEditar = Number(req.params.id);
    const gatoEditado = req.body;
    let gatoEncontrado = dataJSON.find((gato) => gato.id === idGatitoAEditar);

    if (gatoEncontrado) {
      let gatoActualizado = {
        id: gatoEncontrado.id,
        name: gatoEditado.name,
        shortDesc: gatoEditado.shortDesc,
        longDesc: gatoEditado.longDesc,
        img: gatoEditado.img,
        colores: gatoEditado.colores,
        sexo: gatoEditado.sexo,
        disponible: gatoEditado.disponible,
      };
      let targetIndex = dataJSON.indexOf(gatoEncontrado);
      dataJSON.splice(targetIndex, 1, gatoActualizado);

      fs.writeFile(`./assets/cats.json`, JSON.stringify(dataJSON), (err) => {
        // Éxito al grabar? 201
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

const deleteGatito = (req, res) => {
  fs.readFile(`./assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);

    const gatoNombre = dataJSON[id].name;
    const arrGatitosFiltrado = dataJSON.filter((gato) => gato.id !== id);

    fs.writeFile(
      `./assets/cats.json`,
      JSON.stringify(resultadoFiltrado),
      (err) => {
        res.status(202).json({
          requestedAt: req.requestedAt,
          status: "success",
          message: `Borraste al gatito ${gatoNombre}, cuánta maldad`,
          data: arrGatitosFiltrado,
        });
      }
    );
  });
};

router.get("/", getGatitos);
router.get("/:id", getGatito);
router.post("/", postGatito);
router.delete("/:id", deleteGatito);
router.put("/:id", putGatito);

module.exports = router;
