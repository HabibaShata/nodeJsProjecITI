const {body}=require("express-validator");
module.exports.insertData=
    [body("name").isAlpha().withMessage("please enter a valid name")
    ,body("superVisor").isAlphanumeric().withMessage("please enter a valid supervisor")
    ,body("children").isInt().withMessage("please enter a valid children")];



