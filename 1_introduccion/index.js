// filesystem (fs): módulo de nodejs para leer cualquier carpeta/archivo de mi ordenador
// Para invocarlo, lo requerimos
const fs = require("fs");
// fs tiene varios métodos para trabajar.
// readFileSync = leer archivo de manera síncrona, @param ruta @param encoding
const textoLeido = fs.readFileSync("./assets/texto.txt", "utf-8");

// writeFileSync = escribir archivo de manera síncrona
const nuevoTexto = `Esto es lo que dice mi otro archivo: ${textoLeido}`;
fs.writeFileSync("./assets/nuevoTexto.txt", nuevoTexto);

// Se pueden agregar callbacks
fs.readFile("./assets/texto.txt", "utf-8", (err, data) => {
  if (err) console.log(err); // Manejo de errores

  console.log(data);
});

// El módulo http
const http = require("http");
// Método create-server
const server = http.createServer((req, res) => {
  console.log(req.req); // me loguea desde qué ubicación están haciendo la petición
  if (req.url === "/peliculas") {
    fs.readFile("./assets/movies.json", "utf-8", (err, data) => {
      res.end(data);
    });
  } else if (req.url === "/series") {
    fs.readFile("./assets/series.json", "utf-8", (err, data) => {
      res.end(data);
    });
  } else res.end("No se encontró la página"); // si no pone ninguna de esas urls
});
// la respuesta se puede acceder desde mi puerto 8080
server.listen(8080);
