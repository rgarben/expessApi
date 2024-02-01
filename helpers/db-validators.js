const Libro = require('../models/libros');
const Autor = require('../models/autores');
const Category = require('../models/categorys');
const User = require('../models/users');

const existLibro = async (name) =>{
    const libroDb = await Libro.findOne({name});
    const idlibroDb = await Libro.findOne({id});
    if(libroDb){
        throw new Error(`Book ${name} already exists in database`);
    }
}

const existLibroEdit = async (name, {req}) => {
    const libroByName = await Libro.findOne({ name });
    
    if (libroByName && libroByName.id !== req.params.id) {
        throw new Error(`Book ${name} already exists in the database`);
    }
};

const existUserEmail = async (email, {req}) => {
    const userSr = await User.findOne({email});
    if(userSr){
        throw new Error(`Email ${email} already exists in database`);
    }
};

const existUserLogin = async (login, {req}) => {
    const userSr = await User.findOne({login});
    if(userSr){
        throw new Error(`Username ${login} already exists in database`);
    }
};

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

module.exports = {existLibro,existAutor,existCategory,existLibroEdit,existUserEmail,existUserLogin};