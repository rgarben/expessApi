//Imporatamos el modelo libro
const Libro = require("../models/libros");

//obtenemos los libros de la base de datos con el find
const getLibros = async (req, res) =>{
    try {
        const libros = await Libro.find();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//obtenemos los libros de la base de datos con el find
const getLibro = async (req, res) =>{
    try {
        const libros = await Libro.findById(req.params.id);
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//Agregamos un libro a la base de datos
const addLibros = async (req, res) =>{
    //creamos una constante para guardar el body
    const libro = req.body;
    const newLibro = new Libro(libro);

    try {
        await newLibro.save();
        res.status(201).json(newLibro);
    } catch (error) {
        res.status(500).json({mensaje: error})
    }
}

//Eliminamos un libro de la base de datos
const delLibros = async (req, res) =>{
    try {
        const deleteLibro = await Libro.findOneAndDelete(req.params.id);
        res.status(204).json(deleteLibro);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//Editamos un libro de la base de datos
const editLibros = async (req, res) =>{
    try {
        const editLibro = await Libro.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(editLibro);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//exportamos los metodos para utilizarlos fuera de aqui
module.exports = {getLibros,getLibro,addLibros,delLibros,editLibros};