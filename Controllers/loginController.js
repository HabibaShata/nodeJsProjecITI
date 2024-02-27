
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const teacher = require("../Model/teacherSchema");
const bcrypt = require("bcrypt");
require('dotenv').config();
const HabibaKey = process.env.SECRET_KEY;



//==================login ===========  

module.exports.login = (request, response, next) => {

  teacher.findOne({
    Email: request.body.Email,
  }).then(data => {
    if (data == null) { // User not found
      
      next(new Error("Not Authenticated: User not found"));
    }
    bcrypt.compare(request.body.pass, data.pass, (error, result) => {
      if (error) {
        return next(error);
      }
      if (!result) {
        return next(new Error("Unauthorized: Incorrect password"));
      }

      const token = jwt.sign({
        _id: data._id,
        role: data.role,

      }, HabibaKey, { expiresIn: "2hr" });
      response.status(200).json({ token });
    });
  }).catch(next);
};


exports.authorize = (request, response, next) => {
  try {
    const token = request.get("authorization").split(" ")[1];
    const decode = jwt.verify(token, HabibaKey);
    request.role = decode.role;
    next();
  } catch (error) {
    return next(new Error(" Not authorized"));
  }
};