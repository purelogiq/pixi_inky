(function () {
  INKY.Background = function(){
    PIXI.Container.call(this);
    this.shirtRack = new INKY.Station('face.png', 100, 100);
    this.printer = new INKY.Station('face.png', 1100, 900);
    this.addChild(this.shirtRack);
    this.addChild(this.printer);
  };

  INKY.Background.prototype = Object.create(PIXI.Container.prototype);
  INKY.Background.prototype.constructor = INKY.Background;

  INKY.Background.prototype.update = function(deltaTime){
    this.shirtRack.update(deltaTime);
    this.printer.update(deltaTime);
  };
})();


