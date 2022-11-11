class Booking {
  constructor(bookingData, roomData) {
    this.id = bookingData.id
    this.userID = bookingData.userID
    this.date = bookingData.date
    this.roomNumber = bookingData.roomNumber
    this.amount = this.getCostOfRoom(roomData)
  }

  getCostOfRoom(data) {
    return data.find(room => room.number === this.roomNumber).costPerNight
  }
}

module.exports = Booking