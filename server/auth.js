const jwt = require("jsonwebtoken")
const User = require("./models/User")

const isAdmin = (req, res, next) => {
    let token = req.headers["x-auth-token"]
    console.log(token)
    if(token){
        jwt.verify(token, 'b49-ecommerce', (err,decoded)=>{
            if(decoded.isAdmin === false) return res.status(401).json({
                status:401,
                message: "Unauthorized"
            })
            next()
        })
    }else{
        return res.status(400).json({status:400, message: "Please log in"})
    }
    
}

module.exports = isAdmin