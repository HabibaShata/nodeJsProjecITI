const child = require("../Model/childSchema");
const { body } = require("express-validator");


//=======================================================
//==================get all children=====================
//=======================================================

exports.getAllChildern = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, " ,", "" });
        throw error;
    }
    if (req.role == "admin" || req.role == "teachers") {

        child.find({}).populate({ path: "teachers", model: teacher })
            .then((data) => {
                responce.status(200).json({ message: "get child data", data });
            })
            .catch((error) => {
                next(error);
            });

    }
    else {
        next(new Error("Not Authorized"));

    }


}
//get specific  student

exports.getChildById = (req, res, next) => {
    console.log("using query pram", req.params.id);
    console.log("using query string", req.query);
    res.status(201).json({ data: "specific child " + req.params.id });
}

//=======================================================
//==================insert children=====================
//=======================================================
exports.inserChild = (request, res, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if (request.role == "Admin") {
        let object = new child({
            fullname: request.body.fullname,
            age: request.body.age,
            level: request.body.level,
            address: {
                city: request.body.city,
                street: request.body.street,
                building: request.body.building
            },
            role: "child",
            image: request.file.filename,
            teacherId: request.body.teacherId
        });

        object.save()
            .then((data) => {
                responce.status(200).json({ message: "insert child data", data });
            })
            .catch((error) => {
                next(error);
            });
    }
    else {
        next(new Error("not authorized"));
    }

}
//update
exports.updateChild = (request, res, next) => {

    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if (request.role == "admin") {
        child.findByIdAndUpdate(request.body._id, {
            $set: {
                fullname: request.body.fullname,
                age: request.body.age,
                level: request.body.level,
                address: {
                    city: request.body.city,
                    street: request.body.street,
                    building: request.body.building
                },
                role: "child",
                image: request.file.filename,
                teacherId: request.body.teacherId  
            }
        })
            .then((data) => {
                responce.status(200).json({ message: "update child data", data });
            })
            .catch((error) => {
                next(error);
            });
    }
    else {
        next(new Error("not authorized"));
    }

}
//put
exports.putChild = (req, res, next) => {
    res.status(200).json({ data: "update child  userdata" });
}
//patch
exports.patchChild = (req, res, next) => {
    res.status(200).json({ data: "update child  userdata" });
}
//=======================================================
//==================delete child=====================
//=======================================================
exports.deletechild = (req, res, next) => {

    if (req.role == "admin") {
        child.findOneAndDelete({
            _id: req.body._id
        })
            .then((data) => {

                res.status(200).json({ data: "delete specified  child" });

            })
            .catch((error) => {
                next(error);
            })
    } else {
        next(new Error("Not authorized"));
    }
}