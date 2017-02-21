var expect = require('chai').expect
var Poem = require('../src/poem')
var Connection = require('../src/connection')

describe('Poem', function() {

  // first let's just set up some basic assertions about
  // how the "Poem" class works

  it('adopts title and text from constructor parameters', function() {
    var myPoem = new Poem('some title', 'some text')
    expect(myPoem.title).to.equal('some title')
    expect(myPoem.text).to.equal('some text')
  })

  it('starts with an empty connections array', function() {
    expect(new Poem().connections).to.eql([])
  })

  it('starts with an empty conditions object', function() {
    expect(new Poem().conditions).to.eql({})
  })

  // now, let's describe how we can wire up poems, and then test if
  // we switch from one poem to another based on input

  describe('connect', function() {
    // first we make two nodes
    var hallway, basement
    before(function() {
      hallway = new Poem('the hall', "There's a creaky door leading down.")
      basement = new Poem('the basement', "It's quite a bit darker down here than you thought possible.")
      hallway.connect(basement, 'Walk through the door')
    })

    it("adds a new connection to the poem's connections array", function() {
      expect(hallway.connections).to.have.length(1)
      expect(hallway.connections[0]).to.be.instanceOf(Connection)
    })

    it("adds that same connection to the poem's conditions object, with the condition as the key", function() {
      expect(hallway.conditions).to.eql({'Walk through the door': hallway.connections[0]})
    })

    describe('the connection it adds', function() {
      var connection

      before(function() { connection = hallway.connections[0] })

      it('has a name equal to the condition', function() {
        expect(connection.name).to.equal('Walk through the door')
      })

      it('has a value equal to the destination poem', function() {
        expect(connection.value).to.equal(basement)
      })
    })

    it('does not allow multiple connections with the same condition', function() {
      var livingRoom = new Poem('the living room', 'Tastefully decorated, with an ominous feeling rising from below')
      hallway.connect(livingRoom, 'Go back to the living room')
      expect(function() {
        hallway.connect(new Poem(), 'Go back to the living room')
        // The condition "Go back to the living room" already exists.
        //
        // connect should throw an instance of an Error object
        // read more about the Error constructor here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
      }).to.throw(Error)

    })

  })
})
