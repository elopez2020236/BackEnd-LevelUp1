const express = require("express");
const formularioControles = require("../controllers/Formulario");

const api = express.Router();

api.get('/generarFormulario', formularioControles.GenerarFormulario)
api.get('/generarReporte/:genero', formularioControles.GenerarReporte)


module.exports = api;
