var expect = require('chai').expect
var Node = require('../src/node')
var Connection = require('../src/connection')

describe('Node', function() {

  // first let's just set up some basic assertions about
  // how the "Node" class works

  it('adopts title and text from constructor parameters', function() {
    var myNode = new Node('some title', 'some text')
    expect(myNode.title).to.equal('some title')
    expect(myNode.text).to.equal('some text')
  })

  it('starts with an empty connections array', function() {
    expect(new Node().connections).to.eql([])
  })

  it('starts with an empty conditions object', function() {
    expect(new Node().conditions).to.eql({})
  })

  // now, let's describe how we can wire up nodes, and then test if
  // we switch from one node to another based on input

  describe('connect', function() {
    // first we make two nodes
    var hallway, basement
    before(function() {
      hallway = new Node('the hall', "There's a creaky door leading down.")
      basement = new Node('the basement', "It's quite a bit darker down here than you thought possible.")
      hallway.connect(basement, 'Walk through the door')
    })

    it("adds a new connection to the node's connections array", function() {
      expect(hallway.connections).to.have.length(1)
      expect(hallway.connections[0]).to.be.instanceOf(Connection)
    })

    it("adds that same connection to the node's conditions object, with the condition as the key", function() {
      expect(hallway.conditions).to.eql({'Walk through the door': hallway.connections[0]})
    })

    describe('the connection it adds', function() {
      var connection

      before(function() { connection = hallway.connections[0] })

      it('has a name equal to the condition', function() {
        expect(connection.name).to.equal('Walk through the door')
      })

      it('has a value equal to the destination node', function() {
        expect(connection.value).to.equal(basement)
      })
    })

    it('does not allow multiple connections with the same condition', function() {
      var livingRoom = new Node('the living room', 'Tastefully decorated, with an ominous feeling rising from below')
      hallway.connect(livingRoom, 'Go back to the living room')
      expect(function() {
        hallway.connect(new Node(), 'Go back to the living room')
        // The condition "Go back to the living room" already exists.
        //
        // connect should throw an instance of an Error object
        // read more about the Error constructor here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
      }).to.throw(Error)

    })

  })
})
