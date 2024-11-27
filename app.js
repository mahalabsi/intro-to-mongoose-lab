require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./model/customer')
const prompt = require('prompt-sync')()

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to the database')

  console.log('Welcome to the CRM')
  while (true) {
    const choice = prompt(
      'What would you like to do?\n' +
        '  1. Create a customer\n' +
        '  2. View all customers\n' +
        '  3. Update a customer\n' +
        '  4. Delete a customer\n' +
        '  5. Quit\n'
    )

    console.log(`Your choice is ${choice}`)

    if (choice === '1') {
      console.log('Creating a customer...')
    } else if (choice === '2') {
      await allCustomers()
      continue
    } else if (choice === '3') {
      await updateCustomer()
      continue
    } else if (choice === '4') {
      console.log('Deleting a customer...')
      deleteCustomer()
    } else if (choice === '5') {
      console.log('Exiting...')
      break
    } else {
      console.log('Invalid choice. Please try again.')
    }
  }

  await mongoose.disconnect()
  console.log('Disconnected from the database')
  process.exit()
}

const updateCustomer = async () => {
  // await allCustomers()
  const updateId = prompt('Input the ID of the customer you want to update ')
  const customer = await Customer.findByIdAndUpdate(updateId)
  const updatedName = prompt('Input upadated name')
  const updatedAge = prompt('input updated age')
  const updateData = { name: updatedName, age: updatedAge }
  await Customer.findByIdAndUpdate(updateId, updateData)
  // await allCustomers()
}

// const allCustomers = async () => {
//   const allCustomers = await Customer.find()

//   console.log('All customers:')
//   allCustomers.forEach((customer) =>
//     console.log(
//       `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
//     )
//   )
// }

const deleteCustomer = async () => {
  let id = ''
  const inputId = prompt('input the id of the customer you want to delete')
  const removeId = await allCustomers.findByIdAndDelete(id)
  console.log('Removed Customer:', removeId)
}

connect()
