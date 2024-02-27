const express = require("express");
const { inserArray } = require("../MW/Validations/teacherVAlidator.js");
const validate = require("../MW/Validations/validator.js");
const { authorize } = require("../Controllers/loginController");
const {body,params,Query}=require("express-validator");


const teacherControllers = require("../Controllers/teacherControllers");
const Router = express.Router();
Router.route("/teachers")
  .get(teacherControllers.getAllTeachers)
  .post(inserArray, validate, teacherControllers.insertTeachers)
  .delete(authorize, teacherControllers.deleteTeachers)



Router.route("/teachers/updatepass")
  .put(
    [body("oldpassword").isAlphanumeric().withMessage("Password must be alphanumeric")],
    teacherControllers.IsMatchPass)

module.exports = Router;