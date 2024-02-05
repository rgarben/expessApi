const express = require("express");
const {check} = require("express-validator");
const {getUserLogin} = require("../controllers/login")
const router = express.Router();

router.route('/').post([
    check('password', 'Password is required').notEmpty(),
    check('password', 'Password should be a String').isString(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email should be a String').isString(),
    check('email', 'Email should be a email').isEmail(),
],getUserLogin)

module.exports = router;
