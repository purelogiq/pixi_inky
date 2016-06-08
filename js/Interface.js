INKY.Interface = function (config) {
  config = config || {};
  this.element = config.element || document.createElement('div');
  this.init();
};

INKY.Interface.prototype = {
  init: function () {
    this.element.className = 'inky-interface';
    this.title = document.createElement('h2');
    this.title.textContent = 'Screen Printing Station';
    this.element.appendChild(this.title);
  }
};
