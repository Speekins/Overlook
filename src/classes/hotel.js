const Room = require("./room")
const Booking = require("./booking")
const Customer = require("./customer")

class Hotel {
  constructor(bookingsData, customersData, roomsData) {
    this.rooms = this.instantiateRooms(roomsData)
    this.bookings = this.instantiateBookings(bookingsData)
    this.customers = this.instantiateCustomers(customersData)
    this.date = this.getCurrentDate()
    this.time = this.getCurrentTime()
    this.exactTime = Date.now()
    this.searchResult
  }

  instantiateRooms(rooms) {
    return rooms.map(room => new Room(room))
  }

  instantiateBookings(bookings) {
    return bookings.map(booking => new Booking(booking, this.rooms))
      .sort((a, b) => this.convertDateToNum(a.date) - this.convertDateToNum(b.date))
  }

  instantiateCustomers(customers) {
    return customers.map(customer => new Customer(customer, this.bookings))
  }

  getCurrentDate() {
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    return `${year}/${month}/${day}`
  }

  getCurrentTime() {
    let date = new Date()
    return date.getTime()
  }

  makeBooking(userID, roomNumber, date) {
    return { "userID": userID, "date": date, "roomNumber": roomNumber }
  }

  getTodaysBookings() {
    return this.bookings.filter(booking => booking.date === this.date)
  }

  searchByDate(date) {
    if (!this.validateSearch(date)) {
      return 'Selected date is in the past.'
    }
    let unavailable = this.bookings.filter(booking => booking.date === date)
      .map(booking => booking.roomNumber)
    let available = this.rooms.filter(room => !unavailable.includes(room.number))
    if (this.rooms.length === unavailable.length) {
      return 'Sorry, there are no rooms available for the selected date'
    }
    this.searchResult = available
    return available
  }

  filterByType(type) {
    type = type.toLowerCase()
    let filtered = this.searchResult.filter(room => room.roomType === type)
    if (!filtered.length) {
      return 'Sorry, there are no rooms available for the selected type'
    }
    return filtered
  }

  convertDateToNum(date) {
    let year = date.slice(0, 4)
    let month = date.slice(5, 7)
    let day = date.slice(8)
    let newDate = new Date(`${year}-${month}-${day}`)
    return newDate.getTime()
  }

  validateSearch(date) {
    return this.convertDateToNum(this.date) <= this.convertDateToNum(date)
  }
}

module.exports = Hotel