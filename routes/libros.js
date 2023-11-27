const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {getLibros,getLibro,addLibros,delLibros,editLibros} = require("../controllers/libros");
const {validateFields} = require("../middlewares/validate-fields");
const {existLibro,existLibroEdit} = require("../helpers/db-validators");

router.route('/').get(getLibros)
.post([    
    check('name','Name is required').not().notEmpty(),
    check('numPages', 'Paga number should be a number').isFloat({min:1}),    
    check('category','Category is required').not().notEmpty(),
    check('author','Author is required').not().notEmpty(),
    check('name').custom(existLibro),
    validateFields
],addLibros).delete(delLibros)
.put([
    check('name','Name is required').not().notEmpty(),
    check('numPages', 'Paga number should be a number').isFloat({min:1}),    
    check('category','Category is required').not().notEmpty(),
    check('author','Author is required').not().notEmpty(),
    validateFields
],editLibros);

router.route('/:id').get(getLibro)
.delete(delLibros)
.put([
    check('name','Name is required').not().notEmpty(),
    check('numPages', 'Paga number should be a number').isFloat({min:1}),    
    check('category','Category is required').not().notEmpty(),
    check('author','Author is required').not().notEmpty(),
    check('id', "El id no es valido para Mongo").isMongoId(),
    check('name','_id').custom(existLibroEdit),
    validateFields
],editLibros);

module.exports = router;
