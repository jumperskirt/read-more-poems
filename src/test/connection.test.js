var expect = require('chai').expect
var Connection = require('../src/connection')
var Node = require('../src/poem')

describe('Connection', function() {
  var aNode

  before(function() {
    aNode = new Node()
  })

  it('adopts value and name from constructor parameters', function() {
    var someConnection = new Connection(aNode, 'foo')
    expect(someConnection.value).to.equal(aNode)
    expect(someConnection.name).to.equal('foo')
  })
})
