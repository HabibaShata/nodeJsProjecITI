// get all Class
const classes = require("../Model/classSchema");
const { body } = require("express-validator");
const bcrypt = require('bcrypt');



//=======================================================
//==================get all classes=====================
//=======================================================
exports.getAllClass = (request, response, next) => {
    if (request.role == "admin") {
        classes.find({})
            .then((data) => {
                response.status(200).json({ message: "all classes", data });
            })
            .catch((error) => {
                next(error);
            });
    }
    else {
        next(new Error("not authorized"));
    }
}

//=======================================================
//==================insert new class=====================
//=======================================================

exports.insertClass = (request, response, next) => {

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
                let object = new classes({
                    name: request.body.name,
                    superVisor: request.body.superVisor,
                    children: request.body.children
                });
                object.save()
                    .then((data) => {
                        response.status(200).json({ message: "inseted data", data });
                    })
                    .catch((error) => {

                        next(error);
                    })

            })

        })
    }
    else {
        next(new Error("not authorized"));
    }
}


//=======================================================
//==================update class=====================
//=======================================================
exports.updateClass = (request, response, next) => {

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
                classes.findByIdAndUpdate(request.body._id, {
                    $set: {
                        name: request.body.name,
                        superVisor: request.body.superVisor,
                        children: request.body.children
                    }
                })
                    .then((data) => {
                        response.status(200).json({ message: "updateted", data });
                    })
                    .catch((error) => {

                        next(error);
                    });
            })
        })
    }
    else {
        next(new Error("not authorized"));

    }
}

//=======================================================
//==================deleteClass=====================
//=======================================================

exports.deleteClass = (request, response, next) => {
    if(request.role=="admin")
    {
        classes.findByIdAndDelete(request.body._id)
        .then((data) => {
            response.status(200).json({ message: "deleted ", data });
        })
        .catch((error) => {

            next(error);
        });
    }
    else{
        next(new Error("not authorized"));

    }
}