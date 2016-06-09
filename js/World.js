(function () {
  INKY.World = function () {
    var world = new PIXI.Container();
    var inky = null;
    var shirtRack = null;
    var printer = null;
    var inkyDestination = null;
    var inkySpeed = 300; // 300px per second
    var customers = [];

    world.width = INKY.WORLD_WIDTH;
    world.height = INKY.WORLD_HEIGHT;
    this.container = world;

    this.update = function (deltaTime) {
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
      shirtRack = new INKY.Station('face.png', 100, 215);
      printer = new INKY.Station('face.png', INKY.WORLD_WIDTH, INKY.WORLD_HEIGHT);

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
      } else if (inky.y < sprite.y - sprite.height / 2) {
        inky.y += inkySpeed * deltaTime;
      } else if (inky.y > sprite.y + sprite.height / 2) {
        inky.y -= inkySpeed * deltaTime;
      }

      if ((Math.abs(inky.x - sprite.x) <= (sprite.width / 2 + inky.width / 2 + 3)) &&
        (Math.abs(inky.y - sprite.y) <= (sprite.height / 2 + inky.height / 2 + 3))) {
        inkyDestination = null;
      }
    }

    function createCustomer() {
      var customer = new INKY.Person();

      customer.x = INKY.WORLD_WIDTH * 0.75;
      customer.y = INKY.WORLD_HEIGHT * 0.5;
      customer.anchor = {x: 0.5, y: 0.5};
      customer.scale = {x: 0.65, y: 0.65};
      world.addChild(customer);

      customers.push(customer);
    }

    init();
  };
}());
