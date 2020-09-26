const fs = require("fs");
const Gatito = require("../models/gatitos");

const getGatitos = async (req, res) => {
  try {
    const gatitos = await Gatito.find();
    res.status(201).json({
      status: "success",
      data: gatitos,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

const getGatito = async (req, res) => {
  try {
    const gatito = await Gatito.findOne({
      _id: req.params.id,
    });
    res.status(201).json({
      status: "success",
      data: gatito,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

const postGatito = async (req, res) => {
  try {
    if (!req.body.nombre) {
      return res.status(400).json({
        status: "fail",
        err: "Nombre es un campo requerido",
      });
    }
    const nuevoGato = await Gatito.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        nuevoGato,
        createdAt: new Date(),
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err: err,
    });
  }
};

const putGatito = async (req, res) => {
  try {
    await Gatito.replaceOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.status(201).json({
      status: "success",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

const patchGatito = async (req, res) => {
  try {
    await Gatito.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.status(201).json({
      status: "success",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

const deleteGatito = async (req, res) => {
  try {
    await Gatito.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = {
  getGatito,
  getGatitos,
  postGatito,
  deleteGatito,
  putGatito,
  patchGatito,
};
