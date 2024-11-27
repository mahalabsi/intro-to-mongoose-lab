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
      createCustomer()
    } else if (choice === '2') {
      await theCustomers()
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

// queries.js

// const createTodo = async () => {

//   const todoData = {
//     text: "Learn JS",
//     isComplete: false,
//   };

//   const todo = await Todo.create(todoData);
//   console.log("New todo:", todo);
// };
const createCustomer = async () => {
  // Prompt for name and age
  const customName = prompt('Enter name')
  let age = parseInt(prompt('Enter age')) // Convert to integer

  // Create customer object
  const customerList = {
    name: customName,
    age: age
  }
  await Customer.create(customerList)
}

async function updateCustomer() {
  const updateId = prompt('Input the ID of the customer you want to update ')
  const customer = await Customer.findByIdAndUpdate(updateId)
  const updatedName = prompt('Input upadated name')
  const updatedAge = prompt('input updated age')
  const updateData = { name: updatedName, age: updatedAge }
  await Customer.findByIdAndUpdate(updateId, updateData)
}

const theCustomers = async () => {
  const customers = await Customer.find()

  console.log('All customers:')
  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })
}

const deleteCustomer = async () => {
  let id = ''
  const inputId = prompt('input the id of the customer you want to delete')
  const removeId = await Customer.findByIdAndDelete(id)
  console.log('Removed Customer:', removeId)
}

connect()
