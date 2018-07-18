(function (name, factory){
  if (typeof define === 'function' && define.amd) {
    define(name, factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    this[name] = factory();
  }
}('home', function () {
  function showName() {
    return 'home';
  }

  return {
    showName: showName
  };
}))
