import chai from 'chai';
import Customer from '../src/classes/customer'
const expect = chai.expect;

describe('customer', () => {
  let customer
  beforeEach(() => {
    customer = new Customer(customerData, bookingsData)
  })

  it.skip('should be an instance of Customer', () => {
    expect(customer).to.be.instanceOf(Customer)
  })

  it.skip('should have an id', () => {

  })

  it.skip('should have a name', () => {

  })

  it.skip('should have a list of upcoming bookings', () => {

  })

  it.skip('bookings should be listed by date—furthest last, nearest first', () => {

  })

  it.skip('should have a seperate list for old bookings', () => {

  })

  it.skip('should have an empty list if no bookings', () => {

  })

  it.skip('should have the total cost spent on rooms', () => {

  })

  it.skip('total cost spent on rooms should not be negative', () => {

  })

  it.skip('should be able to make new bookings', () => {

  })

  it.skip('should be told if no bookings are available on selected date', () => {

  })
})