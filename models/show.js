const { model, Schema, SchemaTypes, } = require("mongoose");
const ShowModel = model("Show", Schema({
    name: {
        type : String,
        required: true
    },
    trailer: {   
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    poster: {
        type: SchemaTypes.ObjectId,
        required: true
    },
}, { tiemstamps: true }))

module.exports = {
    ShowModel
}