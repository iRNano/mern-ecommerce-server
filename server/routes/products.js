const express = require("express")
const router = express.Router()
const Product = require("../models/Product")
const isAdmin = require("../auth")
const multer = require("multer") //file upload package

let storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, "public/products")
    },
    filename: function(req,file,cb){
        cb(null, new Date().getTime() + "-" + file.originalname)
    }
})

let upload = multer({storage: storage})

//ADD item
router.post("/", upload.single('image'),isAdmin, (req,res)=>{
    console.log(req.body, req.file)
    let product = new Product()
    product.name = req.body.name
    product.description = req.body.description
    product.price = req.body.price
    product.image = "/products/"+req.file.filename
    product.categoryId = req.body.categoryId
    product.save()
    return res.status(200).json({product, message: "Product added successfully", status: 200})
})

//view products

router.get("/", (req,res)=>{
    Product.find({}, (err,products)=>{
        return res.json(products)
    })
})

//view a product

router.get("/:id", (req,res)=>{
    Product.findOne({_id:req.params.id}, (err,product)=>{
        return res.json(product)
    })
})

//delete product

router.delete("/:id", isAdmin, (req,res)=>{
    Product.findOneAndDelete({_id:req.params.id}, (err,product)=>{
        return res.status(200).json({product, status:200, message: "Product deleted successfully"})
    })
})

//edit a product

router.put("/:id", upload.single('image'), isAdmin, (req,res)=>{
    let updatedProduct = {...req.body}
    if(req.file){
        updatedProduct = {...req.body, image: "/products/"+req.file.filename}
    }
    Product.findOneAndUpdate({_id:req.params.id}, updatedProduct, {new:true},(err,updatedProduct) => {
        return res.json({updatedProduct, status:200, message: "Product updated successfully"})
    } )
})
module.exports = router