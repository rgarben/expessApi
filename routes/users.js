const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {getUser,getUsers,addUser,editUser,delUser} = require("../controllers/users");
const {validateFields} = require("../middlewares/validate-fields");
const {existUserEmail, existUserLogin} = require("../helpers/db-validators");
const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


router.route('/').get(getUsers)
.post([    
    check('email','Email is required').not().notEmpty(),
    check('login','Login is required').not().notEmpty(),
    check('name','Name is required').not().notEmpty(),
    check('role','Role is required').not().notEmpty().isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('password','Password must have at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character').not().notEmpty().matches(passwordComplexityRegex),
    check('email').custom(existUserEmail),
    check('login').custom(existUserLogin),
    validateFields
],addUser)
.put([
    check('email','Email is required').not().notEmpty(),
    check('login','Login is required').not().notEmpty(),
    check('name','Name is required').not().notEmpty(),
    check('role','Role is required').not().notEmpty().isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('password','Password must have at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character').not().notEmpty().matches(passwordComplexityRegex),
    validateFields
],editUser);

router.route('/:id').get(getUser)
.delete(delUser)
.put([
    check('email','Email is required').not().notEmpty(),
    check('login','Login is required').not().notEmpty(),
    check('name','Name is required').not().notEmpty().isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role','Role is required').not().notEmpty(),
    check('password','Password must have at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character').not().notEmpty().matches(passwordComplexityRegex),
    check('email').custom(existUserEmail),
    check('login').custom(existUserLogin),
    validateFields
],editUser);

module.exports = router;
