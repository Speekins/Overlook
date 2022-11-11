import chai from 'chai';
import Room from '../src/classes/room'
import { testRooms } from '../src/data/testData'
const expect = chai.expect;

describe('Room', function() {
  let room
  beforeEach(() => {
    room = new Room(testRooms[0])
  })

  it('should be an instance of room', function() {
    expect(room).to.be.instanceOf(Room);
  });

  it('should have a room number', () => {
    expect(room.number).to.equal(1)
  })

  it('should have a room type', () => {
    expect(room.type).to.equal('residential suite')
  })

  it('should confirm if it has a bidet', () => {
    expect(room.hasBidet).to.equal(true)
  })

  it('should have a cost per night', () => {
    expect(room.costPerNight).to.equal(358.40)
  })

  it('should have a bed type', () => {
    expect(room.bedSize).to.equal('queen')
  })

  it('should have a number of beds', () => {
    expect(room.numBeds).to.equal(1)
  })

});