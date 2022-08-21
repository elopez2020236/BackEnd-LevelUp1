const Formulario = require('../models/Formulario.models');

function GenerarFormulario(req, res) {
    var parametros = req.body;
    var modeloFormulario = new Formulario();
    var carnet = parametros.carnet
    var cantidadLetras = carnet?.length;
    var PrimeraLetra = carnet?.charAt(0)
    var TerceraLetra = carnet?.charAt(2)
    var SextaLetra = carnet?.charAt(5)
    var cero = carnet?.includes('0')

    Formulario.find({ carnet: parametros.carnet }, (err, encontrado) => {
        if (encontrado.length > 0) {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if (!encontrado) return res.status(500).send({ mensaje: 'error' })
            return res.status(500).send({ mensaje: "Este estudiante ya lleno el formulario" })
        } else {


            if (cantidadLetras === 6) {
                if (cero == false) {
                    if (PrimeraLetra === 'A') {
                        if (TerceraLetra === '5') {
                            if (SextaLetra === "1" || SextaLetra === "3" || SextaLetra === "9") {
                                if (parametros.carnet && parametros.nombre && parametros.direccion &&
                                    parametros.genero && parametros.telefono && parametros.fechaNacimiento && parametros.carrera && parametros.generoPoesia) {

                                    //----------------------------------------------------------------------------------------------------------------------------------------------

                                    function calcularEdad(fechaNacimiento) {

                                        var fechaActual = new Date();
                                        var anoActual = parseInt(fechaActual.getFullYear());
                                        var mesActual = parseInt(fechaActual.getMonth()) + 1;
                                        var diaActual = parseInt(fechaActual.getDate());

                                        var anoNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
                                        var mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
                                        var diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));

                                        let edad = anoActual - anoNacimiento;
                                        if (mesActual < mesNacimiento) {
                                            edad--;
                                        } else if (mesActual === mesNacimiento) {
                                            if (diaActual < diaNacimiento) {
                                                edad--;
                                            }
                                        }
                                        return edad;
                                    };

                                    var M17 = String(calcularEdad(parametros.fechaNacimiento))

                                    //-----------------------------------------------------------------------------------------------------------------------------------------------
                                    if (M17 > 17) {
                                        let fechaNacimientoo = new Date(parametros.fechaNacimiento)

                                        modeloFormulario.carnet = parametros.carnet;
                                        modeloFormulario.nombre = parametros.nombre;
                                        modeloFormulario.direccion = parametros.direccion;
                                        modeloFormulario.genero = parametros.genero;
                                        modeloFormulario.telefono = parametros.telefono;
                                        modeloFormulario.fechaNacimiento = fechaNacimientoo.toLocaleDateString();
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
                                        return res.status(500).send({ mensaje: "Necesitas ser mayor de 17años" })
                                    }

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
    })
}

//----------------------------------------------------------------

function GenerarReporte(req, res) {
    Formulario.find({}, (err, Formulario) => {
        if (err) return res.status(500).send({ mensaje: 'Error' })
        if (!Formulario) return res.status(404).send({ mensaje: 'No hay datos' })
        
        return res.status(200).send({ Formulario: Formulario })
    })
}

module.exports = {
    GenerarFormulario,
    GenerarReporte,
}