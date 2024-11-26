require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./model/customer')

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('connected to database')
  // await runQueries()
  await mongoose.disconnect()
  console.log('disconnect from database')
  process.exit()
}

const prompt = require('prompt-sync')()

console.log('Welcome to the CRM')

const choice = prompt(
  'What would you like to do?\n' +
    '  1. Create a customer\n' +
    '  2. View all customers\n' +
    '  3. Update a customer\n' +
    '  4. Delete a customer\n' +
    '  5. Quit\n'
)

console.log(`Your choice is ${choice}`)

connect()
