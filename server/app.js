const express = require("express")
const app = express()
const PORT = process.env.PORT || 4000
const cors = require("cors")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/b49-ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

const db = mongoose.connection

db.once('open', () => console.log("We are connected to MongoDB"))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
//Define routes/resources

app.use("/users", require("./routes/users"))
app.use("/products", require("./routes/products"))
app.use("/categories", require("./routes/categories"))
app.use("/transactions", require("./routes/transactions"))

app.listen(4000, ()=> console.log(`Server is running on port ${PORT}`))