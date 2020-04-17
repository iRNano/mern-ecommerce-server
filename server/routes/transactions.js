const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Transaction = require('../models/Transaction')
const User = require('../models/User')
const isAdmin = require('../auth')
const jwt = require('jsonwebtoken')
const stripe = require("stripe")('sk_test_0pXdiX31lAcpRutVhs6sCP7500CA7c9Fkq')

//Add transaction
//COD
router.post('/', (req,res) => {
    console.log(req.body)
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
        console.log(transaction)
        transaction.save()
        return res.status(200).json({
            status:200,
            message: "Transaction successful"
        })
    }
})
//Stripe
router.post("/stripe", (req,res)=>{
    
    let token = req.headers["x-auth-token"]
    if(!token) return res.status(401).json({status:401, message:"You are not logged in"})

    let decoded = jwt.verify(token, 'b49-ecommerce')
    if(decoded) {
        let transaction = new Transaction()
        transaction.userId = decoded._id
        transaction.paymentMode = "Stripe"
        transaction.total = req.body.amount
        transaction.products = req.body.cartItems 

        let body = {
            source: req.body.token.id,
            amount: req.body.amount,
            email: req.body.email,
            currency: "PHP"
        }

        //add charge to stripe account
        stripe.charges.create(body, (err,result)=> {
            if(result) {
                console.log(result + "result")
                transaction.save()
                return res.status(200).json({status:200,message: "Transaction successful"})
            }else{
                return res.send(err)
            }
        })
        
    }
})

//get all transactions for admin
router.get("/", (req,res) => {
    Transaction.find({}, (err,transactions)=>{
        return res.json(transactions)
    })
})

//update status
router.put("/:id", isAdmin, (req,res)=>{
    Transaction.findOne({_id:req.params.id}, (err,transaction)=> {
        transaction.statusId = req.body.statusId
        transaction.save()
        return res.json({status:200, message:"Status changed"})
    })
})

//get transactions by user

router.get("/:userId", (req,res)=> {
    let token = req.headers["x-auth-token"]
    if(!token) return res.json({status:401, message: "You are not logged in"})
    // Transaction.find({userId:req.params.userId}, (err,transactions)=> {

    // })
    // let decoded = jwt.verify(token,'b49-ecommerce')
    // if(decoded){
        
    // }
    Transaction.find({userId:req.params.userId})
    .then(transactions => res.json(transactions))

})
module.exports = router