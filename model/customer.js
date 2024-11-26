const mongoose = require('mongoose')
//schema is a method in mongoose to ...
const customerSchema = new mongoose.Schema({
  name: String,
  age: Number
})
const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer
