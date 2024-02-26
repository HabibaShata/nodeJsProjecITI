const express=require("express");
const {inserArray}=require("../MW/Validations/teacherVAlidator.js");
const validate=require("../MW/Validations/validator.js");
const {authorize}= require("../Controllers/loginController");

 const  teacherControllers= require("../Controllers/teacherControllers");
const Router=express.Router();
Router.route("/teachers")
      .get(authorize,teacherControllers.getAllTeachers)
      .post(authorize,inserArray,validate,teacherControllers.insertTeachers)
      .put(authorize,inserArray,teacherControllers.updateTeachers)
      .delete(authorize,teacherControllers.deleteTeachers)



    module.exports=Router;