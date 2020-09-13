// MEAN stack --> mongo express angular node
// MERN stack --> mongo express react node

// Node tiene módulos como herramientas de uso
// filesystem (fs): módulo de nodejs para leer cualquier carpeta/archivo de mi ordenador
// Para invocarlo, lo requerimos
const fs = require("fs");
// El módulo http
const http = require("http");
// El módulo url
const url = require("url"); // guardar en variable lo que me piden
// Puedo requerir módulos propios de la misma manera que los incluidos en node
const jsonAEnviar = require("./modules/enviarJson");

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

// Método create-server
const server = http.createServer((req, res) => {
  console.log(url.parse(req.url)); // me loguea desde qué ubicación están haciendo la petición, el método parse de url me lo parsea a un objeto con información detallada de la petición

  const { pathname, query } = url.parse(req.url, true); // guardo en variables la info del parse

  if (req.url === "/peliculas") {
    if (query.id === "1") {
      fs.readFile("./assets/singleMovie.json", "utf-8", (err, data) => {
        res.end(data);
      });
    }
    fs.readFile("./assets/movies.json", "utf-8", (err, data) => {
      res.end(data);
    });
  } else if (req.url === "/series") {
    fs.readFile("./assets/series.json", "utf-8", (err, data) => {
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      // Le puedo customizar los mensajes recibidos
      "Content-type": "text/html", // Cuando el navegador encuentre esto, va a esperar este tipo de respuesta
    });
    // Server-side rendering: renderizado desde el servidor
    res.end("<h1>No se encontró la página</h1>"); // si no pone ninguna de esas urls. Puedo usar html si lo especifico con el método writeHead
  }
});
// la respuesta se puede acceder desde mi puerto 8080
server.listen(8080);
