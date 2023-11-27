//Importamos mongoose
const mongoose = require("mongoose");
//Creamos un Schema para asignar tablas a la base de datos
const Schema = mongoose.Schema;

//le damos una estructuras al schema de la tabla
const categorysSchema = new Schema({
    name: {type:String, required: true},
    descrip: {type:String, required: true}
})

//aqui le decimos como queremos llamar a la estrutura en este caso category
module.exports = mongoose.model("category", categorysSchema);