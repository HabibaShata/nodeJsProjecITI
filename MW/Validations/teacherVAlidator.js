const {body,params,Query}=require("express-validator");
const teacher = require("../../Model/teacherSchema"); 


exports.inserArray=[
    body("fullname").isAlpha().withMessage("Please enter a valid name"),
    body("Email").isEmail().withMessage("Please enter a valid mail")
        .custom(async (value, { req }) => {
            const teacher = await teacher.findOne({ Email: req.body.Email });
            if (teacher) {
                throw new Error("Email is unique choose another mail");
            }
        }),
    body("password").isAlphanumeric().withMessage("Password must be alphanumeric")
];

