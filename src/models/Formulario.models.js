const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormularioSchema = Schema({
    carnet: String,
    nombre: String,
    direccion: String,
    genero: String,
    telefono: Number,
    fechaNacimiento: String,
    carrera: String,
    generoPoesia: String,
    fechaInscripcion: String,
    fechaDeclamacion: String,
});

module.exports = mongoose.model("Formulario", FormularioSchema);