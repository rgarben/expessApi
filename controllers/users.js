//Importamos el modelo user
const User = require("../models/users");
const bcryptjs = require("bcryptjs")


//obtenemos los users de la base de datos con el find
const getUsers = async (req, res) =>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//Obtenemos un user
const getUser = async (req, res) =>{
    try {
        const users = await User.findById(req.params.id);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//Agregamos un user a la base de datos
const addUser = async (req, res) =>{
    //creamos una constante para guardar el body
    const user = req.body;
    const salt = bcryptjs.genSaltSync();
    encryptedPassword = bcryptjs.hashSync( req.body.password, salt);
    user.password = encryptedPassword;
    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({mensaje: error})
    }
}

// Modificar el atributo 'active' del usuario en lugar de eliminarlo
const delUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Buscar y actualizar el usuario estableciendo 'active' a false
        const deletedUser = await User.findByIdAndUpdate(userId, { active: false }, { new: true });

        // Verificar si el usuario existe y fue actualizado correctamente
        if (!deletedUser) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

//Editamos un user de la base de datos
const editUser = async (req, res) =>{
    try {
        const editUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(editUser);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//exportamos los metodos para utilizarlos fuera de aqui
module.exports = {editUser,addUser,delUser,getUsers,getUser};