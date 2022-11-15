const Room = require("./room")
const Booking = require("./booking")
const Customer = require("./customer")

class Hotel {
  constructor(bookingsData, customersData, roomsData) {
    this.rooms = this.instantiateRooms(roomsData)
    this.bookings = this.instantiateBookings(bookingsData)
    this.customers = this.instantiateCustomers(customersData)
    this.date = this.getCurrentDate()
    this.availableRooms = this.getAvailableRooms()
    this.todaysRevenue = this.getTodaysRevenue()
    this.percentOccupation = this.calculatePercentOccupation()
    this.searchResult
    this.usernames = this.loadUsernames()
  }

  instantiateRooms(rooms) {
    let allRooms = rooms.map(room => new Room(room))
    allRooms.forEach(room => {
      room.image = './images/single.jpg'
      switch (room['roomType']) {
        case 'single room': room.image = './images/single.jpg'
          break
        case 'suite': room.image = './images/suite.jpg'
          break
        case 'junior suite': room.image = './images/junior-suite.jpg'
          break
        case 'residential suite': room.image = './images/queen.jpg'
          break
        default:
          room['image'] = './images/king.jpg'
      }
    })
    return allRooms
  }

  instantiateBookings(bookings) {
    return bookings.map(booking => new Booking(booking, this.rooms))
      .sort((a, b) => this.convertDateToNum(a.date) - this.convertDateToNum(b.date))
  }

  instantiateCustomers(customers) {
    return customers.map(customer => new Customer(customer, this.bookings))
  }

  loadUsernames() {
    return this.customers.map(customer => `customer${customer.id}`)
  }

  getCurrentDate() {
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    return `${year}/${month}/${day}`
  }

  makeBooking(userID, roomNumber, date) {
    return { "userID": userID, "date": date, "roomNumber": roomNumber }
  }

  getOccupiedRooms() {
    return this.bookings.filter(booking => booking.date === this.date)
      .map(booking => booking.roomNumber)
  }

  getAvailableRooms() {
    let occupiedRooms = this.getOccupiedRooms()
    return this.rooms.filter(room => !occupiedRooms.includes(room.number))
      .map(room => room.number)
  }

  calculatePercentOccupation() {
    let occupiedRooms = this.getOccupiedRooms().length
    let percent = ((occupiedRooms / this.rooms.length) * 100).toFixed(2)
    return `${percent}%`
  }

  getTodaysRevenue() {
    let occupiedRooms = this.getOccupiedRooms()
    return this.rooms.reduce((total, room) => {
      if (occupiedRooms.includes(room.number)) {
        total += room.costPerNight
      }
      return total
    }, 0)
  }

  searchByDate(date) {
    if (!this.validateSearch(date)) {
      return 'Selected date is in the past or not in mm/dd/yyyy format.'
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
    let isDate = date.length === 10
    let isNotPast = this.convertDateToNum(this.date) <= this.convertDateToNum(date)
    return isDate && isNotPast
  }
}

module.exports = Hotel