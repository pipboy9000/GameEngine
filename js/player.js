import canvas from "./canvas";
import input from "./input";
import lines from "./lines";
import level from "./level";

var x, y;
var vx, vy;
var pushVec;
var dir;
var rad;
var radSqr;
var speed;
var acc = 1.5; //acceleration
var maxSpeed = 5;
var colVec;

function init() {
  x = canvas.canvas.width / 2;
  y = canvas.canvas.height / 2;
  vx = 0;
  vy = 0;
  rad = 30;
  radSqr = 900;
  speed = 0;
}

function getDir() {
  return Math.atan2(x - input.mouse.x, y - input.mouse.y);
}

function move(dt) {
  dir = getDir();

  var push = false;

  pushVec = {
    x: 0,
    y: 0
  };

  if (input.keyboard.KeyW || input.mouse.left) {
    if (
      (x - input.mouse.x) * (x - input.mouse.x) +
        (y - input.mouse.y) * (y - input.mouse.y) >
      radSqr
    ) {
      pushVec.x += -Math.sin(dir);
      pushVec.y += -Math.cos(dir);
      push = true;
    }
  }

  if (input.keyboard.KeyA) {
    pushVec.x += Math.sin(dir - Math.PI / 2);
    pushVec.y += Math.cos(dir - Math.PI / 2);
    push = true;
  }

  if (input.keyboard.KeyD) {
    pushVec.x += Math.sin(dir + Math.PI / 2);
    pushVec.y += Math.cos(dir + Math.PI / 2);
    push = true;
  }

  if (input.keyboard.KeyS) {
    pushVec.x += Math.sin(dir);
    pushVec.y += Math.cos(dir);
    push = true;
  }

  pushVec = lines.normalize(pushVec);

  if (push) {
    vx += pushVec.x * acc;
    vy += pushVec.y * acc;
  } else {
    if (Math.abs(vx) < 0.1) vx = 0;
    if (Math.abs(vy) < 0.1) vy = 0;
  }

  vx *= dt;
  vy *= dt;

  vx *= 0.857;
  vy *= 0.857;

  x += vx;
  y += vy;

  var moveBack = level.checkCol(x, y, vx, vy, rad);
  var iterations = 0;
  while ((moveBack.x != 0 || moveBack.y != 0) && iterations < 10) {
    iterations++;
    if (moveBack) {
      x += moveBack.x;
      y += moveBack.y;
    }
    moveBack = level.checkCol(x, y, moveBack.x, moveBack.y, rad);
  }

  canvas.setCamPos(x, y);
}

function draw() {
  canvas.ctx.beginPath();
  canvas.ctx.strokeStyle = "green";
  canvas.ctx.lineWidth = 3;
  canvas.ctx.arc(x, y, rad, 0, Math.PI * 2);
  canvas.ctx.stroke();

  //mouse look
  canvas.ctx.beginPath();
  canvas.ctx.moveTo(x, y);
  canvas.ctx.strokeStyle = "white";
  canvas.ctx.lineTo(x - Math.sin(dir) * rad, y - Math.cos(dir) * rad);
  canvas.ctx.stroke();

  canvas.ctx.beginPath();
  canvas.ctx.moveTo(x, y);
  canvas.ctx.strokeStyle = "red";
  canvas.ctx.lineTo(x, y);
  canvas.ctx.stroke();
}

function getXY() {
  return { x, y };
}

init();

export default {
  draw,
  move,
  getXY,
  colVec
};
