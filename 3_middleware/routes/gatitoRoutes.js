const express = require("express");
const router = express.Router();

// Acá defino mis funciones, que luego en los middleware voy a invocar
const getGatitos = (req, res) => {
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    res.json({
      status: "Success",
      data: dataJSON,
    });
  });
};

const getGatito = (req, res) => {
  // obtener los parámetros que indicó el usuario
  console.log(req.params);
  // Recibir una petición
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Ocurrió un error",
      });
    }
    const gatos = JSON.parse(data);
    const id = Number(req.params.id);
    const gatosFiltrados = gatos.filter((gato) => gato.id === id);
    if (!gatosFiltrados.length) {
      res.status(404).json({
        status: "fail",
        message: "Gato no encontrado",
      });
    }
    res.json({
      status: "Success",
      data: gatosFiltrados,
    });
  });
};

const postGatito = (req, res) => {
  // Primero determino toda la info a agregar
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    //   Obtengo lo que ya existe
    const dataJSON = JSON.parse(data);
    // Asigno a una variable lo que envía el post
    const nuevoGato = req.body;
    //   Le asigno un ID de acuerdo al lenght de lo que ya tengo
    nuevoGato.id = dataJSON.length;
    //   Le sumo mi nuevoGato a lo que ya tengo
    dataJSON.push(nuevoGato);
    // Ahora agrego la data
    fs.writeFile(
      `${__dirname}/assets/cats.json`,
      JSON.stringify(dataJSON),
      (err) => {
        // Éxito al grabar? 201
        res.status(201).json({
          status: "success",
          data: {
            nuevoGato,
            createdAt: new Date(),
          },
        });
      }
    );
  });
};

const putGatito = (req, res) => {
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const gatoEditado = req.body;

    const newJson = dataJSON.map((gato) => {
      gato = gato.id == gatoEditado.id ? gatoEditado : gato;
      return gato;
    });
    // Ahora actualizo la data
    fs.writeFile(
      `${__dirname}/assets/cats.json`,
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

const deleteGatito = (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    const gatoNombre = dataJSON[id].name;
    const resultadoFiltrado = dataJSON.filter((gato) => gato.id !== id);

    // Ahora actualizo la data
    fs.writeFile(
      `${__dirname}/assets/cats.json`,
      JSON.stringify(resultadoFiltrado),
      (err) => {
        res.status(201).send(`Borraste al gatito ${gatoNombre}, cuánta maldad`);
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