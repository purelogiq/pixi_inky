(function () {
  INKY.Station = function(texture, x, y){
    PIXI.Sprite.call(this, INKY.TextureStash.assets(texture));

    this.width = 150;
    this.height = 150;
    this.x = x;
    this.y = y;
    this.scale = 1;
    
    this.pulseOut = false;

    this.interactive = true;
    this.on('click', (function(e){
      this.scale.x = 1.2;
      this.scale.y = 1.2;
      this.pulseOut = false;
      console.log(e);
    }).bind(this));
  };

  INKY.Station.prototype = Object.create(PIXI.Sprite.prototype);
  INKY.Station.prototype.constructor = INKY.Station;

  INKY.Station.prototype.update = function(deltaTime){
    if(this.pulseOut){
      this.scale.x += 0.1 * deltaTime;
      this.scale.y += 0.1 * deltaTime;
      if(this.scale.x > 1.05) pulseOut = false;
    } else {
      this.scale.x -= 0.1 * deltaTime;
      this.scale.y -= 0.1 * deltaTime;
      if(this.scale.x < 0.95) pulseOut = true;
    }
  };
}());
