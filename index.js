const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT
const mongodb = process.env.MONGO_DB
const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const Product = require("./models/products")

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to database")
  })
  .catch((err) => {
    console.log("failed")
  })
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("hei hei")
})

app.get("/products", async (req, res) => {
  const products = await Product.find({})
  res.render("products/index.ejs", { products })
})

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body)
  await newProduct.save()
  res.send("making ditten datten")
})

app.get("/products/new", (req, res) => {
  res.render("products/new")
})

app.get("/products/:id", async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  console.log(product)
  res.render("products/show", { product })
})

app.listen(PORT, () => {
  console.log(`App started on ${PORT}`)
})
