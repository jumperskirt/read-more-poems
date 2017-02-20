/* eslint-disable no-unused-expressions, dot-notation */
var expect = require('chai').expect
var Game = require('../src/table')
var Node = require('../src/node')

// To start these specs, remove the x from xdescribe
describe('Game', function() {

  var game
  beforeEach(function() {
    game = new Game()
  })

  it('has a nodes object to keep track of nodes', function() {
    expect(game.nodes).to.eql({})
  })

  it('has a startingPoint property that is initially null', function() {
    expect(game.startingPoint).to.be.null
  })

  describe('addNode', function() {
    it('adds the node to an internal nodes object', function() {
      game.addNode('fo', 'fo text')
      expect(game.nodes.fo).to.be.instanceOf(Node)
    })

    it('does not allow you to register two nodes with the same title', function() {
      expect(function() {
        game.addNode('foo', 'bar')
        game.addNode('foo', 'could be different bar')
        // in this instance the second .addNode should throw an instance of an Error object
        // read more about the Error constructor here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
      }).to.throw(Error)
    })

    it('returns the node that was added', function() {
      // we need to return the Node that was added
      // to make things easier later on
      expect(game.addNode('fluf', 'cats')).to.be.instanceOf(Node)
    })

    it('sets the starting point if it does not already exist', function() {
      expect(game.startingPoint).to.be.null

      var shouldBeFirst = game.addNode('whatever', 'whatever')
      var shouldBeSecond = game.addNode('foo', 'bar')

      expect(game.startingPoint).to.equal(shouldBeFirst)
      expect(game.nodes['foo']).to.be.ok
    })
  })

  describe('getNode', function() {
    it('gets a node from the nodes object by name', function() {
      game.addNode('foo', 'some text')
      expect(game.getNode('foo')).to.be.instanceOf(Node)
      expect(game.getNode('foo').title).to.equal('foo')
    })
  })

  describe('connect', function() {
    // For these tests, we're going to set up something called a "spy"
    // a spy is a function that replaces another function and just
    // reports if it was called. We'll touch on this more later on...

    // We're doing this because we want to test that Game class
    // calls the connect method on the node class, but we don't
    // really want to test the Node class in this spec.

    // all we want to do is assert that the Node class gets a message
    // from the Game class.
    it("calls the first node's connect method", function() {
      var node1 = game.addNode('foo1', 'bar1')
      game.addNode('foo2', 'bar2')

      // here we're *overwriting* node1's connect method.
      // this is so we can test if its been called!
      var nodeConnectHasBeenCalled = false
      node1.connect = function() {
        nodeConnectHasBeenCalled = true
      }

      game.connect('foo1', 'foo2', 'some condition')
      expect(nodeConnectHasBeenCalled).to.be.true
    })

    it('throws an error if it cannot find the node', function() {
      expect(function() {
        game.connect('asdf', 'fdsa', 'some condition')
      }).to.throw(Error)
    })
  })
})
