const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    img: {
        type: String,
    },
    orders: {
        type: Array,
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
}, {timestamps: true}
);


module.exports = mongoose.model("User", UserSchema);

