const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {getUser,getUsers,addUser,editUser,delUser} = require("../controllers/users");
const {validateFields} = require("../middlewares/validate-fields");
const {existUserEmail, existUserLogin,existIdUser} = require("../helpers/db-validators");

const { validateJWT } = require("../middlewares/validateJwt");
const { hasRole } = require("../middlewares/validateRol");

router
.route('/')
.get(getUsers)
.post([    
    check('email','Email is required').isString(),
    check('login','Login is required').isString(),
    check('name','Name is required').isString(),
    check('role','Role is required').not().notEmpty().isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('password','Password must have at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character').matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"),
    check('email').custom(existUserEmail),
    check('login').custom(existUserLogin),
    validateFields
    ]
    ,addUser);

router
.route('/:id')
.get([
    check("id","El id no existe").isMongoId(),
    check("id").custom(existIdUser),
    validateFields
]
,getUser)
.delete([
    validateJWT,
    hasRole,
    check("id","El id no existe").isMongoId(),
    check("id").custom(existIdUser),
    validateFields
],
delUser)
.put([
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existIdUser),
    check('email','Email is required').isString(),
    check('login','Login is required').isString(),
    check('name','Name is required').isString(),
    check('role','Role is required').isString().isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('password','Password must have at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character').matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"),
    check("active","Active es de tipo boolean obligatorio").isBoolean(),
    check('email').custom(existUserEmail),
    check('login').custom(existUserLogin),
    validateFields
    ],
    editUser);

module.exports = router;
