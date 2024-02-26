const {body}=require("express-validator");
module.exports.insertData=[
body("_id").isInt().withMessage("id must be integer"),
body("name").isString().withMessage("name must be string"),

]