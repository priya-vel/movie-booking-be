const { model, Schema, SchemaTypes, } = require("mongoose");
const ShowModel = model("Show", Schema({
    name: {
        type : String,
        required: true
    },
    banner: {
        type: String,
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
        type: String,
        required: true
    },
    theater: {
        type: SchemaTypes.ObjectId,
        require: true
    },
    owner: {
        theater: {
            type: SchemaTypes.ObjectId,
            require: true
        },
    }
}, { tiemstamps: true }))

module.exports = {
    ShowModel
}