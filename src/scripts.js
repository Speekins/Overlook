import { fetchData, fetchAll } from './apiCalls'
import Hotel from './classes/hotel'
import Customer from './classes/customer'
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

let loginSection = document.getElementById('login-section')
let mainHeader = document.getElementById('main-header')
let main = document.getElementById('main')
let bookingSection = document.getElementById('bookings-section')
let searchSection = document.getElementById('search-content')
let searchButton = document.getElementById('search-button')
let selectDate = document.getElementById('select-date')
let bookButtons
let filterRoomType = document.getElementById('filter-room-type')
let historyButton = document.getElementById('history-button')
let totalAmount = document.getElementById('total-amount')
let backToBookingsButton = document.getElementById('back-to-bookings')
let clearFilterButton = document.getElementById('clear-filter')
let name = document.getElementById('name')
let username = document.getElementById('username')
let password = document.getElementById('password')
let signInButton = document.getElementById('sign-in')
let loginWarning = document.getElementById('login-warning')
let amountSpent = document.getElementById('amount-spent')
let dashboardH2 = document.getElementById('dashboard-h2')
let searchH2 = document.getElementById('search-h2')
let customerSearchSection = document.getElementById('customer-search-section')
let customerSearch = document.getElementById('customer-search')
let customerSearchButton = document.getElementById('customer-search')
let searchInputs = document.getElementById('search-inputs')

document.addEventListener('keypress', event => {
  if (event.key === "Enter") {
    event.preventDefault()
    event.target.click()
  }
})

signInButton.addEventListener('click', () => {
  if (!validateUser(username.value, password.value)) {
    show(loginWarning)
    username.value = ''
    password.value = ''
  } else if (username.value === 'manager') {
    loadManagerDashboard()
    return
  } else {
    fetchUser(username.value)
    hide(loginSection)
    show(main)
    show(mainHeader)
  }
})

customerSearch.addEventListener('keyup', (e) => {
  let entry = e.target.value
  showCustomer(searchByName(entry))
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
      selectDate.value = formatTodaysDate()
      selectDate.min = formatTodaysDate()
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
    warning(bookingSection, 'There\'s nothing to see here!')
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

function validateUser(username, password) {
  return (hotel.usernames.includes(username) || username === 'manager')
    && password === 'overlook2021'
}

function fetchUser(user) {
  let id = user.slice(8)
  fetchData(`http://localhost:3001/api/v1/customers/${id}`)
    .then(data => currentCustomer = new Customer(data, hotel.bookings))
    .then(() => loadUserDashboard())
}

function loadUserDashboard() {
  name.innerText = currentCustomer.name.split(' ')[0]
  totalAmount.innerText = `$${currentCustomer.amountSpent}`
  showBookings(currentCustomer.bookings)
}

function loadManagerDashboard() {
  hide(loginSection)
  hide(historyButton)
  hide(amountSpent)
  hide(searchInputs)
  show(customerSearchSection)
  show(mainHeader)
  show(main)
  showCustomer(hotel.customers)
  dashboardH2.innerText = 'Today\'s Snapshot'
  searchH2.innerText = 'Customer Search'
  name.innerText = 'Manager'
  bookingSection.innerHTML +=
    `<div class="booking-tile">
    <p>${hotel.availableRooms}</p>
    </div>
    <div class="booking-tile">
  <p>${hotel.todaysRevenue}</p>
  </div>
  <div class="booking-tile">
  <p>${hotel.percentOccupation}</p>
  </div>
  `
}

function searchByName(string) {
  string = string.toLowerCase()
  return hotel.customers.filter(customer => customer.name.toLowerCase().includes(string))
}

function showCustomer(customers) {
  searchSection.innerHTML = ''
  customers.forEach(customer => {
    searchSection.innerHTML += 
    `<div id="${customer.id}" class="room-tile">
      <div class="room-info">
        <p>NAME: <span class="booking-detail">${customer.name}</span></p>
        <p>AMOUNT SPENT? <span class="booking-detail">$${customer.amountSpent}</span></p>
      </div>
      <button class="customer-bookings" id="${customer.id}">Show Bookings</button>
      <button class="new-booking" id="${customer.id}">New Booking</button>
    </div>`
  })
}