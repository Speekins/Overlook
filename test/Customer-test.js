import chai from 'chai'
import Customer from '../src/classes/customer'
import Booking from '../src/classes/booking'
import {
  testCustomers, testBookings, testRooms,
  customerBookings, oldBookings, noneAvailable, filteredByDate, juniorSuites
} from '../src/data/testData'
const expect = chai.expect

describe('customer', () => {
  let customer, customer2
  beforeEach(() => {
    customer = new Customer(testCustomers[0], testBookings)
    customer2 = new Customer(testCustomers[1], testBookings)
  })

  it.skip('should be an instance of Customer', () => {
    expect(customer).to.be.instanceOf(Customer)
  })

  it.skip('should have an id', () => {
    expect(customer.id).to.equal(1)
  })

  it.skip('should have a name', () => {
    expect(customer.name).to.equal("Leatha Ullrich")
  })

  it.skip('should have an empty list if no bookings', () => {
    expect(customer2.bookings).to.eql([])
  })

  it.skip('should have a list of upcoming bookings, listed chronologically', () => {
    expect(customer.bookings).to.eql(customerBookings)
  })

  it.skip('bookings should be listed chronologically', () => {
    expect(customer.bookings).to.eql(customerBookings)
  })

  it.skip('should have a seperate list for past bookings, listed chronologically', () => {
    expect(customer.pastBookings).to.eql(oldBookings)
  })

  it.skip('should have the total cost spent on rooms', () => {
    customer.calculateAmountSpent()

    expect(customer.amountSpent).to.equal(1478.45)
  })

  it.skip('total cost spent on rooms should not be negative', () => {
    customer.calculateAmountSpent()
    customer2.bookings.push({
      "id": "5fwrgu4i7k55hl6tb",
      "userID": 2,
      "date": "2022/02/06",
      "roomNumber": 11
    })

    expect(customer.amountSpent).to.equal(0)
  })

  it.skip('should be able to make new bookings', () => {
    customer.bookNewDate(new Booking(testBookings[11]))

    expect(customer.bookings[customer.bookings.length - 1]).to.eql(testBookings[11])
  })

  it.skip('should be able to search for rooms by date', () => {
    let date = "2023/12/14"
    let date2 = "2023/11/30"
    let result = customer.searchByDate(date, testBookings, testRooms)
    let result2 = customer2.searchByDate(date2, testBookings, testRooms)

    expect(result).to.eql(testRooms)
    expect(result2).to.eql(filteredByDate)
  })

  it.skip('should have a property to hold the result of searchByDate', () => {
    let date = "2023/11/30"
    customer2.searchByDate(date, testBookings, testRooms)

    expect(customer2.searchResult).to.eql(filteredByDate)
  })

  it.skip('should be told if selected date is in the past', () => {
    let date = '2022/10/01'
    let result = customer.searchByDate(date, testBookings, testRooms)

    expect(result).to.equal('Selected date is in the past.')
  })

  it.skip('should be able to filter searched rooms by type', () => {
    let date = "2023/11/30"
    customer2.searchByDate(date, testBookings, testRooms)
    let result = customer.filterByType('junior suite')

    expect(result).to.eql(juniorSuites)
  })

  it.skip('should be told if no rooms are available on selected date', () => {
    let date = '2022/12/22'

    let result = customer.searchByDate(date, noneAvailable, testRooms)

    expect(result).to.equal('Sorry, there are no rooms available for the selected date')
  })

  it.skip('should be told if no rooms are available by type on selected date', () => {
    let filtered = testRooms.filter(room => room.roomType !== 'suite')
    customer.searchResult = filtered
    let result = customer.filterByType('suite')

    expect(result).to.eql('Sorry, there are no rooms available for the selected type')
  })
})