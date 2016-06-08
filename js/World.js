INKY.World = function(){
  var world = new PIXI.Container();
  var inky = null;
  var inkyDestination = null;
  var inkySpeed = 300; // 300px per second

  world.width = INKY.WORLD_WIDTH;
  world.height = INKY.WORLD_HEIGHT;
  this.container = world;

  this.update = function(deltaTime){
    animateInky(deltaTime);
    if(inkyDestination) moveInky(deltaTime);
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
    computer.x = 50;
    shirtRack.x = 50;
    shirtRack.y = INKY.WORLD_HEIGHT - 200;
    printer.x = INKY.WORLD_WIDTH - 200;
    printer.y = INKY.WORLD_HEIGHT - 200;

    computer.interactive = true;
    shirtRack.interactive = true;
    printer.interactive = true;

    computer.on('click', function(event){
      inkyDestination = computer;
    });

    shirtRack.on('click', function(event){
      inkyDestination = shirtRack;
    });

    printer.on('click', function(event){
      inkyDestination = printer;
    });

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
    inky.anchor.x = 0.5;
    inky.anchor.y = 0.5;

    inky.x = INKY.WORLD_WIDTH / 2;
    inky.y = INKY.WORLD_HEIGHT / 2;

    world.addChild(inky);
  }

  var pulseOut = true;
  function animateInky(deltaTime){
    if(pulseOut){
      inky.scale.x += 0.5 * deltaTime;
      inky.scale.y += 0.5 * deltaTime;
      if(inky.scale.x > 1.10) pulseOut = false;
    } else{
      inky.scale.x -= 0.5 * deltaTime;
      inky.scale.y -= 0.5 * deltaTime;
      if(inky.scale.x < 0.95) pulseOut = true;
    }
  }

  function moveInky(deltaTime){
    var sprite = inkyDestination;
    if(inky.x < sprite.x - sprite.width / 2){
      inky.x += inkySpeed * deltaTime;
    } else if(inky.x > sprite.x + sprite.width / 2){
      inky.x -= inkySpeed * deltaTime;
    } else if(inky.y < sprite.y - sprite.height / 2){
      inky.y += inkySpeed * deltaTime;
    } else if(inky.y > sprite.y + sprite.height / 2){
      inky.y -= inkySpeed * deltaTime;
    }

    if((Math.abs(inky.x - sprite.x) <= (sprite.width / 2 + inky.width / 2 + 3)) &&
       (Math.abs(inky.y - sprite.y) <= (sprite.height / 2 + inky.height / 2 + 3))){
      inkyDestination = null;
    }
  }

  init();
};
