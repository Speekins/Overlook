class Customer {
  constructor(customer, bookingsData) {
    this.id = customer.id
    this.name = customer.name
    this.date = new Date()
    this.formatedDate = this.getFormatedDate()
    this.bookings = this.getBookings(bookingsData) || []
    this.pastBookings = this.getPastBookings(bookingsData)
    this.amountSpent = this.calculateAmountSpent()
    this.getFormatedDate()
  }

  getBookings(data) {
    return data.filter(booking => {
      return booking.userID === this.id &&
       this.convertToMillis(booking.date) >= this.getFormatedDate()
    })
  }

  getPastBookings(data) {
    return data.filter(booking => {
      return booking.userID === this.id &&
        this.convertToMillis(booking.date) < this.getFormatedDate()
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

  getFormatedDate() {
    let newDate = new Date()
    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let day = newDate.getDate()
    let formated = `${year}/${month}/${day}`
    return this.convertToMillis(formated)
  }
}

module.exports = Customer