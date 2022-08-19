const express = require("express");
const formularioControles = require("../controllers/Formulario");

const api = express.Router();

api.get('/generarFormulario', formularioControles.GenerarFormulario)


module.exports = api;
