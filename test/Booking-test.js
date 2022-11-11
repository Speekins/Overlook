import chai from 'chai';
import Booking from '../src/classes/booking'
import { testBookings } from '../src/data/testData'
const expect = chai.expect;

describe('booking', () => {
  let booking

  beforeEach(() => {
    booking = new Booking(testBookings[0])
  })

  it.skip('should have an id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl6sz')
  })

  it.skip('should have a user id', () => {
    expect(booking.userID).to.equal('9')
  })

  it.skip('should have a date', () => {
    expect(booking.date).to.equal('2022/04/22')
  })

  it.skip('should have a room number', () => {
    expect(booking.roomNumber).to.equal('15')
  })
})