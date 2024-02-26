const teacher=require("../Model/teacherSchema");
const mongoose=require("mongoose");

/// get all 

exports.getAllTeachers=(req,res,next)=>{
    teacher.find({})
           .then(data=>{
         res.status(200).json(data)
               
           })
           .catch(error=>{
            next(error);
           })
}
/// insert 
exports.insertTeachers=(req,res,next)=>{
        
    // creat object from student schema
   // res.status(201).json({body:req.body,file:req.file});

     const object=new teacher({
        _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
        fullname: req.body.fullname,
        password: req.body.password,
        Email:req.body.Email,
        Image:req.file.filename,
    
    })
     object.save()
            .then((data)=>{
                res.status(201).json({body:req.body,file:req.file});

            })
             .catch(error=>{
                next(error);
             })
      
}
/// iupdate all 
exports.updateTeachers=(req,res,next)=>{
    res.status(200).json({data:"update teacher userData"})
}
/// insert all 
exports.deleteTeachers=(req,res,next)=>{
    res.status(201).json({data:"delete teachers"})
}