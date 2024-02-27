const child = require("../Model/childSchema");
const teacher = require("./../Model/teacherSchema");
const { body } = require("express-validator");


//=======================================================
//==================get all children=====================
//=======================================================

exports.getAllChildern = (request, response, next) => {

    if(request.role=="teacher" || request.role=="admin" )
    {
        child.find({}).populate({ path: "teachers" ,model: teacher})
        .then((data) => {
            response.status(200).json({ message: "get child data", data });
        })
        .catch((error) => {
            next(error);
        });
   
    }
    else
    {
        next (new Error("Not Authorized"));

    }
}

//=======================================================
//==================insert children=====================
//=======================================================
exports.inserChild = (request, response, next) => {

    if(request.role=="admin")
    { 
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
            response.status(200).json({ message: "adedd succe", data });
        })
        .catch((error) => {
            next(error);
        });
    }
    else
    {
        next (new Error("not authorized"));
    }

}

//=======================================================
//==================update children=====================
//=======================================================
exports.updateChild = (request, response, next) => {


    if(request.role=="admin")
    {
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
            response.status(200).json({ message: "updated sucessfully", data });
        })
        .catch((error) => {
            next(error);
        });
    }
    else
    {
        next (new Error("not authorized"));
    }
}

//=======================================================
//==================delete child=====================
//=======================================================
exports.deletechild = (request, response, next) => {


    if(request.role=="admin")
    {
    child.findByIdAndDelete({ _id: request.body._id })
        .then((data) => {
            response.status(200).json({ message: "deleted ", data });
        })
        .catch((error) => {
            next(error);
        });
    }
    else
    {
        next(new Error("not authorized"));
    }
}