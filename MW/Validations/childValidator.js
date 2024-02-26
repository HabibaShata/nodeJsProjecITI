 
const {body}=require("express-validator");

 module.exports.insertData=[
    body("_id").isInt().withMessage("_id must be integer"),
    body("fullname").isString().withMessage("full name must be string "),
    body("level").isString().withMessage("level must be string "),
    body("age").isInt().withMessage("age must be integer"),
    body('address.city').isString().withMessage('City must be a string'),
    body('address.street').isString().withMessage('Street must be a string'),
    body('address.building').isString().withMessage('Building must be a string')
]; 