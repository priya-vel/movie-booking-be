const { model, Schema, SchemaTypes, } = require("mongoose");
const BookingsModel = model("Bookings", Schema({
    theater: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    show: {
        type: SchemaTypes.ObjectId,
        require: true
    },
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        default: "open"
    },
    type: {
        type: String,
        required: true
    },
    seat: {
        type: String,
        required: true
    },
    user: {
        type: SchemaTypes.ObjectId,
    },
    even: {
        type: Number,
        require: true
    }
}, { timestamps: true }))

module.exports = {
    BookingsModel
}