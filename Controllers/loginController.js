
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const teacher = require("../Model/teacherSchema");
const bcrypt = require("bcrypt");
//require('dotenv').config();
const HabibaKey = process.env.SECRET_KEY;



//==================login ===========  

module.exports.login = (request, response, next) => {

  teacher.findOne({
    Email: request.body.Email,

  })
    .then(data => {
      if (data == null)  //  not exist in system 
        next(new Error("Not Authenticated"));
      bcrypt.compare(request.body.pass, data.pass, (error, resault) => {
        if (error)
          return next(error);
        if (!resault)
          return next("inncorrect pass  or user name ... try again");

      })
      const Token = jwt.sign({
        _id: teacher._id,
        role: teacher.role,

      }, HabibaKey, { expiresIn: "2hr" });
      response.status(200).json({ Token });


    }).catch(error => {
      next(new Error("invalid token"));
    })
}
exports.authorize=(request, response, next) => {
  try {
    const token = request.get("authorization").split(" ")[1];
    const decode = jwt.verify(token, HabibaKey);
    request.role = decode.role;
    next();
  } catch (error) {
    return next(new Error(" Not authorized: Invalid token"));
  }
};