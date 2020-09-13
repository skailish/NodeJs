const fs = require("fs");

const mostrarArchivos = () => {
  console.log(fs.readFileSync("./text1.txt", "utf-8"));
  console.log(fs.readFileSync("./text2.txt", "utf-8"));
  console.log(fs.readFileSync("./text3.txt", "utf-8"));
};

const crearConMayusculas = () => {
  const text3 = fs.readFileSync("./text3.txt", "utf-8");
  const nuevoTexto = text3.toUpperCase();
  fs.writeFileSync("./nuevoConMayusculas.txt", nuevoTexto);
};

const crearNuevoArchivo = () => {
  const text1 = fs.readFileSync("./text1.txt", "utf-8");
  const text2 = fs.readFileSync("./text2.txt", "utf-8");
  const text3 = fs.readFileSync("./text3.txt", "utf-8");
  const nuevoTexto = text1 + text2 + text3;
  fs.writeFileSync("./nuevoTexto.txt", nuevoTexto);
};
mostrarArchivos();
crearConMayusculas();
crearNuevoArchivo();
