//Importamos mongoose
const mongoose = require("mongoose");
//Creamos un Schema para asignar tablas a la base de datos
const Schema = mongoose.Schema;

//le damos una estructuras al schema de la tabla
const librosSchema = new Schema({
    name: {type:String, required: true},
    numPages: {type:Number, required: true, min: 1},
    category: {type:String, required: true},
    author: {type:String, required: true}
})

//aqui le decimos como queremos llamar a la estrutura en este caso libro
module.exports = mongoose.model("libro", librosSchema);