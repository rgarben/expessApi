
//forma de ahorrarte escribir validation.express-validator siempre
const {validationResult} = require("express-validator");

const validateFields = (req,res, next) =>{

    //recogemos los parametros en el req y le pasamos el filtro de validationResult 
    //y si hay algun error, pues lo añade a la constante de errores
    const errors = validationResult(req);
    //vemos si errors no esta vacio y si no que me lo devuelva
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    //digamos que es para que muestre el error
    next();
}

//exportamos los metodos para utilizarlos fuera de aqui
module.exports = {validateFields};