(function () {
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
      this.printerStation = new INKY.Printer();
      this.stations = [this.rackStation, this.printerStation];

      this.stations.forEach(function (station) {
        station.element.className += ' inky-interface--station';
        element.appendChild(station.element);
      });
    },

    activate: function (stationName) {
      this.stations.forEach(function (station) {
        station.element.className = station.element.className.replace(/\s?\bactive/, '');
      });

      switch (stationName) {
        case 'rack':
          this.rackStation.render();
          this.rackStation.activate();
          break;
        case 'printer':
          this.printerStation.render();
          this.printerStation.activate();
          break;
        default:
          this.stations[0].className += 'active';
      }
    }
  };
}());
