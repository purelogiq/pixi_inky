(function () {
  function getDesignScale(designRect, previewRect) {
    var horizontalRatio = 0.75 * previewRect.width / designRect.width;
    var verticalRatio = 0.75 * previewRect.height / designRect.height;
    return Math.min(horizontalRatio, verticalRatio);
  }

  INKY.Thought = function () {
    PIXI.Graphics.call(this);
    this.beginFill(0xffffff);
    this.balloon = this.drawRoundedRect(0, 0, 400, 300, 50);
    this.anchor = {x: 0.5, y: 0.5};
    this.endFill();
    var shirt = new INKY.Shirt({
      designId: INKY.Utils.selectRandom(INKY.SHIRT_DESIGNS),
      color: INKY.Utils.selectRandom(INKY.SHIRT_COLORS)
    });
    shirt.scale = 1.5;
    shirt.offset = {x: 200, y: 150};
    shirt.update();
    this.balloon.addChild(shirt.container);
  };

  INKY.Thought.prototype = Object.create(PIXI.Graphics.prototype, {

  });
}());
