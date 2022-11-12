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
  }

  instantiateRooms(rooms) {
    return rooms.map(room => new Room(room))
  }

  instantiateBookings(bookings) {
    return bookings.map(booking => new Booking(booking, this.rooms))
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
}

module.exports = Hotel