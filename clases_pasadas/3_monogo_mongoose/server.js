const app = require("./app");
const mongoose = require("mongoose");

// Determino un puerto
const port = 8080;

mongoose.connect("mongodb://localhost:27017/", { dbName: "ada" }, (err) =>
  err ? console.log(err) : console.log("Conectado a la base de datos")
);


// La variable app va a escuchar a nuestro puerto
app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});
