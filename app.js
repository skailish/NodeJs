const express = require("express");
const morgan = require("morgan");
const app = express();
const userRouter = require("./routes/userRoutes");
const refugioRouter = require("./routes/refugioRoutes");
const gatitoRouter = require("./routes/gatitoRoutes");

app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

app.use("/users", userRouter);
app.use("/gatitos", gatitoRouter);
app.use("/refugios", refugioRouter);

module.exports = app;
