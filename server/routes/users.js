// ROUTER FOR OUR USERS

const express = require("express");
const userController = require("../controllers/usersController");
const { loginRequired } = require("../middleware");

const router = express.Router();



module.exports = router;
