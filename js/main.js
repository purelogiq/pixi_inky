TextureStash.init(run);

function run() {
  var world = new INKY.World();
  var ui = new INKY.Interface();

  ui.activate('rack');

  var canvasContainer = document.createElement('div');
  canvasContainer.className = 'inky-canvas';

  INKY.ROOT_ELEMENT.appendChild(ui.element);
  INKY.ROOT_ELEMENT.appendChild(canvasContainer);

  var initialCanvasRect = canvasContainer.getBoundingClientRect();
  var renderer = new PIXI.WebGLRenderer(initialCanvasRect.width, initialCanvasRect.height);
  canvasContainer.appendChild(renderer.view);

  window.onresize = function(){
    canvasRect = canvasContainer.getBoundingClientRect();

    var scaling;
    if (canvasRect.height < canvasRect.width) {
      renderer.resize(
        canvasRect.height * INKY.ASPECT_RATIO,
        canvasRect.height
      );
      scaling = canvasRect.height / INKY.WORLD_HEIGHT;
    } else {
      renderer.resize(
        canvasRect.width,
        canvasRect.width / INKY.ASPECT_RATIO
      );
      scaling = canvasRect.width / INKY.WORLD_WIDTH;
    }

    world.container.scale.x = scaling;
    world.container.scale.y = scaling;
  };

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
