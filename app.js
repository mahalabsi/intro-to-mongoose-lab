require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./model/customer')
const prompt = require('prompt-sync')()

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to the database')

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

  if (choice === '1') {
    // Add code for creating a customer
  } else if (choice === '2') {
    await allCustomers()
  } else if (choice === '3') {
    await updateCustomer()
  } else if (choice === '4') {
    // Add code for deleting a customer
  } else if (choice === '5') {
    console.log('Exiting...')
    await mongoose.disconnect()
    console.log('Disconnected from the database')
    process.exit()
  } else {
    console.log('Invalid choice. Please try again.')
  }
}

const updateCustomer = async () => {
  const customers = await Customer.find()
  customers.forEach((customer) =>
    console.log(
      `id: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`
    )
  )

  const customerId = prompt(
    'Copy and paste the ID of the customer you would like to update here: '
  )
  const newName = prompt("Enter the customer's new name: ")
  const newAge = prompt("Enter the customer's new age: ")

  const customerToUpdate = await Customer.findById(customerId)

  if (customerToUpdate) {
    customerToUpdate.name = newName
    customerToUpdate.age = newAge
    await customerToUpdate.save()

    console.log('Customer updated successfully.')
  } else {
    console.log('Customer not found.')
  }
}

const allCustomers = async () => {
  const allCustomers = await Customer.find()
  console.log('All customers:')
  allCustomers.forEach((customer) =>
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  )
}

connect()
