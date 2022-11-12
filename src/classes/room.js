class Room {
  constructor(roomData) {
    this.number = roomData.number
    this.roomType = roomData.roomType
    this.bidet = roomData.bidet
    this.costPerNight = roomData.costPerNight
    this.bedSize = roomData.bedSize
    this.numBeds = roomData.numBeds
  }
}

module.exports = Room