const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Register
router.post("/", (req,res) => {
    //Username must be greater than 8 characters
    if(!req.body.username || req.body.username.length < 8 ) return res.status(400).json({
        status:400, 
        message: "Username must be greater than 8 characters"
    })
    //Password must be greater than 8 characters
    if(!req.body.password || req.body.password.length < 8) return res.status(400).json({
        status:400, 
        message: "Password must be greater than 8 characters"
    })
    //Password2 must be greater than 8 characters
    if(!req.body.password2 || req.body.password2.length < 8) return res.status(400).json({
        status:400, 
        message: "Password2 must be greater than 8 characters"
    })
    //Passwords should match
    if(req.body.password !== req.body.password2) return res.status(400).json({
        status:400,
        message: "Password does not match"         
    })
    //Check if username already exists
    User.findOne({username:req.body.username}, (err,user)=>{
        if(user) return res.status(400).json({
            status:400,
            message: "Username already exists"
        })

        bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
            const user = new User()
            user.fullname = req.body.fullname
            user.username = req.body.username
            user.password = hashedPassword
            user.save()
            return res.json({
                status:200,
                message: "Registered Successfully"
            })
        })
    }) //end of User.findOne
}) // end of register route

//LOGIN POST Localhost:4000/users/login

router.post("/login", (req,res)=>{
    User.findOne({username: req.body.username}, (err,user)=>{
        if(err || !user) return res.status(400).json({
            status:400,
            message: "No user found"
        })
        bcrypt.compare(req.body.password, user.password, (err,result)=>{
            if(!result){
                return res.status(401).json({
                    auth:false,
                    status:401,
                    message: "Invalid Credentials",
                    token: null
                })
            }else{
                user = user.toObject() // created new object to be used for jwt
                delete user.password // deleted password property of the new object to exclude it from jwt
                let token = jwt.sign(user, 'b49-ecommerce', {expiresIn: '1h'})
                return res.status(200).json({
                    auth:true,
                    status:200,
                    message: "Log in Successfully!",
                    user,
                    token
                })
            } 
        })
    })
})
module.exports = router