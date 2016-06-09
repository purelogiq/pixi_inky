TextureStash.init(run);

function run() {
  var world = new INKY.World();
  var ui = new INKY.Interface();
  var canvasContainer = document.createElement('div');
  var renderer = new PIXI.autoDetectRenderer(INKY.WORLD_WIDTH, INKY.WORLD_HEIGHT);
  var resizeTimeout;

  function scaleToFit () {
    var rootElement = INKY.ROOT_ELEMENT;
    var bodyRect = document.body.getBoundingClientRect();
    var canvasRect = canvasContainer.getBoundingClientRect();
    var combinedAspect = INKY.ASPECT_RATIO + INKY.UI_ASPECT_RATIO;
    var scale;

    bodyRect = {
      height: bodyRect.height * 0.9,
      width: bodyRect.width * 0.9
    };

    if (bodyRect.width / bodyRect.height >= combinedAspect) {
      // Use height to determine layout dimensions
      rootElement.style.height = bodyRect.height + 'px';
      rootElement.style.width = bodyRect.height * combinedAspect + 'px';
    } else {
      // Use width to determine layout dimensions
      rootElement.style.height = bodyRect.width / combinedAspect + 'px';
      rootElement.style.width = bodyRect.width + 'px';
    }

    renderer.resize(
      canvasRect.width,
      canvasRect.height
    );
    scaling = canvasRect.width / INKY.WORLD_WIDTH;
    world.container.scale.x = scaling;
    world.container.scale.y = scaling;
  }

  INKY.ROOT_ELEMENT.appendChild(ui.element);
  INKY.ROOT_ELEMENT.appendChild(canvasContainer);
  canvasContainer.className = 'inky-canvas';
  canvasContainer.appendChild(renderer.view);
  scaleToFit();
  scaleToFit();
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(scaleToFit, 50);
  });

  ui.activate('rack');

  var lastTime = 0;
  function animate(){
    requestAnimationFrame(animate);
    var now = performance.now();
    var deltaTime = (now - lastTime) / INKY.MILLISECONDS_TO_SECONDS;
    lastTime = now;
    world.update(deltaTime);
    renderer.render(world.container);
  }

  animate();
}
