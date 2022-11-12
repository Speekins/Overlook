import chai from 'chai'
import Customer from '../src/classes/customer'
import Booking from '../src/classes/booking'
import {
  testBookings, customerBookings,
  oldBookings, testCustomerData
} from '../src/data/testData'
const expect = chai.expect

describe('customer', () => {
  let customer, customer2
  beforeEach(() => {
    customer = new Customer(testCustomerData[0], testBookings)
    customer2 = new Customer(testCustomerData[1], testBookings)
  })

  it('should be an instance of Customer', () => {
    expect(customer).to.be.instanceOf(Customer)
  })

  it('should have an id', () => {
    expect(customer.id).to.equal(1)
  })

  it('should have a name', () => {
    expect(customer.name).to.equal("Leatha Ullrich")
  })

  it('should have an empty list if no bookings', () => {
    expect(customer2.bookings).to.eql([])
  })

  it('should have a list of upcoming bookings, listed chronologically', () => {
    expect(customer.bookings).to.eql(customerBookings)
  })

  it('should have a seperate list for past bookings, listed chronologically', () => {
    expect(customer.pastBookings).to.eql(oldBookings)
  })

  it('should have the total cost spent on rooms', () => {
    customer.calculateAmountSpent()

    expect(customer.amountSpent).to.equal(1478.45)
  })

  it('total cost spent on rooms should not be negative', () => {
    customer2.bookings.push({
      "id": "5fwrgu4i7k55hl6tb",
      "userID": 2,
      "date": "2022/02/06",
      "roomNumber": 11
    })
    customer2.calculateAmountSpent()

    expect(customer2.amountSpent).to.equal(0)
  })

  it.skip('should be able to make new bookings', () => {
    customer.bookNewDate(new Booking(testBookings[10]))

    expect(customer.bookings[customer.bookings.length - 1]).to.eql(testBookings[11])
  })
})