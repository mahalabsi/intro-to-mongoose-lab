const mongoose = require('mongoose')
//schema is a method in mongoose to ...
const customerSchema = new mongoose.Schema({
  name: String,
  age: Number
})
const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer

// const allCustomers = [
//   { id: '658226acdcbecfe9b99d5421', name: 'Matt', age: 43 },
//   { id: '65825d1ead6cd90c5c430e24', name: 'Vivienne', age: 6 }
// ]
// module.exports = allCustomers
