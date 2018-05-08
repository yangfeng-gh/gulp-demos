require('should');
var index = require('../src/index');

// index.js
describe('index.js test', function() {
  it('index has a function showName', function() {
    index.showName().should.eql('index');
  });
});
