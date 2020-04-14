const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    statusId: {
        type: String,
        default: "5e93c976d9ce7ffa0a39ce87"

    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    paymentMode: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    products:[
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
            subtotal: Number
        }
    ]
})

module.exports = mongoose.model("Transaction", TransactionSchema)