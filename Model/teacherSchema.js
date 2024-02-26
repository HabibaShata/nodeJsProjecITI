const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname: {
        type: String,
        required: true
    }, 
   
    password: {
        type: String,
        required: true
        , validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value);
            },
            message: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character'
        }

    },
    Email: {
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
    role:String
});

// Create a model from the schema



module.exports = mongoose.model("teachers", schema);