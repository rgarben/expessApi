//Importamos el modelo autor
const Autor = require("../models/autores");

//obtenemos los autores de la base de datos con el find
const getAutores = async (req, res) =>{
    try {
        const autores = await Autor.find();
        res.status(200).json(autores);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//Agregamos un autor a la base de datos
const addAutores = async (req, res) =>{
    //creamos una constante para guardar el body
    const autor = req.body;
    const newAutor = new Autor(autor);

    try {
        await newAutor.save();
        res.status(201).json(newAutor);
    } catch (error) {
        res.status(500).json({mensaje: error})
    }
}

//Eliminamos un autor de la base de datos
const delAutores = async (req, res) =>{
    try {
        const deleteAutor = await Autor.findOneAndDelete(req.params.id);
        res.status(204).json(deleteAutor);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//Editamos un autor de la base de datos
const editAutores = async (req, res) =>{
    try {
        const editAutor = await Autor.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(editAutor);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//exportamos los metodos para utilizarlos fuera de aqui
module.exports = {getAutores,addAutores,delAutores,editAutores};