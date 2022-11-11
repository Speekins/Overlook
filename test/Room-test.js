import chai from 'chai';
import Room from '../src/classes/room'
const expect = chai.expect;

describe('Room', function() {
  let room
  beforeEach(() => {
    room = new Room()
  })

  it('should be an instance of room', function() {
    expect(room).to.be.instanceOf(Room);
  });

  it.skip('should have a room number', () => {

  })

  it.skip('should have a room type', () => {

  })

  it.skip('should confirm if it has a bidet', () => {

  })

  it.skip('should have a cost per night', () => {

  })

  it.skip('should have a bed type', () => {

  })

  it.skip('should have a number of beds', () => {

  })

});