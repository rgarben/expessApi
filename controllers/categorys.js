//Importamos el modelo caterory
const Category = require("../models/categorys");

//obtenemos las categorys de la base de datos con el find
const getCategorys = async (req, res) =>{
    try {
        const categorys = await Category.find();
        res.status(200).json(categorys);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//Agregamos una category a la base de datos
const addCategorys = async (req, res) =>{
    //creamos una constante para guardar el body
    const category = req.body;
    const newCategory = new Category(category);

    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({mensaje: error})
    }
}

//Eliminamos una category de la base de datos
const delCategorys = async (req, res) =>{
    try {
        const deleteCategory = await Category.findOneAndDelete(req.params.id);
        res.status(204).json(deleteCategory);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//Editamos un category de la base de datos
const editCategorys = async (req, res) =>{
    try {
        const editCategory = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(editCategory);
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
}

//exportamos los metodos para utilizarlos fuera de aqui
module.exports = {getCategorys,addCategorys,delCategorys,editCategorys};