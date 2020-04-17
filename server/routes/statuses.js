const Status = require("../models/Status")
const isAdmin = require("../auth")
const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
    Status.find({}, (err, statuses)=>{
        return res.json(statuses)
    })
})
module.exports = router