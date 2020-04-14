const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    categoryId: {
        type: String,
        required: [true, "Category ID is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    description:{
        type: String,
        required: [true, "Product Description is required"]
    },
    image: {
        type: String,
        required: [true, "Product Description is required"]
    }
})

module.exports = mongoose.model("Product", ProductSchema)