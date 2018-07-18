!function(name, factory){
  if (typeof define === 'function' && define.amd) {
    define(name, factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    this[name] = factory();
  }
}('file1', function() {
  function showName() {
    return 'file1';
  }

  return {
    showName: showName
  };
});
