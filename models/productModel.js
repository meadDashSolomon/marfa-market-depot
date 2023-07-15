const mongoose = require("mongoose");

// create mongoose schema
const productsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  category: String,
  default_price: Number,
})

module.exports = mongoose.model("Q&A", productsSchema)