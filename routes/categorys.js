const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {getCategorys,addCategorys,delCategorys,editCategorys} = require("../controllers/categorys");
const {validateFields} = require("../middlewares/validate-fields");
const {existCategory} = require("../helpers/db-validators");

router.route('/').get(getCategorys)
.post([
    check('name','Name is required').not().notEmpty(),
    check('descrip', 'Descrip is required').not().notEmpty(),
    check('name').custom(existCategory),
    validateFields
],addCategorys).delete(delCategorys)
.put([
    check('name','Name is required').not().notEmpty(),
    check('descrip', 'Descrip is required').not().notEmpty(),
    validateFields
],editCategorys);

router.route('/:id').get(getCategorys)
.delete(delCategorys)
.put([
    check('name','Name is required').not().notEmpty(),
    check('descrip', 'Descrip is required').not().notEmpty(),
    check('id', "El id no es valido para Mongo").isMongoId(),
    validateFields
],editCategorys);

module.exports = router;
