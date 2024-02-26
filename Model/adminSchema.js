const mongoose= require("mongoose");
const sequence=require("mongoose-sequence-plugin");
const schema= new mongoose.Schema(
    {
        Name:String,
        Email:{type:String,require:true},
        Pass:{type:String,require:true},
        }
);

schema.plugin(sequence, { inc_field: '_id' });
module.exports=mongoose.model("child",schema);