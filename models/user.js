const { model, Schema, SchemaTypes, } = require("mongoose");
const UserModel = model("User", Schema({
    name:{
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "user"
    }
}, { timestamps: true }))

module.exports = {
    UserModel
}