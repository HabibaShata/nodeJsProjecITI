const mongoose=require("mongoose");
const sequence=require("mongoose-sequence-plugin");
const schema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    superVisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers" // Assuming 'Teacher' is the model name for supervisors
    },
    children: [{
        type: Number // Assuming children are represented by their IDs
    }]
});
schema.plugin(sequence, { inc_field: '_id' });
module.exports=mongoose.model("class",schema);