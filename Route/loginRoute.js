
const express = require("express");
const Controllers = require("../Controllers/loginController");
const Router = express.Router();


Router.route("/login")
       .post(Controllers.login);

module.exports = Router;
