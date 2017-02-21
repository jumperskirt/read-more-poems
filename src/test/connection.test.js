var expect = require('chai').expect
var Connection = require('../src/connection')
var Poem = require('../src/poem')

describe('Connection', function() {
  var aPoem

  before(function() {
    aPoem = new Node()
  })

  it('adopts value and name from constructor parameters', function() {
    var someConnection = new Connection(aPoem, 'foo')
    expect(someConnection.value).to.equal(aPoem)
    expect(someConnection.name).to.equal('foo')
  })
})
