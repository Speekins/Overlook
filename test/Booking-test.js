import chai from 'chai';
import Booking from '../src/classes/booking'
import { testBookings } from '../src/data/testData'
const expect = chai.expect;

describe('booking', () => {
  let booking

  beforeEach(() => {
    booking = new Booking(testBookings[0])
  })

  it('should have an id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl6sz')
  })

  it('should have a user id', () => {
    expect(booking.userID).to.equal(1)
  })

  it('should have a date', () => {
    expect(booking.date).to.equal('2022/12/22')
  })

  it('should have a room number', () => {
    expect(booking.roomNumber).to.equal(5)
  })
})