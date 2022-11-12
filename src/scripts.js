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
let searchedDate

let bookingSection = document.getElementById('bookings-section')
let searchSection = document.getElementById('search-content')
let searchButton = document.getElementById('search-button')
let selectDate = document.getElementById('select-date')
let bookButtons
let filterRoomType = document.getElementById('filter-room-type')

document.addEventListener('keypress', event => {
  if (event.key === "Enter") {
    event.preventDefault()
    event.target.click()
  }
})

searchButton.addEventListener('click', () => {
  searchedDate = selectDate.value.replaceAll('-', '/')
  let searchResult = hotel.searchByDate(searchedDate)
  showSearchResult(searchResult)
  bookButtons = document.getElementsByClassName('book-it')
})

searchSection.addEventListener('click', (e) => {
  let target = e.target
  let array = Array.from(bookButtons)
  if (!array.includes(target)) {
    return
  }
  let roomNum = Number(target.id)
  let dataToPost = hotel.makeBooking(currentCustomer.id, roomNum, searchedDate)
  postNewBooking(dataToPost)
})

filterRoomType.addEventListener('input', (e) => {
  let roomType = e.target.value
  if (roomType) {
    let filteredResults = hotel.filterByType(roomType)
    showSearchResult(filteredResults)
  } else {
    return
  }
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

function postNewBooking(body) {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(() => fetchAll(allURL))
    .then(data => {
      console.log(data[1])
      allBookings = data[1].bookings
      allCustomers = data[0].customers
    })
    .then(() => {
      console.log(allBookings)
      resetDOM()
      updateData()
      showBookings()
    })
}

function showBookings() {
  currentCustomer.bookings.forEach(booking => {
    let room = allRooms.find(room => room.number === booking.roomNumber)
    bookingSection.innerHTML += `<div>
    <p>${booking.date}</p>
    <p>${booking.roomNumber}</p>
    <p>${booking.amount}</p>
    <p>${room.bedSize}</p>
    <p>${room.numBeds}</p>
    </div>`
  })
}

function showSearchResult(result) {
  searchSection.innerHTML = ''
  result.forEach(room => {
    searchSection.innerHTML += `<div id="${room.number}">
    <p>Type: ${room.roomType}</p>
    <p>Bidet? ${room.bidet}</p>
    <p>Per Night: $${room.costPerNight}</p>
    <p>Bed: ${room.bedSize}</p>
    <p># of Beds: ${room.numBeds}</p>
    <button class="book-it" id="${room.number}">Book Room</button>
    </div>`
  })
}

function assignCustomer() {
  let randomNum = Math.floor(Math.random() * hotel.customers.length)
  return hotel.customers[randomNum]
}

function updateData() {
  hotel = new Hotel(allBookings, allCustomers, allRooms)
  currentCustomer = hotel.customers.find(customer => customer.id === currentCustomer.id)
}

function resetDOM() {
  searchSection.innerHTML = ''
  bookingSection.innerHTML = ''
}