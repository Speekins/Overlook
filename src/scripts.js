import { fetchData, fetchAll } from './apiCalls'
import Hotel from './classes/hotel'
import './css/reset.css'
import './css/styles.css'
import './images/turing-logo.png'
import './images/overlook2.png'
import './images/king.jpg'

let allURL = ['http://localhost:3001/api/v1/customers', 'http://localhost:3001/api/v1/bookings', 'http://localhost:3001/api/v1/rooms']
let allCustomers
let allBookings
let allRooms
let hotel
let currentCustomer
let dummyPost = { "userID": 1, "date": "2023/09/23", "roomNumber": 4 }

let bookings = document.getElementById('bookings-section')
let searchButton = document.getElementById('search-button')

searchButton.addEventListener('click', () => {
  hotel.searchByButton
})


addEventListener('load', () => {
  fetchAll(allURL)
    .then(data => {
      allCustomers = data[0].customers
      allBookings = data[1].bookings
      allRooms = data[2].rooms
    })
    .then(() => {
      hotel = new Hotel(allBookings, allCustomers, allRooms)
      currentCustomer = assignCustomer()
      showBookings()
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

function showBookings() {
  currentCustomer.bookings.forEach(booking => {
    let room = allRooms.find(room => room.number === booking.roomNumber)
    bookings.innerHTML += `<div>
    <p>${booking.date}</p>
    <p>${booking.roomNumber}</p>
    <p>${booking.amount}</p>
    <p>${room.bedSize}</p>
    <p>${room.numBeds}</p>
    </div>`
  })
}

function assignCustomer() {
  let randomNum = Math.floor(Math.random() * hotel.customers.length)
  return hotel.customers[randomNum]
}