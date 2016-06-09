(function () {
  INKY.Background = function(){
    PIXI.Container.call(this);
    this.createWalls();
    this.createFloors();
    this.createDoors();
    this.createWindows();
    this.createCeiling();
  };

  INKY.Background.prototype = Object.create(PIXI.Container.prototype);
  INKY.Background.prototype.constructor = INKY.Background;

  INKY.Background.prototype.createWalls = function(){
    var self = this;
    var floor1 = new PIXI.Sprite(INKY.TextureStash.platform('houseBeige'));
    var floor2 = new PIXI.Sprite(INKY.TextureStash.platform('houseGray'));
    [floor1, floor2].forEach(function(floor){
      floor.width = INKY.WORLD_WIDTH;
      floor.height = INKY.WORLD_HEIGHT;
    });

    floor1.y = INKY.WORLD_HEIGHT * 2 / 5;
    this.addChild(floor2);
    this.addChild(floor1);

    [[100, 800], [250, 500], [450, 650], [700, 800], [1000, 730]]
      .forEach(function(spot){
      var brick = new PIXI.Sprite(INKY.TextureStash.platform('houseBeigeAlt'));
      INKY.Utils.position(brick, spot[0], spot[1]);
      self.addChild(brick);
    });

    [[150, 100], [230, 200], [470, 300], [640, 250], [910, 180]]
      .forEach(function(spot){
        var brick = new PIXI.Sprite(INKY.TextureStash.platform('houseGrayAlt'));
        INKY.Utils.position(brick, spot[0], spot[1]);
        self.addChild(brick);
      });
  };

  INKY.Background.prototype.createFloors = function(){
    var lowerMid = new PIXI.Sprite(INKY.TextureStash.platform('houseBeigeBottomMid'));
    lowerMid.width = INKY.WORLD_WIDTH;
    lowerMid.height = INKY.WORLD_HEIGHT / 12;
    lowerMid.y = INKY.WORLD_HEIGHT - lowerMid.height;
    this.addChild(lowerMid);

    var lowerL = new PIXI.Sprite(INKY.TextureStash.platform('houseBeigeBottomLeft'));
    lowerL.height = INKY.WORLD_HEIGHT / 12;
    lowerL.width = INKY.WORLD_HEIGHT / 12;
    lowerL.x = 4;
    lowerL.y = INKY.WORLD_HEIGHT - lowerL.height;
    this.addChild(lowerL);

    var lowerR = new PIXI.Sprite(INKY.TextureStash.platform('houseBeigeBottomRight'));
    lowerR.height = INKY.WORLD_HEIGHT / 12;
    lowerR.width = INKY.WORLD_HEIGHT / 12;
    lowerR.x = INKY.WORLD_WIDTH - lowerR.width;
    lowerR.y = INKY.WORLD_HEIGHT - lowerR.height;
    this.addChild(lowerR);

    var upperMidL = new PIXI.Sprite(INKY.TextureStash.platform('houseGrayBottomMid'));
    upperMidL.width = INKY.WORLD_WIDTH / 3;
    upperMidL.height = INKY.WORLD_HEIGHT / 12;
    upperMidL.y = INKY.WORLD_HEIGHT * 2/5 - upperMidL.height;
    this.addChild(upperMidL);

    var upperMidR = new PIXI.Sprite(INKY.TextureStash.platform('houseGrayBottomMid'));
    upperMidR.width = INKY.WORLD_WIDTH / 3;
    upperMidR.height = INKY.WORLD_HEIGHT / 12;
    upperMidR.x = INKY.WORLD_WIDTH * 2 / 3;
    upperMidR.y = INKY.WORLD_HEIGHT * 2/5 - upperMidR.height;
    this.addChild(upperMidR);

    var upperL = new PIXI.Sprite(INKY.TextureStash.platform('houseGrayBottomLeft'));
    upperL.height = INKY.WORLD_HEIGHT / 12;
    upperL.width = INKY.WORLD_HEIGHT / 12;
    upperL.x = 4;
    upperL.y = INKY.WORLD_HEIGHT * 2/5 - upperL.height;
    this.addChild(upperL);

    var upperR = new PIXI.Sprite(INKY.TextureStash.platform('houseGrayBottomRight'));
    upperR.height = INKY.WORLD_HEIGHT / 12;
    upperR.width = INKY.WORLD_HEIGHT / 12;
    upperR.x = INKY.WORLD_WIDTH - upperR.width;
    upperR.y = INKY.WORLD_HEIGHT * 2/5 - upperR.height;
    this.addChild(upperR);

  };

  INKY.Background.prototype.createCeiling = function(){
    var texture = INKY.TextureStash.assets('tiled_ceiling.png');
    var textureHeight = texture.height;
    var ceilingScaling = INKY.WORLD_HEIGHT / 12 / textureHeight;
    var ceiling = new PIXI.extras.TilingSprite(texture);
    ceiling.width = INKY.WORLD_WIDTH;
    ceiling.height = textureHeight;
    ceiling.scale.y = ceilingScaling;
    this.addChild(ceiling);
  };

  INKY.Background.prototype.createDoors = function(){
    var lDoorLower = new PIXI.Sprite(INKY.TextureStash.platform('doorKnobAlt'));
    lDoorLower.width = INKY.WORLD_WIDTH / 11;
    lDoorLower.height = lDoorLower.width * 1.25;
    lDoorLower.x = INKY.WORLD_WIDTH / 10;
    lDoorLower.y = INKY.WORLD_HEIGHT * 11/12 - lDoorLower.height / 2;
    this.addChild(lDoorLower);

    var lDoorUpper = new PIXI.Sprite(INKY.TextureStash.platform('doorPlateTop'));
    lDoorUpper.width = INKY.WORLD_WIDTH / 11;
    lDoorUpper.height = lDoorUpper.width;
    lDoorUpper.x = INKY.WORLD_WIDTH / 10;
    lDoorUpper.y = INKY.WORLD_HEIGHT * 11/12 - lDoorUpper.height * 1.5;
    this.addChild(lDoorUpper);

    var rDoorLower = new PIXI.Sprite(INKY.TextureStash.platform('doorKnobAlt'));
    rDoorLower.width = INKY.WORLD_WIDTH / 11;
    rDoorLower.height = rDoorLower.width * 1.25;
    rDoorLower.x = INKY.WORLD_WIDTH - INKY.WORLD_WIDTH / 10 - rDoorLower.width;
    rDoorLower.y = INKY.WORLD_HEIGHT * 11/12 - rDoorLower.height / 2;
    this.addChild(rDoorLower);

    var rDoorUpper = new PIXI.Sprite(INKY.TextureStash.platform('doorPlateTop'));
    rDoorUpper.width = INKY.WORLD_WIDTH / 11;
    rDoorUpper.height = rDoorUpper.width;
    rDoorUpper.x = INKY.WORLD_WIDTH - INKY.WORLD_WIDTH / 10 - rDoorLower.width;
    rDoorUpper.y = INKY.WORLD_HEIGHT * 11/12 - rDoorUpper.height * 1.5;
    this.addChild(rDoorUpper);
  };

  INKY.Background.prototype.createWindows = function(){
    [0, 1, 2, 3].forEach((function(offset){
      var window = new PIXI.Sprite(INKY.TextureStash.platform('windowCheckered'));
      window.width = INKY.WORLD_WIDTH / 11;
      window.height = window.width;
      window.x = INKY.WORLD_WIDTH / 11 + 292 * offset;
      window.y = INKY.WORLD_HEIGHT / 2;
      this.addChild(window);
    }).bind(this));
  };


})();


