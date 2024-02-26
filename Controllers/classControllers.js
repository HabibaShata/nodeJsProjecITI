// get all Class
const classes=require("../Model/classSchema");
const {body}=require("express-validator");

exports.getAllClass = (req, res, next) => {


    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, " ,", "" });
        throw error;
    }
    if (req.role == "admin" ) {

        classes.find({})
            .then((data) => {
                responce.status(200).json({ data });
            })
            .catch((error) => {
                next(error);
            });

    }
    else {
        next(new Error("Not Authorized"));

    }
}

// insert new class
exports.insertClass= (req, res, next) => {




    
    let newClass=new classes(req.body);
    newClass.save()
            .then((data)=>{

                res.status(200).json(data);
            }).catch((e)=>
            {
                next(e);
            })

}
// get all Class
exports.updateClass = (req, res, next) => {
    console.log(req.body);
    const { id, className } = req.body; // Destructuring to get id and className from req.body

    res.status(200).json({ data: "update "+id});
}

// get all Class
exports.deleteClass = (req, res, next) => {
    res.status(200).json({ data: "delete specific class " });
}