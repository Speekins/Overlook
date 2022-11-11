class Customer {
  constructor(customer, bookingsData) {
    this.id = customer.id
    this.name = customer.name
    this.date = new Date()
    this.bookings = this.getBookings(bookingsData) || []
    this.pastBookings = this.getPastBookings(bookingsData)
    this.amountSpent = this.calculateAmountSpent()
  }

  getBookings(data) {
    return data.filter(booking => {
      return booking.userID === this.id &&
        this.convertToMillis(booking.date) > this.date
    })
  }

  getPastBookings(data) {
    return data.filter(booking => {
      return booking.userID === this.id &&
        this.convertToMillis(booking.date) < this.date
    }).reverse()
  }

  calculateAmountSpent() {
    let upcoming = this.bookings.reduce((total, booking) => {
      total += booking.amount
      return total
    }, 0)
    let past = this.pastBookings.reduce((total, booking) => {
      total += booking.amount
      return total
    }, 0)
    let total = Number((upcoming + past).toFixed(2))
    if (total < 0) {
      return 0
    }
    return total
  }

  convertToMillis(date) {
    let year = date.slice(0, 4)
    let month = date.slice(5, 7)
    let day = date.slice(8)
    let newDate = new Date(`${year}-${month}-${day}`)
    return newDate.getTime()
  }
}

module.exports = Customer