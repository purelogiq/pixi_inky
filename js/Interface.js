INKY.Interface = function (config) {
  config = config || {};
  this.element = config.element || document.createElement('div');
  this.init();
};

INKY.Interface.prototype = {
  init: function () {
    var element = this.element;
    element.className = 'inky-interface';

    this.rackStation = new INKY.Rack();
    this.stations = [this.rackStation];

    this.stations.forEach(function (station) {
      station.element.className += ' inky-interface--station';
      element.appendChild(station.element);
    });
  },

  activate: function (stationName) {
    this.stations.forEach(function (station) {
      station.element.className.replace(/\s?active/, '');
    });

    switch(stationName) {
      case 'rack':
        this.rackStation.render();
        this.rackStation.activate();
        break;
      default:
        this.stations[0].className += 'active';
    }
  }
};
