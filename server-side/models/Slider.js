const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    sliderUrl: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String
    },
    img: {
        type: Object,
        required: true,
    }
})



module.exports = mongoose.model('Slider', sliderSchema)