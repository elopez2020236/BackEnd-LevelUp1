const Formulario = require('../models/Formulario.models');

function GenerarFormulario(req, res) {
    var parametros = req.body;
    var modeloFormulario = new Formulario();
    var carnet = parametros.carnet
    const cantidadLetras = parametros.carnet.length
    var PrimeraLetra = carnet.charAt(0)
    var TerceraLetra = carnet.charAt(2)
    var SextaLetra = carnet.charAt(5)
    var cero = carnet.includes('0')

    if (cantidadLetras === 6) {
        if (cero == false) {
            if (PrimeraLetra === 'A') {
                if (TerceraLetra === '5') {
                    if (SextaLetra === "1" || SextaLetra === "3" || SextaLetra === "9") {




                        if (parametros.carnet && parametros.nombre && parametros.direccion &&
                            parametros.genero && parametros.telefono && parametros.fechaNacimiento && parametros.carrera && parametros.generoPoesia) {


                            modeloFormulario.carnet = parametros.carnet;
                            modeloFormulario.nombre = parametros.nombre;
                            modeloFormulario.direccion = parametros.direccion;
                            modeloFormulario.genero = parametros.genero;
                            modeloFormulario.telefono = parametros.telefono;
                            modeloFormulario.fechaNacimiento = parametros.fechaNacimiento;
                            modeloFormulario.carrera = parametros.carrera;
                            modeloFormulario.generoPoesia = parametros.generoPoesia;
                            modeloFormulario.fechaInscripcion = parametros.fechaInscripcion;
                            modeloFormulario.fechaDeclamacion = parametros.fechaDeclamacion;


                            modeloFormulario.save((err, formularioGuardado) => {
                                if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                                if (!formularioGuardado) return res.status(500).send({ mensaje: 'error al crear formulario ' })
                                return res.status(200).send(formularioGuardado.fechaDeclamacion)
                            })

                        } else {
                            return res.status(500).send({ mensaje: "agregue todos los parametros" })
                        }

                    } else {
                        return res.status(500).send({ mensaje: "El Sexto Caracter debe ser '1, 3, 9' " })
                    }

                } else {
                    return res.status(500).send({ mensaje: "Debe ser '5 el Tercer Caracter' caracter" })
                }
            } else {
                return res.status(500).send({ mensaje: "Debe ser 'A mayuscula' el primer caracter" })
            }

        } else {
            return res.status(500).send({ mensaje: 'No se permiten 0' })

        }

    } else {
        return res.status(500).send({ mensaje: 'Se necesitan 6 Caracteres para que sea valido' })

    }

}

//----------------------------------------------------------------

function GenerarReporte(req, res) {
    const generoReporte = req.params.genero;
    Formulario.find({ generoPoesia: generoReporte }, (err, reporteEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!reporteEncontrado) return res.status(404).send({ mensaje: 'Error al obtener reporte' })
        return res.status(200).send({ reporte: reporteEncontrado })
    })
}

module.exports = {
    GenerarFormulario,
    GenerarReporte,
}