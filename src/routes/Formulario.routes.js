const express = require("express");
const formularioControles = require("../controllers/Formulario");

const api = express.Router();

api.post('/generarFormulario', formularioControles.GenerarFormulario)
api.get('/generarReporte', formularioControles.GenerarReporte)


module.exports = api;
