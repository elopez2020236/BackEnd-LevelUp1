const Formulario = require('../models/Formulario.models');

function GenerarFormulario(req, res) {
    var parametros = req.body;
    var modeloFormulario = new Formulario();
    var carnet = parametros.carnet
    const cantidadLetras = parametros.carnet.length

    if (cantidadLetras === 6) {

        if (carnet.includes('0')) {
            return res.status(500).send({ mensaje: 'No se permiten 0' })
        }

        modeloFormulario.carnet = parametros.carnet;
        modeloFormulario.nombre = parametros.nombre;
        modeloFormulario.direccion = parametros.direccion;
        modeloFormulario.genero = parametros.genero;
        modeloFormulario.telefono = parametros.telefono;
        modeloFormulario.fechaNacimiento = parametros.fechaNacimiento;
        modeloFormulario.carrera =  parametros.carrera;
        modeloFormulario.generoPoesia = parametros.generoPoesia;
        modeloFormulario.fechaInscripcion = parametros.fechaInscripcion;


    } else {
        return res.status(500).send({ mensaje: 'Se necesitan 6 Caracteres para que sea valido' })

    }

}

module.exports = {
    GenerarFormulario,
}