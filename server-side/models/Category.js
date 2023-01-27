const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    categoryUrl: {
        type: String,
        unique: true,
        required: true
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "products"
        }
    ],
    description: {
        type: String,
    },
    img: {
        type: String,
        required: true,
    }
})



module.exports = mongoose.model('Categories', categorySchema)