//Importamos mongoose
const mongoose = require("mongoose");
//Creamos un Schema para asignar tablas a la base de datos
const Schema = mongoose.Schema;

//le damos una estructuras al schema de la tabla
const usersSchema = new Schema({
    email: {type:String, required: true, unique:true},
    login: {type:String, required: true, unique:true},
    name: {type:String, required: true},
    role: {type:String, required: true},
    password: {type:String, required: true},
    active: {type:Boolean, required: true}
})

usersSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

//aqui le decimos como queremos llamar a la estrutura en este caso user
module.exports = mongoose.model("user", usersSchema);