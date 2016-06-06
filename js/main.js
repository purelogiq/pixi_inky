var MILLISECONDS_TO_SECONDS = 1000;
var WORLD_WIDTH = 1280;
var WORLD_HEIGHT = 720;
var ASPECT_RATIO = WORLD_WIDTH / WORLD_HEIGHT;

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {autoResize: true});

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var texture = PIXI.Texture.fromImage("assets/face.png");
var face = new PIXI.Sprite(texture);
face.anchor.x = 0.5;
face.anchor.y = 0.5;
face.position.x = 1280 / 2;
face.position.y = 720 / 2;
stage.addChild(face);

window.onresize = function(){
    var resizedWidth = window.innerHeight * ASPECT_RATIO;
    var scaling = window.innerHeight / WORLD_HEIGHT;
    renderer.resize(resizedWidth, window.innerHeight);
    stage.scale.x = scaling;
    stage.scale.y = scaling;
};

function animate(){
    requestAnimationFrame(animate);
    face.rotation += 0.1;
    renderer.render(stage);
    logPerformance();
}


var numFrames = 0;
var totalSeconds = 0;
var lastTime = 0;
var now, frameTime;
function logPerformance(){
    numFrames += 1;
    now = performance.now();
    frameTime = (now - lastTime) / MILLISECONDS_TO_SECONDS;
    totalSeconds += frameTime;
    lastTime = now;
    if(numFrames % 60 == 0){
        console.log('Current Time: ' + now);
        console.log('Total Seconds: ' + totalSeconds);
        console.log('Frametime: ' + frameTime);
        console.log('Frametime FPS: ' + 1 / frameTime);
        console.log('Avg FPS: ' + (numFrames / totalSeconds));
        console.log('-----------------------');
    }
}

animate();