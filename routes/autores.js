const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {getAutores,addAutores,delAutores,editAutores} = require("../controllers/autores");
const {validateFields} = require("../middlewares/validate-fields");
const {existAutor} = require("../helpers/db-validators");

router.route('/').get(getAutores)
.post([
    check('name','Name is required').not().notEmpty(),
    check('nacionality','Nacionality is required').not().notEmpty(),
    check('year', 'Year number should be a number').isFloat({min:18}),
    check('name').custom(existAutor),
    validateFields
],addAutores).delete(delAutores)
.put([
    check('name','Name is required').not().notEmpty(),
    check('nacionality','Nacionality is required').not().notEmpty(),
    check('year', 'Year number should be a number').isFloat({min:18}),
    validateFields
],editAutores);

router.route('/:id').get(getAutores)
.delete(delAutores)
.put([
    check('name','Name is required').not().notEmpty(),
    check('nacionality','Nacionality is required').not().notEmpty(),
    check('year', 'Year number should be a number').isFloat({min:18}),
    check('id', "El id no es valido para Mongo").isMongoId(),
    validateFields
],editAutores);

module.exports = router;
