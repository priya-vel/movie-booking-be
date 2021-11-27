const { model, Schema, SchemaTypes, } = require("mongoose");
const TheaterModel = model("theater", Schema({
    name: {
        type : String,
        required: true
    },
    shows: [{   
        type: SchemaTypes.ObjectId,
    }],
    owner: {
        type: SchemaTypes.ObjectId,
        required: true
    }
}, { tiemstamps: true }))

module.exports = {
    TheaterModel
}

