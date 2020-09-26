const express = require("express");
const morgan = require("morgan");
const app = express();
const userRouter = require("./routes/userRoutes");
const refugioRouter = require("./routes/refugioRoutes");
const gatitoRouter = require("./routes/gatitoRoutes");
const router = require("./routes/userRoutes");

app.use(express.json());

app.use(morgan("dev"));

// Si quiero hacer validaciones, defino una función en el controller que valide lo que quiero validar, la exporto, y luego la invoco desde el método param
// router.param("id", checkId);

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

app.use("/users", userRouter);
app.use("/gatitos", gatitoRouter);
app.use("/refugios", refugioRouter);

module.exports = app;
