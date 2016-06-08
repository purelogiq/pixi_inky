TextureStash.init(run);

function run() {
  var MILLISECONDS_TO_SECONDS = 1000;
  var WORLD_WIDTH = 1024;
  var WORLD_HEIGHT = 1024;

  var interface = new INKY.Interface();

  var canvasContainer = document.createElement('div');
  canvasContainer.className = 'inky-canvas';

  INKY.ROOT_ELEMENT.appendChild(interface.element);
  INKY.ROOT_ELEMENT.appendChild(canvasContainer);

  var initialCanvasRect = canvasContainer.getBoundingClientRect();
  var renderer = new PIXI.WebGLRenderer(initialCanvasRect.width, initialCanvasRect.height, {autoResize: true});
  canvasContainer.appendChild(renderer.view);

  var stage = new PIXI.Container();
  var face = new PIXI.Sprite(TextureStash.assets('assets/face.png'));
  face.anchor.x = 0.5;
  face.anchor.y = 0.5;
  face.position.x = 500 / 2;
  face.position.y = 500 / 2;
  stage.addChild(face);

  window.onresize = function () {
    var canvasRect = canvasContainer.getBoundingClientRect();
    var smallestSideProp = canvasRect.height < canvasRect.width ? 'height' : 'width';
    var scaling = canvasRect[smallestSideProp] / initialCanvasRect[smallestSideProp];
    renderer.resize(canvasRect.width, canvasRect.height);
    stage.scale.x = scaling;
    stage.scale.y = scaling;
  };

  function animate() {
    requestAnimationFrame(animate);
    face.rotation += 0.1;
    renderer.render(stage);
    logPerformance();
  }


  var enableLog = false;
  var numFrames = 0;
  var totalSeconds = 0;
  var lastTime = 0;
  var now, frameTime;

  function logPerformance() {
    if(!enableLog) return;
    numFrames += 1;
    now = performance.now();
    frameTime = (now - lastTime) / MILLISECONDS_TO_SECONDS;
    totalSeconds += frameTime;
    lastTime = now;
    if (numFrames % 60 == 0) {
      console.log('Current Time: ' + now);
      console.log('Total Seconds: ' + totalSeconds);
      console.log('Frametime: ' + frameTime);
      console.log('Frametime FPS: ' + 1 / frameTime);
      console.log('Avg FPS: ' + (numFrames / totalSeconds));
      console.log('-----------------------');
    }
  }
  animate();
}
