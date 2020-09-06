const express = require("express");
const fs = require("fs");
const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    Estado: "Bienvenido a mi API",
  });
});

app.get("/gatitos", (req, res) => {
  fs.readFile(`${__dirname}/assets/cats.json`, (err, data) => {
    const dataJSON = JSON.parse(data);
    res.json({
      status: "Success",
      data: dataJSON,
    });
  });
});

app.get("/gatitos/:id", (req, res) => {
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
});

// Agregar algo a mi api
app.post("/gatitos", (req, res) => {
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
});

// PUT y DELETE
// -> PUT
app.put("/gatitos", (req, res) => {
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
});

// -> DELETE
app.delete("/gatitos/:id", (req, res) => {
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
});

// Determino un puerto
const port = 8080;

// La variable app va a escuchar a nuestro puerto
app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});
