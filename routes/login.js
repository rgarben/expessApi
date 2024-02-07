const express = require("express");
const {check} = require("express-validator");
const {getUserLogin} = require("../controllers/login")
const { validateFields } = require("../middlewares/validateFields");
const router = express.Router();

router.route('/').post([
    check('password', 'Password is required and should be a String').isString(),
    check('email', 'Email is required and should be a String').isString(),
    validateFields,
    ],
    getUserLogin)

module.exports = router;
