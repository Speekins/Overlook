import { fetchData, fetchAll } from './apiCalls'
import Hotel from './classes/hotel'
import './css/reset.css'
import './css/styles.css'
import './images/king.jpg'
import './images/junior-suite.jpg'
import './images/suite.jpg'
import './images/single.jpg'
import './images/queen.jpg'
import './images/overlook2.png'
import './images/overlook_black.png'
import './images/overlook_white.png'
import './images/overlook-banner4.jpg'

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
let historyButton = document.getElementById('history-button')
let username = document.getElementById('username')
let totalAmount = document.getElementById('total-amount')
let backToBookingsButton = document.getElementById('back-to-bookings')
let clearFilterButton = document.getElementById('clear-filter')

document.addEventListener('keypress', event => {
  if (event.key === "Enter") {
    event.preventDefault()
    event.target.click()
  }
})

historyButton.addEventListener('click', () => {
  showBookings(currentCustomer.pastBookings)
  hide(historyButton)
  show(backToBookingsButton)
})

backToBookingsButton.addEventListener('click', () => {
  showBookings(currentCustomer.bookings)
  hide(backToBookingsButton)
  show(historyButton)
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
  clearFilterButton.classList.add('disabled')
  clearFilterButton.disabled = true
  let dataToPost = hotel.makeBooking(currentCustomer.id, roomNum, searchedDate)
  postNewBooking(dataToPost)
})

filterRoomType.addEventListener('input', (e) => {
  if (filterRoomType.value !== 'Filter Rooms') {
    clearFilterButton.classList.remove('disabled')
    clearFilterButton.disabled = false
  }
  let roomType = e.target.value
  if (roomType) {
    let filteredResults = hotel.filterByType(roomType)
    showSearchResult(filteredResults)
  } else {
    return
  }
})

clearFilterButton.addEventListener('click', () => {
  filterRoomType.value = 'Filter Rooms'
  searchedDate = selectDate.value.replaceAll('-', '/')
  let searchResult = hotel.searchByDate(searchedDate)
  showSearchResult(searchResult)
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
      username.innerText = currentCustomer.name.split(' ')[0]
      totalAmount.innerText = `$${currentCustomer.amountSpent}`
      selectDate.value = formatTodaysDate()
      selectDate.min = formatTodaysDate()
      console.log(Date.now())
      showBookings(currentCustomer.bookings)
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
      allBookings = data[1].bookings
      allCustomers = data[0].customers
    })
    .then(() => {
      resetDOM()
      updateData()
      showBookings(currentCustomer.bookings)
    })
}

function hide(element) {
  element.classList.add('hidden')
}

function show(element) {
  element.classList.remove('hidden')
}

function showBookings(data) {
  if (data.length === 0) {
    warning(bookingSection, 'You have no past bookings to show')
    return
  }
  bookingSection.innerHTML = ''
  data.forEach(booking => {
    let room = hotel.rooms.find(room => room.number === booking.roomNumber)
    bookingSection.innerHTML +=
      `<div class="booking-tile">
      <div class="booking-info">
        <p>DATE: <span class="booking-detail">${booking.date}</span></p>
        <p>ROOM: <span class="booking-detail">${booking.roomNumber}</span></p>
        <p>AMOUNT: <span class="booking-detail">$${booking.amount}</span></p>
        <p>BED: <span class="booking-detail">${room.bedSize}</span></p>
        <p># OF BEDS: <span class="booking-detail">${room.numBeds}</span></p>
      </div>
      <img class="room-image" src=${room.image} alt="${room.roomType} image">
    </div>`
  })
}

function showSearchResult(result) {
  searchSection.innerHTML = ''
  if (typeof result === 'string') {
    warning(searchSection, result)
    return
  }
  result.forEach(room => {
    searchSection.innerHTML +=
      `<div id="${room.number}" class="room-tile">
      <div class="room-info">
        <p>TYPE: <span class="booking-detail">${room.roomType}</span></p>
        <p>BIDET? <span class="booking-detail">${room.bidet}</span></p>
        <p>PER NIGHT: <span class="booking-detail">$${room.costPerNight}</span></p>
        <p>BED SIZE: <span class="booking-detail">${room.bedSize}</span></p>
        <p>BED COUNT: <span class="booking-detail">${room.numBeds}</span></p>
      </div>
      <button class="book-it" id="${room.number}">Book Room</button>
      <img class="room-image" src=${room.image} alt="${room.roomType}">
    </div>`
  })
}

function warning(section, string) {
  section.innerHTML = `<p class="warning">${string}</p>`
}

// function bookedUp() {
//   let sorted = hotel.bookings.reduce((acc, booking) => {
//     acc[booking.date] ? acc[booking.date] += 1 : acc[booking.date] = 1
//     return acc
//   }, {})
//   let index = Object.values(sorted).indexOf(25);
//   console.log(Object.keys(sorted)[index])
// }

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

function formatTodaysDate() {
  let formatedDate = hotel.date.replaceAll('/', '-')
  return formatedDate
}