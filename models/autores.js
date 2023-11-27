//Importamos mongoose
const mongoose = require("mongoose");
//Creamos un Schema para asignar tablas a la base de datos
const Schema = mongoose.Schema;

//le damos una estructuras al schema de la tabla
const autoresSchema = new Schema({
    name: {type:String, required: true},
    nacionality: {type:String, required: true},
    year: {type:Number, required: true, min:18}
})

//aqui le decimos como queremos llamar a la estrutura en este caso autor
module.exports = mongoose.model("autor", autoresSchema);