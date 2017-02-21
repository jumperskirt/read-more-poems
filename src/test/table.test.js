/* eslint-disable no-unused-expressions, dot-notation */
var expect = require('chai').expect
var Table = require('../src/table')
var Poem = require('../src/poem')

// To start these specs, remove the x from xdescribe
describe('Table', function() {

  var table
  beforeEach(function() {
    table = new Table()
  })

  it('has a poems object to keep track of poems', function() {
    expect(table.poems).to.eql({})
  })

  it('has a startingPoint property that is initially null', function() {
    expect(table.startingPoint).to.be.null
  })

  describe('addPoem', function() {
    it('adds the node to an internal poems object', function() {
      table.addPoem('fo', 'fo text')
      expect(table.poems.fo).to.be.instanceOf(Node)
    })

    it('does not allow you to register two poems with the same title', function() {
      expect(function() {
        table.addPoem('foo', 'bar')
        table.addPoem('foo', 'could be different bar')
        // in this instance the second .addPoem should throw an instance of an Error object
        // read more about the Error constructor here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
      }).to.throw(Error)
    })

    it('returns the node that was added', function() {
      // we need to return the Node that was added
      // to make things easier later on
      expect(table.addPoem('fluf', 'cats')).to.be.instanceOf(Node)
    })

    it('sets the starting point if it does not already exist', function() {
      expect(table.startingPoint).to.be.null

      var shouldBeFirst = table.addPoem('whatever', 'whatever')
      var shouldBeSecond = table.addPoem('foo', 'bar')

      expect(table.startingPoint).to.equal(shouldBeFirst)
      expect(table.poems['foo']).to.be.ok
    })
  })

  describe('getNode', function() {
    it('gets a node from the poems object by name', function() {
      table.addPoem('foo', 'some text')
      expect(table.getNode('foo')).to.be.instanceOf(Node)
      expect(table.getNode('foo').title).to.equal('foo')
    })
  })

  describe('connect', function() {
    // For these tests, we're going to set up something called a "spy"
    // a spy is a function that replaces another function and just
    // reports if it was called. We'll touch on this more later on...

    // We're doing this because we want to test that table class
    // calls the connect method on the node class, but we don't
    // really want to test the Node class in this spec.

    // all we want to do is assert that the Node class gets a message
    // from the table class.
    it("calls the first node's connect method", function() {
      var node1 = table.addPoem('foo1', 'bar1')
      table.addPoem('foo2', 'bar2')

      // here we're *overwriting* node1's connect method.
      // this is so we can test if its been called!
      var nodeConnectHasBeenCalled = false
      node1.connect = function() {
        nodeConnectHasBeenCalled = true
      }

      table.connect('foo1', 'foo2', 'some condition')
      expect(nodeConnectHasBeenCalled).to.be.true
    })

    it('throws an error if it cannot find the node', function() {
      expect(function() {
        table.connect('asdf', 'fdsa', 'some condition')
      }).to.throw(Error)
    })
  })
})
