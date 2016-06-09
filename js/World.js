(function () {
  INKY.World = function () {
    var world = new PIXI.Container();
    var inky = null;
    var shirtRack = null;
    var printer = null;
    var inkyDestination = null;
    var inkySpeed = 400; // 300px per second
    var customers = [];
    var holdingShirt = null;
    var toAdd = null;

    world.width = INKY.WORLD_WIDTH;
    world.height = INKY.WORLD_HEIGHT;
    this.container = world;
    this.rackHandler = function(props){
      console.log(props);
      holdingShirt = new INKY.Shirt(props);
      holdingShirt.render();
      holdingShirt = holdingShirt.container;
      holdingShirt.width = 80;
      holdingShirt.height = 80;
      holdingShirt.scale.x = 0.5;
      holdingShirt.scale.y = 0.5;
      holdingShirt.anchor = {x: 0.5, y: 0.5};
      holdingShirt.x = inky.x;
      holdingShirt.y = inky.y + inky.height;
      toAdd = holdingShirt;
    };
    this.printerHandler = function(){
      alert('hi printer');
    };

    this.update = function (deltaTime) {
      if(toAdd){
        world.addChild(toAdd);
        toAdd = null;
      }
      printer.update(deltaTime);
      shirtRack.update(deltaTime);
      animateInky(deltaTime);
      if (inkyDestination) moveInky(deltaTime);
      customers.forEach(function (customer) {
        customer.update(deltaTime);
      })
    };

    function init() {
      createBackground();
      createStations();
      createInky();
      createCustomer();
    }

    function createBackground() {
      var background = new INKY.Background();
      world.addChild(background);
    }

    function createStations() {
      shirtRack = new INKY.Station('cloths.png', 150, 300);
      printer = new INKY.Station('screenprinter.png', INKY.WORLD_WIDTH - 150, 300);

      shirtRack.on('click', (function(){
        inkyDestination = shirtRack;
      }).bind(this));

      printer.on('click', (function(){
        inkyDestination = printer;
      }).bind(this));

      world.addChild(shirtRack);
      world.addChild(printer);
    }

    function createInky() {
      inky = new PIXI.Sprite(INKY.TextureStash.assets('inky.png'));

      inky.width = 100;
      inky.height = 100;
      inky.anchor.x = 0.5;
      inky.anchor.y = 0.5;

      inky.x = INKY.WORLD_WIDTH / 2;
      inky.y = INKY.WORLD_HEIGHT / 2;

      world.addChild(inky);
    }

    var pulseOut = true;

    function animateInky(deltaTime) {
      if (pulseOut) {
        inky.scale.x += 0.5 * deltaTime;
        inky.scale.y += 0.5 * deltaTime;
        if (inky.scale.x > 1.10) pulseOut = false;
      } else {
        inky.scale.x -= 0.5 * deltaTime;
        inky.scale.y -= 0.5 * deltaTime;
        if (inky.scale.x < 0.95) pulseOut = true;
      }
    }

    function moveInky(deltaTime) {
      var sprite = inkyDestination;
      if (inky.x < sprite.x - sprite.width / 2) {
        inky.x += inkySpeed * deltaTime;
      } else if (inky.x > sprite.x + sprite.width / 2) {
        inky.x -= inkySpeed * deltaTime;
      }
      if (inky.y < sprite.y - sprite.height / 2) {
        inky.y += inkySpeed * deltaTime;
      } else if (inky.y > sprite.y + sprite.height / 2) {
        inky.y -= inkySpeed * deltaTime;
      }

      if ((Math.abs(inky.x - sprite.x) <= (sprite.width / 2 + inky.width / 2 + 3)) &&
        ((Math.abs(inky.y - sprite.y) <= (sprite.height / 2 + 3)) || inky.y > 680)) {
        if(inkyDestination == shirtRack){
          setTimeout(function(){INKY.ui.activate('rack')}, 100);
        }else if(inkyDestination == printer){
          setTimeout(function(){INKY.ui.activate('printer')}, 100);
        }
        inkyDestination = null;
      }

      if(holdingShirt) {
        holdingShirt.x = inky.x;
        holdingShirt.y = inky.y + inky.height;
      }
    }

    function createCustomer() {
      var customer = new INKY.Person();

      customer.x = INKY.WORLD_WIDTH * 0.75;
      customer.y = INKY.WORLD_HEIGHT - 140;
      customer.anchor = {x: 0.5, y: 0.5};
      customer.scale = {x: 0.5, y: 0.5};
      world.addChild(customer);
      customer.on('click', (function(){
        inkyDestination = customer;
      }).bind(this));

      customers.push(customer);
    }

    init();
    INKY.world = this;
  };
}());
