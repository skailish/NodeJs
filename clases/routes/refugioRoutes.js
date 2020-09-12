const express = require("express");
const router = express.Router();
const fs = require("fs");

const getRefugios = (req, res) => {
  fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
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

const getRefugio = (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Ocurrió un error",
      });
    }
    const dataJson = JSON.parse(data);
    const refugio = dataJson[id];
    if (!refugio) {
      return res.status(404).json({
        requestedAt: req.requestedAt,
        status: "fail",
        message: "Refugio no encontrado",
      });
    }
    res.json({
      status: "Success",
      data: refugio,
    });
  });
};

const postRefugio = (req, res) => {
  const nuevoRefugio = req.body;
  if (nuevoRefugio) {
    fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
      const dataJSON = JSON.parse(data);
      nuevoRefugio.id = dataJSON.length;
      dataJSON.push(nuevoRefugio);
      fs.writeFile(
        `${__dirname}/assets/refugios.json`,
        JSON.stringify(dataJSON),
        (err) => {
          res.status(201).json({
            status: "success",
            data: {
              nuevoRefugio,
              createdAt: new Date(),
            },
          });
        }
      );
    });
  }
};

const putRefugio = (req, res) => {
  fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const idRefugioAEditar = Number(req.params.id);
    const refugioEditado = req.body;
    let refugioEncontrado = dataJSON.find(
      (refugio) => refugio.id === idRefugioAEditar
    );

    if (refugioEncontrado) {
      let refugioActualizado = {
        id: refugioEncontrado.id,
        name: refugioEditado.name,
        shortDesc: refugioEditado.shortDesc,
        longDesc: refugioEditado.longDesc,
        img: refugioEditado.img,
        colores: refugioEditado.colores,
        sexo: refugioEditado.sexo,
        disponible: refugioEditado.disponible,
      };
      let targetIndex = dataJSON.indexOf(refugioEncontrado);
      dataJSON.splice(targetIndex, 1, refugioActualizado);

      fs.writeFile(
        `${__dirname}/assets/refugios.json`,
        JSON.stringify(dataJSON),
        (err) => {
          res.status(201).json({
            status: "success",
            data: dataJSON,
          });
        }
      );
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteRefugio = (req, res) => {
  fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const id = Number(req.params.id);

    const refugioNombre = dataJSON[id].name;
    const arrRefugiosFiltrado = dataJSON.filter((refugio) => refugio.id !== id);

    fs.writeFile(
      `${__dirname}/assets/refugios.json`,
      JSON.stringify(resultadoFiltrado),
      (err) => {
        res.status(202).json({
          requestedAt: req.requestedAt,
          status: "success",
          message: `Borraste el refugio ${refugioNombre}`,
          data: arrRefugiosFiltrado,
        });
      }
    );
  });
};

router.get("/", getRefugios);
router.get("/:id", getRefugio);
router.post("/", postRefugio);
router.delete("/:id", deleteRefugio);
router.put("/:id", putRefugio);

module.exports = router;
