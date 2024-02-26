const express = require("express");
const classControllers = require("./../Controllers/classControllers");
const {insertData} =require("../MW/Validations/classValidation")
const validator=require("../MW/Validations/validator")

const Router = express.Router();
Router.route("/class")
    .get(classControllers.getAllClass)
    .post(insertData,validator,classControllers.insertClass)
    .put(classControllers.updateClass)
    .delete(classControllers.deleteClass)





module.exports = Router;