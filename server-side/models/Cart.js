const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        }
    ]
})



module.exports = mongoose.model('Categories', categorySchema)