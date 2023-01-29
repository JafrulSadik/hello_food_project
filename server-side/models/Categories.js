const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
    },
    img : {
        type: String,
        required : true,
        required : true
    },
}, {timestamps: true}
);


module.exports = mongoose.model("Category", CategorySchema);

