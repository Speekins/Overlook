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
});