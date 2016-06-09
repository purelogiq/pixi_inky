(function () {
  INKY.Station = function(texture, x, y){
    PIXI.Sprite.call(this, INKY.TextureStash.assets(texture));

    this.width = 100;
    this.height = 100;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    INKY.Utils.position(this, x, y);

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
    if(this.scale.x > 1.05 || this.scale.x < 0.95){
      this.scale.x = 1;
      this.scale.y = 1;
      return
    }
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
});