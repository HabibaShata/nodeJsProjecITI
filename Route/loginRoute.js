
const express = require("express");
const controller = require("../Controllers/loginController");
const Router = express.Router();


Router.route("/login",controller.login);

module.exports = Router;
