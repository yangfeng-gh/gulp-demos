require('should');
var index = require('../src/index');

// main.coffee
describe('index.js test', function() {
  it('index has a function showName', function() {
    index.showName().should.eql('index');
  });
});
