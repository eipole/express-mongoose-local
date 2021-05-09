const mongoose = require("mongoose")
const Product = require("./models/products")

mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to database")
  })
  .catch((err) => {
    console.log("failed")
  })

// const p = new Product({
//   name: "Lambanina",
//   price: 45,
//   category: "fruit"
// })
// p.save()
//   .then((p) => {
//     console.log(p)
//   })
//   .catch((e) => {
//     console.log(e)
//   })
const seedData = [
  { name: "Lambanina", price: 45, category: "fruit" },
  { name: "õun", price: 5, category: "vegetable" },
  {
    name: "Brokkoli",
    price: 4,
    category: "dairy"
  }
]
Product.insertMany(seedData)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
