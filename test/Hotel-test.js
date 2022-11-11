import chai from 'chai'
import Hotel from '../src/classes/hotel'
import Booking from '../src/classes/booking'
import { testBookings, testCustomers, testRooms, newTestBooking, sortedBookings } from '../src/data/testData'
const expect = chai.expect

describe('hotel', () => {
  let hotel

  beforeEach(() => {
    hotel = new Hotel(testBookings, testCustomers)
  })

  it.skip('should have a list of bookings', () => {
    expect(hotel.bookings).to.eql(testBookings)
  })

  it.skip('should have a list of customers', () => {
    expect(hotel.customers).to.eql(testCustomers)
  })

  it.skip('should have a list of rooms', () => {
    expect(hotel.rooms).to.eql(testRooms)
  })

  it.skip('should know the current date', () => {
    hotel.getCurrentDate()
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    let date = `${year}/${month}/${day}`

    expect(hotel.currentDate).to.equal(date)
  })

  it.skip('should know the current time', () => {
    let time = hotel.getCurrentTime()

    expect(hotel.time).to.equal(time)
  })

  it.skip('should know the current date and time in milliseconds', () => {
    let exactTime = hotel.exactTime

    expect(hotel.exactTime).to.equal(exactTime)
  })

  it.skip('should be able to make a new booking', () => {
    let newBooking = hotel.makeBooking(1, 7, "2023/06/28", "5fwrgu4i7k55hl8ef")

    expect(newBooking).to.eql(newTestBooking)
  })

  it.skip('should have a list of bookings for the current day', () => {
    hotel.currentDate = '2022/02/06'
    let todaysBookings = hotel.getTodaysBookings()

    expect(todaysBookings).to.eql(testBookings[7])
  })

  it.skip('should have a list of bookings, listed chronologically', () => {
    expect(hotel.allBookings).to.eql(sortedBookings)
  })

  // function convertToNum(obj) {
  //   let year = obj.date.slice(0, 4)
  //   let month = obj.date.slice(5, 7)
  //   let day = obj.date.slice(8)
  //   let date = new Date(`${year}-${month}-${day}`)
  //   return date.getTime()
  // }
  
  // let copy = bookings.slice(0);
  
  // copy.sort((a, b) => convertToNum(a) - convertToNum(b))

  it.skip('should have an empty list if no bookings', () => {

  })
})