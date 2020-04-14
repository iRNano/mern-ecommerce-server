const Category = require("../models/Category")
const isAdmin = require("../auth")
const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
    Category.find({}, (err, categories)=>{
        return res.json(categories)
    })
})
module.exports = router