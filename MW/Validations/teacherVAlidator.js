const {body,params,Query}=require("express-validator");

exports.inserArray=[
    body("fullname").isString().withMessage("student name should be string"),
    body("password").isString().withMessage("pass  should be string"),
    body("Email").isString().withMessage("you must enter valid email"),
   // body("Image").isString().withMessage("you must enter valid  src img"),
    
];