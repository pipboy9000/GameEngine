import input from "./input";

var canvas;
var ctx;
var width, height;

var zoom = 1;
var targetZoom = 1;

var camPosX = 0;
var targetCamPosX = 0;

var camPosY = 0;
var targetCamPosY = 0;

function init() {
  console.log("init canvas");
  canvas = document.getElementById("canvas");
  width = canvas.width;
  height = canvas.height;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.strokeStyle = "#ff0000";
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
}

function draw() {
  if (input.keyboard.ControlLeft) {
    setZoom(2);
  }

  if (!input.keyboard.ControlLeft) {
    setZoom(1);
  }

  zoom += (targetZoom - zoom) / 10;
  camPosX += (targetCamPosX - camPosX) / 10;
  camPosY += (targetCamPosY - camPosY) / 10;

  ctx.setTransform(zoom, 0, 0, zoom, -camPosX + 300, -camPosY + 300);
}

function setZoom(z) {
  targetZoom = z;
}

function getZoom() {
  return zoom;
}

function setCamPos(x, y) {
  targetCamPosX = x;
  targetCamPosY = y;
}

function getCamPos() {
  return { x: camPosX, y: camPosY };
}

init();

export default {
  canvas,
  ctx,
  width,
  height,
  clearCanvas,
  draw,
  setZoom,
  getZoom,
  getCamPos,
  setCamPos,
  camPosX,
  camPosY
};
