const Formulario = require('../models/Formulario.models');



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

function diasDeLaSemana(inicio, final) {
    var dia = new Date(inicio.getFullYear(),inicio.getMonth(),inicio.getDate() );
    var i = 1;

    while (final > 0) {
        dia = new Date(inicio.getFullYear(),inicio.getMonth(),inicio.getDate() + i);

        if (dia.getDay() > 0 && dia.getDay() < 6) {
            final--;
        }
        i++;
    }

    return dia;
}

function diaDeLaSemana(Inicio, Final) {
    var Dia = new Date(Inicio.getFullYear(),Inicio.getMonth() + 1,0);
    var i = 1;
  
    while (Final == 0) {Dia = new Date(Inicio.getFullYear(),Inicio.getMonth() + 1,0 - i);
  
      if (Dia.getDay() > 0 && Dia.getDay() < 6) {
        Final--;
      }
      i++;
    }

    return Dia;
  }
//----------------------------------------------------------------
function GenerarFormulario(req, res) {
    var parametros = req.body;
    var modeloFormulario = new Formulario();
    var carnet = parametros.carnet
    var fechaNacimientoo = new Date(parametros.fechaNacimiento)
    var generoPoesia1 = new Date();

    if (carnet?.length === 6 && carnet?.includes('0') == '0') {
        if (carnet?.charAt(0) === 'A' && carnet?.charAt(2) === '5') {
            if (carnet.charAt(carnet.length - 1) === "1" || carnet.charAt(carnet.length - 1) === "3" || carnet.charAt(carnet.length - 1) === "9") {
                if (parametros.carnet && parametros.nombre && parametros.direccion &&
                    parametros.genero && parametros.telefono && parametros.fechaNacimiento && parametros.carrera && parametros.generoPoesia) {
                    if (String(calcularEdad(parametros.fechaNacimiento)) > 17) {

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

                        if (carnet.charAt(carnet.length - 1) === '1' && parametros.generoPoesia == "dramatico") {
                            const diaDelGeneroPoesia = diasDeLaSemana(generoPoesia1, 5);
                            modeloFormulario.fechaDeclamacion = diaDelGeneroPoesia;

                        } else if (carnet.charAt(carnet.length - 1) === '3' && parametros.generoPoesia == "epico") {
                            const diaDelGeneroPoesia = diaDeLaSemana(generoPoesia1, );
                            modeloFormulario.fechaDeclamacion = diaDelGeneroPoesia;

                        } else {
                            var Hoy = new Date(
                                generoPoesia1.getFullYear(),
                                generoPoesia1.getMonth(),
                                generoPoesia1.getDate()
                            );
                            var SieteDias = Hoy.getDay() == 0 ? 7 : Hoy.getDay();
                            var sinFines = 7 - SieteDias;
                            Hoy.setDate(Hoy.getDate() + sinFines + 5);
                            modeloFormulario.fechaDeclamacion = Hoy;
                        }

                        modeloFormulario.save((err, formularioGuardado) => {
                            if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
                            if (!formularioGuardado) return res.status(500).send({ mensaje: 'error al crear formulario ' })
                            return res.status(200).send(formularioGuardado.fechaDeclamacion)
                        })

                    } else {
                        return res.status(500).send({ mensaje: "Necesitas ser mayor de 17aÃ±os" })
                    }
                } else {
                    return res.status(500).send({ mensaje: "agregue todos los parametros" })
                }
            } else {
                return res.status(500).send({ mensaje: "El Sexto Caracter debe ser '1, 3, 9' " })
            }
        } else {
            return res.status(500).send({ mensaje: "Debe ser 'A mayuscula' el primer caracter,    El tercer caracter debe ser 5" })
        }
    } else {
        return res.status(500).send({ mensaje: 'Se necesitan 6 Caracteres para que sea valido,     No se Permiten 0' })
    }
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