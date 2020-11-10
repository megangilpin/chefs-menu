const express = require("express");
const router = express.Router();

router.post("/login", function(req, res, next) {
    try {
        const { username, password } = req.body
        // TODO
        // 1. verify that there is user for username
        // 2. verify that the passwords match
        // 3. create and return jwt
    }
    catch(error) {
        next(error)
    }
})

router.post("/register", function(req, res, next) {
    try {
        // TODO
        // verify that the password/username is valid
        // hash password before saving to DB
    }
    catch(error) {
        next(error)
    }
})

module.exports = router
