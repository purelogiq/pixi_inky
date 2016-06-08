INKY.World = function(){
  var world = new PIXI.Container();
  world.width = INKY.WORLD_WIDTH;
  world.height = INKY.WORLD_HEIGHT;
  var inky = null;

  this.container = world;

  this.update = function(){
    console.log('world updated');
  };

  function init(){
    createFloor();
    createDecorations();
    createStations();
    createDoors();
    createInky();
  }

  function createFloor(){
    var floor = new PIXI.extras.TilingSprite(
      TextureStash.platform('roofYellowMid'),
      INKY.WORLD_WIDTH,
      INKY.WORLD_HEIGHT
    );
    world.addChild(floor);
  }

  function createDecorations(){

  }

  function createStations(){
    var computer = new PIXI.Sprite(TextureStash.assets('face.png'));
    var shirtRack = new PIXI.Sprite(TextureStash.assets('face.png'));
    var printer = new PIXI.Sprite(TextureStash.assets('face.png'));

    // Set sizes and anchoring of the stations
    [computer, shirtRack, printer].forEach(function(station){
      station.width = 100;
      station.height = 100;
      station.anchor.x = 0.5;
      station.anchor.y = 0.5;
    });

    // Set positions of the stations
    computer.x = 100;
    shirtRack.x = 300;
    printer.x = 500;

    computer.interactive = true;
    shirtRack.interactive = true;
    printer.interactive = true;

    computer.tap = function(event){
      alert('tapped computer');
    };

    shirtRack.tap = function(event){
      alert('tapped shirtrack');
    };

    world.addChild(computer);
    world.addChild(shirtRack);
    world.addChild(printer);
  }

  function createDoors(){

  }

  function createInky(){
    inky = new PIXI.Sprite(TextureStash.assets('inky.png'));

    inky.width = 100;
    inky.height = 100;

    inky.x = 500;
    inky.y = 500;

    world.addChild(inky);
  }

  init();
};
