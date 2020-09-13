const fs = require("fs");

const getGatitos = (req, res) => {
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
  const nuevoGato = req.body;
  if (nuevoGato) {
    fs.readFile(`./assets/cats.json`, (err, data) => {
      const dataJSON = JSON.parse(data);
      nuevoGato.id = dataJSON.length;
      dataJSON.push(nuevoGato);
      fs.writeFile(`./assets/cats.json`, JSON.stringify(dataJSON), (err) => {
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
      JSON.stringify(arrGatitosFiltrado),
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

module.exports = { getGatito, getGatitos, postGatito, deleteGatito, putGatito };
