const Libro = require('../models/libros');
const Autor = require('../models/autores');
const Category = require('../models/categorys');

const existLibro = async (name) =>{
    const libroDb = await Libro.findOne({name});
    if(libroDb){
        throw new Error(`Book ${name} already exists in database`);
    }
}

const existAutor = async (name) =>{
    const autorDb = await Autor.findOne({name});
    if(autorDb){
        throw new Error(`Author ${name} already exists in database`);
    }
}

const existCategory = async (name) =>{
    const categoryDb = await Category.findOne({name});
    if(categoryDb){
        throw new Error(`Cagetory ${name} already exists in database`);
    }
}

module.exports = {existLibro,existAutor,existCategory};