const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Transaction = require('../models/Transaction')
const User = require('../models/User')
const isAdmin = require('../auth')
const jwt = require('jsonwebtoken')
const stripe = require("stripe")('sk_test_0pXdiX31lAcpRutVhs6sCP7500CA7c9Fkq')
//Add transaction

router.post('/', (req,res) => {
    // console.log(req.body)
    let token = req.headers['x-auth-token'];
    if(!token) return res.status(401).json({
        status:401,
        message: "You are not logged in"
    })

    let decoded = jwt.verify(token, 'b49-ecommerce')
    if(decoded) {
        let transaction = new Transaction()
        transaction.userId = decoded._id
        transaction.paymentMode = "COD"
        transaction.total = req.body.total
        transaction.products = req.body.orders 
        // console.log(transaction)
        transaction.save()
        return res.status(200).json({
            status:200,
            message: "Transaction successful"
        })
    }
})

router.post("/stripe", (req,res)=>{
    console.log(req.body)
    // console.log(req.body.amount)
})
module.exports = router