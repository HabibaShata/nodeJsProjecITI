const mongoose = require("mongoose");
const sequence=require("mongoose-sequence-plugin");

// create custom schema for child 
const schema = new mongoose.Schema(
    {
        _id: Number,
        fullname: {
            type: String,
            required: true,
            unique: true,

        },
        Image: {
            type: String,
            validate: {
                validator: function (value) {
                    return /\.(jpg|jpeg|png|gif|bmp)$/.test(value);
                },
                message: 'invalid imge'
    
            }
    
        },
        age: {
            type: Number,
            required: true
        },
        level: {
            type: String,
            require: true,
            enum: ["preKG", "KG1", "KG2"]
        },
        address: {
            city: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            building: {
                type: String,
                required: true
            }
        },
        teacherId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"teachers",
        },
        role:String,


    }
)
schema.plugin(sequence, { inc_field: '_id' });
module.exports = mongoose.model("child", schema);
