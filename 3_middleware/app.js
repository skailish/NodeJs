const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
const userRouter = require("./routes/userRoutes");
const refugioRouter = require("./routes/refugioRoutes");
const gatitoRouter = require("./routes/gatitoRoutes");

// MIDDLEWARES
app.use(express.json());

// MORGAN: me sirve para cualquier request que venga, me lo loguee en la consola
app.use(morgan("dev"));

// next() me lleva al próximo middleware, el primero que aparezca
app.use((req, res, next) => {
  console.log("Estoy en middleware");
  next();
});
// Este es el siguiente middleware. Define el requestedAt
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

app.use("/users", userRouter);
app.use("/gatitos", gatitoRouter);
app.use("/refugio", refugioRouter);

// Determino un puerto
const port = 8080;

// La variable app va a escuchar a nuestro puerto
app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});
