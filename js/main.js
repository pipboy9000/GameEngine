import input from "./input";
import canvas from "./canvas";
import lines from "./lines";
import player from "./player";
import level from "./level";

const FPS = 10;
var interval = 1000 / FPS;
var lastFrame = performance.now();

var line;

function gameLoop(time) {
  canvas.clearCanvas();

  //calculate delta time
  var dt = time - lastFrame;
  lastFrame = time;

  dt /= 16; //normalize

  player.move(dt);

  level.draw();
  player.draw();

  var playerPos = player.getXY();

  // var testLine = lines.getLine(
  //   playerPos.x,
  //   playerPos.y,
  //   input.mouse.x,
  //   input.mouse.y
  // );

  // lines.drawLine(testLine, "purple");

  window.requestAnimationFrame(gameLoop);
}

function init() {
  gameLoop(performance.now());
}

function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(init);
