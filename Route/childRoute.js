const express = require("express");
const {insertData}=require("../MW/Validations/childValidator");
const validator=require("../MW/Validations/validator")
const childControllers= require("../Controllers/childControllers");
const {authorize}= require("../Controllers/loginController");
const Router = express.Router();
Router.route("/child")
    .get(authorize,childControllers.getAllChildern)
    .post(authorize,insertData,validator,childControllers.inserChild)
    .delete(authorize,childControllers.deletechild)


   











module.exports = Router;
