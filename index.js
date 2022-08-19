const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ExamenFinalLevelUp', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");
    const PORT = process.env.PORT || 3000
    app.listen(PORT, function () {
        console.log("Esta corriendo en el puerto" + PORT)
    })

}).catch(error => console.log(error));