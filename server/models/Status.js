const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StatusSchema = new Schema({
    name:{
        type:String
    }
})

module.exports = mongoose.model("Status", StatusSchema, 'statuses')