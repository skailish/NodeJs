const express = require("express");
const router = express.Router();

const getRefugios = (req, res) => {
  fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    res.json({
      status: "Success",
      data: dataJSON,
    });
  });
};

const getRefugio = (req, res) => {
  // obtener los parámetros que indicó el usuario
  console.log(req.params);
  // Recibir una petición
  fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Ocurrió un error",
      });
    }
    const refugios = JSON.parse(data);
    const id = Number(req.params.id);
    const refugiosFiltrados = refugios.filter((refugio) => refugio.id === id);
    if (!refugiosFiltrados.length) {
      res.status(404).json({
        status: "fail",
        message: "refugio no encontrado",
      });
    }
    res.json({
      status: "Success",
      data: refugiosFiltrados,
    });
  });
};

const postRefugio = (req, res) => {
  // Primero determino toda la info a agregar
  fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
    //   Obtengo lo que ya existe
    const dataJSON = JSON.parse(data);
    // Asigno a una variable lo que envía el post
    const nuevoRefugio = req.body;
    //   Le asigno un ID de acuerdo al lenght de lo que ya tengo
    nuevoRefugio.id = dataJSON.length;
    //   Le sumo mi nuevoRefugio a lo que ya tengo
    dataJSON.push(nuevoRefugio);
    // Ahora agrego la data
    fs.writeFile(
      `${__dirname}/assets/refugios.json`,
      JSON.stringify(dataJSON),
      (err) => {
        // Éxito al grabar? 201
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
};

const putRefugio = (req, res) => {
  fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const refugioEditado = req.body;

    const newJson = dataJSON.map((refugio) => {
      refugio = refugio.id == refugioEditado.id ? refugioEditado : refugio;
      return refugio;
    });
    // Ahora actualizo la data
    fs.writeFile(
      `${__dirname}/assets/refugios.json`,
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

const deleteRefugio = (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(`${__dirname}/assets/refugios.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const refugioNombre = dataJSON[id].name;
    const resultadoFiltrado = dataJSON.filter((refugio) => refugio.id !== id);

    // Ahora actualizo la data
    fs.writeFile(
      `${__dirname}/assets/refugios.json`,
      JSON.stringify(resultadoFiltrado),
      (err) => {
        res
          .status(201)
          .send(`Borraste al Refugio ${refugioNombre}, cuánta maldad`);
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
