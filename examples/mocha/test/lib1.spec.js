require('should');
var index = require('../lib/lib1');

// lib1.js
describe('lib1.js test', function() {
  it('lib1 has a function showName', function() {
    index.showName().should.eql('lib1');
  });
});
