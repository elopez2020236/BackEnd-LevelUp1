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



function GenerarFormulario(req, res) {
    var parametros = req.body;
    var modeloFormulario = new Formulario();
    var carnet = parametros.carnet
    var cantidadLetras = carnet?.length;
    var PrimeraLetra = carnet?.charAt(0)
    var TerceraLetra = carnet?.charAt(2)
    var SextaLetra = carnet.charAt(carnet.length - 1)
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

    if (cantidadLetras === 6) {
        return res.status(500).send({ mensaje: 'Se necesitan 6 Caracteres para que sea valido' })

    } else if (carnet.includes('0') == false) {
        return res.status(500).send({ mensaje: 'No se permiten ceros' })

    } else if (PrimeraLetra === 'A') {
        return res.status(500).send({ mensaje: 'Debe ser A mayuscula el primer caracter' })

    } else if (TerceraLetra === '5') {
        return res.status(500).send({ mensaje: 'Debe ser 5 el Tercer Caracter caracter' })

    } else if (SextaLetra === "1" || SextaLetra === "3" || SextaLetra === "9") {
        return res.status(500).send({ mensaje: 'El Sexto Caracter debe ser 1, 3, 9' })

    } else if (parametros.carnet && parametros.nombre && parametros.direccion &&
        parametros.genero && parametros.telefono && parametros.fechaNacimiento && parametros.carrera && parametros.generoPoesia) {
        return res.status(500).send({ mensaje: 'Agregue todos los parametros' })

    } else if (String(calcularEdad(parametros.fechaNacimiento)) > 17) {
        return res.status(500).send({ mensaje: 'Se necesita ser mayor de 17 años' })
        
    } else {



        modeloFormulario.save((err, formularioGuardado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if (!formularioGuardado) return res.status(500).send({ mensaje: 'error al crear formulario ' })
            return res.status(200).send(formularioGuardado.fechaDeclamacion)
        })
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