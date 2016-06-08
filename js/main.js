TextureStash.init(run);

function run() {
  var MILLISECONDS_TO_SECONDS = 1000;
  var WORLD_WIDTH = 1024;
  var WORLD_HEIGHT = 1024;
  var ASPECT_RATIO = WORLD_WIDTH / WORLD_HEIGHT;

  var interface = new INKY.Interface();

  var canvasContainer = document.createElement('div');
  canvasContainer.className = 'inky-canvas';
  INKY.rootElement.appendChild(canvasContainer);

  var renderer = new PIXI.WebGLRenderer(canvasContainer.width, canvasContainer.height, {autoResize: true});
  canvasContainer.appendChild(renderer.view);

  var stage = new PIXI.Container();
  var face = new PIXI.Sprite(TextureStash.assets('assets/face.png'));
  face.anchor.x = 0.5;
  face.anchor.y = 0.5;
  face.position.x = 1280 / 2;
  face.position.y = 720 / 2;
  stage.addChild(face);

  window.onresize = function () {
    var resizedWidth = canvasContainer.height * ASPECT_RATIO;
    var scaling = canvasContainer.height / WORLD_HEIGHT;
    renderer.resize(resizedWidth, canvasContainer.height);
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
