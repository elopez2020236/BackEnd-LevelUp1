const express = require('express');
const cors = require('cors');
const app = express();

const FormularioRoutes = require('./src/routes/Formulario.routes');

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(cors());

app.use("/api", FormularioRoutes);

module.exports = app;

