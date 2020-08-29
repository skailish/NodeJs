const prettyMilliseconds = require("pretty-ms");

const calcularFechaActual = () => {
  return Date();
};

const cuantoFaltaMiCumple = () => {
  const hoy = new Date();
  const miCumple = new Date(2020, 8, 20);
  return miCumple - hoy;
};

const cuantosDiasFaltan = (date) => {
  const prettyDate = prettyMilliseconds(date);
  return prettyDate.split(" ")[0];
};

console.log(calcularFechaActual());
console.log(cuantoFaltaMiCumple());
console.log(cuantosDiasFaltan(cuantoFaltaMiCumple()));
