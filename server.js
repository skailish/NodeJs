const app = require("./app");

// Determino un puerto
const port = 8080;

// La variable app va a escuchar a nuestro puerto
app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});
