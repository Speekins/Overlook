// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css'
import { fetchData, fetchAll } from './apiCalls'


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let allURL = ['http://localhost:3001/api/v1/customers', 'http://localhost:3001/api/v1/bookings', 'http://localhost:3001/api/v1/rooms']
let allCustomersURL = 'http://localhost:3001/api/v1/customers'
let allCustomers
let allBookingsURL = 'http://localhost:3001/api/v1/bookings'
let allBookings
let allRoomsURL = 'http://localhost:3001/api/v1/rooms'
let allRooms
let today = new Date()
let day = today.getDate()
let month = today.getMonth() + 1
let year = today.getFullYear()
let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
let date = `${month}/${day}/${year}`
let dummyPost = { "userID": 1, "date": "2023/09/23", "roomNumber": 4 }


addEventListener('load', () => {
  fetchAll(allURL)
    .then(data => {
      allCustomers = data[0].customers
      allBookings = data[1].bookings
      allRooms = data[2].rooms
    })
    .then(() => {
      console.log('CUSTOMERS', allCustomers)
      console.log('BOOKINGS', allBookings)
      console.log('ROOMS', allRooms)
    })
})

fetch('http://localhost:3001/api/v1/bookings', {
  method: 'POST',
  body: JSON.stringify(dummyPost),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))