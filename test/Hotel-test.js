import chai from 'chai'
import Customer from '../src/classes/customer'
import Hotel from '../src/classes/hotel'
import {
  testBookings, noneAvailable, filteredByDate,
  juniorSuites, testCustomerData, testUsernames, testRoomData, testBookingData
} from '../src/data/testData'
const expect = chai.expect

describe('hotel', () => {
  let hotel

  beforeEach(() => {
    hotel = new Hotel(testBookingData, testCustomerData, testRoomData)
  })

  it('should have a list of rooms', () => {
    expect(hotel.rooms).to.eql(testRoomData)
  })

  it('should have a list of bookings, listed chronologically', () => {
    expect(hotel.bookings).to.eql(testBookings)
  })

  it('should have a list of customers', () => {
    expect(hotel.customers.length).to.equal(10)
    for (let i = 0; i < hotel.bookings.length; i++) {
      expect(hotel.customers[i]).to.be.instanceOf(Customer)
    }
  })

  it('should know the current date', () => {
    hotel.getCurrentDate()
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    let date = `${year}/${month}/${day}`

    expect(hotel.date).to.equal(date)
  })

  it('should have a list of all usernames', () => {

    expect(hotel.usernames).to.eql(testUsernames)
  })

  it('should have a list of currently available rooms', () => {
    hotel.date = "2022/12/22"
    let availableRooms = hotel.getAvailableRooms()

    expect(availableRooms).to.eql([1, 2, 3, 4, 6, 7, 8, 9, 10])
  })

  it('should know the hotel\'s revenue for today', () => {
    hotel.date = "2022/12/22"
    hotel.getAvailableRooms()
    let revenue = hotel.getTodaysRevenue()
  
    expect(revenue).to.equal(340.17)
  })

  it('should know the percentage of rooms currently occupied', () => {
    hotel.date = "2022/12/22"
    hotel.getAvailableRooms()
    let percent = hotel.calculatePercentOccupation()

    expect(percent).to.equal('10.00%')
  })

  it('should be able to make a new booking', () => {
    let newBooking = hotel.makeBooking(1, 7, "2023/06/28")
    let post = { "userID": 1, "date": "2023/06/28", "roomNumber": 7 }
    expect(newBooking).to.eql(post)
  })

  it('should search for rooms by a given date', () => {
    let date = "2023/12/15"
    let date2 = "2023/11/30"
    let result = hotel.searchByDate(date)
    let result2 = hotel.searchByDate(date2)

    expect(result).to.eql(testRoomData)
    expect(result2).to.eql(filteredByDate)
  })

  it('should have a property to hold the result of searchByDate', () => {
    let date = "2023/11/30"
    hotel.searchByDate(date)

    expect(hotel.searchResult).to.eql(filteredByDate)
  })

  it('should alert customer if selected date is in the past', () => {
    let date = '2022/10/01'
    let result = hotel.searchByDate(date)

    expect(result).to.equal('Selected date is in the past or not in mm/dd/yyyy format.')
  })

  it('should apologize if no rooms are available on selected date', () => {
    let date = '2022/12/22'
    hotel.bookings = noneAvailable
    let result = hotel.searchByDate(date)

    expect(result).to.equal('Sorry, there are no rooms available for the selected date')
  })

  it('should be able to filter searched rooms by type', () => {
    let date = "2023/11/30"
    hotel.searchByDate(date)
    let result = hotel.filterByType('junior suite')

    expect(result).to.eql(juniorSuites)
  })

  it('should apologize if no rooms are available by type on selected date', () => {
    let filtered = testRoomData.filter(room => room.roomType !== 'suite')
    hotel.searchResult = filtered
    let result = hotel.filterByType('suite')

    expect(result).to.eql('Sorry, there are no rooms available for the selected type')
  })
})