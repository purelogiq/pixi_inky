(function () {
  INKY.Station = function(texture, x, y){
    PIXI.Sprite.call(this, INKY.TextureStash.assets(texture));

    this.width = 150;
    this.height = 150;

    this.anchor = {x:0.5, y: 0.5};
    this.x = x;
    this.y = y;
    this.pulseOut = false;
    this.origScale = this.scale.x;

    this.interactive = true;

    this.on('click', (function(e){
      this.scale.x = this.origScale + 0.08;
      this.scale.y = this.origScale + 0.08;
      this.pulseOut = false;
      console.log(e);
    }).bind(this));
  };

  INKY.Station.prototype = Object.create(PIXI.Sprite.prototype);
  INKY.Station.prototype.constructor = INKY.Station;

  INKY.Station.prototype.update = function(deltaTime){
    if(this.pulseOut){
      this.scale.x += 0.05 * deltaTime;
      this.scale.y += 0.05 * deltaTime;
      if(this.scale.x > this.origScale + .01) this.pulseOut = false;
    } else {
      this.scale.x -= 0.05 * deltaTime;
      this.scale.y -= 0.05 * deltaTime;
      if(this.scale.x < this.origScale - .01) this.pulseOut = true;
    }
  };
}());
