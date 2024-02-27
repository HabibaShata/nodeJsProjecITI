const teacher = require("../Model/teacherSchema");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

//====================================
//================= get All Teachehers ===================
//====================================

exports.getAllTeachers = (request, response, next) => {
    if (request.role == "admin") {
        teacher.find({})
            .then((data) => {
                response.status(200).json({ message: "all teachers =>", data });
            })
            .catch((error) => {
                next(error);
            });
    }
    else {
        next(new Error("not authorized"));
    }
}

//====================================
//=================insert new teacher ===================
//====================================
exports.insertTeachers = (request, response, next) => {
    if (request.role == "admin") {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                error.status = 500;
                error.message = "can not decrupt the pass";
                throw error;
            }
            bcrypt.hash(request.body.password, salt, (error, hash) => {
                if (error) {
                    error.status = 500;
                    error.message = "can not decrupt the pass";
                    throw error;
                }
                let object = new teacher({
                    _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
                    fullname: request.body.fullname,
                    Email: request.body.Email,
                    password: hash,
                    role: "teacher",
                    Image: request.file.filename,
                });
                object.save()
                    .then((data) => {
                        response.status(200).json({ message: "insert teacher data", data });
                    })
                    .catch((error) => {

                        next(error);
                    })

            })

        })
    }
    else {
        next(new Error("not authorized---- from insert"));
    }

}


//====================================
//=================update teacher ===================
//====================================
exports.updateTeachers = (request, response, next) => {
    if(request.role=="admin")
    {

    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            error.status = 500;
            error.message = "can not decrupt the pass";
            throw error;
        }
        bcrypt.hash(request.body.password, salt, (error, hash) => {
            if (error) {
                error.status = 500;
                error.message = "can not decrupt the pass";
                throw error;
            }
            teacher.findByIdAndUpdate(request.body._id, {
                $set: {
                    fullname: request.body.fullname,
                    Email: request.body.Email,
                    password: hash,
                    role: "teacher",
                    Image: request.file.filename,
                }
            })
                .then((data) => {
                    response.status(200).json({ message: "update teacher data", data });
                })
                .catch((error) => {

                    next(error);
                });
        })
    })
}
else{
    next (new Error("not authorized"));

}
}
//====================================
//=================delete teacher ===================
//====================================
exports.deleteTeachers = (request, response, next) => {
    if(request.role=="admin")
    {

    teacher.findByIdAndDelete(request.body._id)
        .then((data) => {
            response.status(200).json({ message: "deleted successfully", data });
        })
        .catch((error) => {

            next(error);
        });
    }
    else{
        next(new Error("not authorized"));

    }
}


//====================================
//=================change password teacher ===================
//====================================
exports.IsMatchPass = async (request, response, next) => {
    try {
        const oldpass = request.body.oldpassword;
        const newpass = request.body.newpassword;
        
        const data = await teacher.findOne({ _id: request.body._id });
        
        if (!data) {
            let error = new Error();
            error.message="No user found";
            error.status=500;
            next(error);
        }

        const result = await bcrypt.compare(oldpass, data.password);
        if (!result) {
            let error = new Error();
            error.message="Password not matched";
            error.status=500;
            next(error);
        }

        const hashedNewPassword = await bcrypt.hash(newpass, 10);
        await teacher.updateOne({ _id: request.body._id }, { $set: { password: hashedNewPassword } });
        
        next();
    } catch (error) {
        next(error);
    }
};