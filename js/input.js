import canvas from "./canvas";

var lastWorldX = 0;
var lastWorldY = 0;
var lastLeftClickTime = null;
var clearDoubleClick = false;

var keyboard = {};

var mouse = {
  x: 0,
  y: 0,
  dWorldX: 0,
  dWorldY: 0,
  worldX: 0,
  worldY: 0,
  left: false,
  right: false,
  middle: false,
  wheel: 0,
  doubleClick: false
};

function move() {
  mouse.dWorldX = mouse.worldX - lastWorldX;
  mouse.dWorldY = mouse.worldY - lastWorldY;
  lastWorldX = mouse.worldX;
  lastWorldY = mouse.worldY;

  if(clearDoubleClick){
    clearDoubleClick = false;
      mouse.doubleClick = false;
  }

  if(mouse.doubleClick){
      clearDoubleClick = true;
  }
  requestAnimationFrame(move);
}

function getMousePos(evt) {
  var rect = canvas.canvas.getBoundingClientRect();
  var camPos = canvas.getCamPos();
  var zoom = canvas.getZoom();
  mouse.worldX = (evt.clientX - rect.left - canvas.halfWidth) / zoom + camPos.x;
  mouse.worldY = (evt.clientY - rect.top - canvas.halfHeight) / zoom + camPos.y;
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
}

function clearMouseWheel() {
  mouse.wheel = 0;
}

function getMouseWheel(evt) {
  var delta = Math.max(-1, Math.min(1, evt.wheelDelta || -evt.detail));
  mouse.wheel = delta;
  requestAnimationFrame(clearMouseWheel);
}

function mouseDown(evt) {
  switch (evt.button) {
    case 0:
      mouse.left = true;
      break;

    case 1:
      mouse.middle = true;
      break;

    case 2:
      mouse.right = true;
  }
  return true;
}

function mouseUp(evt) {
  switch (evt.button) {
    case 0:
      mouse.left = false;
      break;

    case 1:
      mouse.middle = false;
      break;

    case 2:
      mouse.right = false;
  }
  return false;
}

function init() {
  console.log("init input");
  document.addEventListener("keydown", function(event) {
    keyboard[event.code] = true;
  });

  document.addEventListener("keyup", function(event) {
    keyboard[event.code] = false;
  });

  //mouse
  canvas.canvas.addEventListener(
    "mousemove",
    function(evt) {
      getMousePos(evt);
    },
    false
  );

  canvas.canvas.addEventListener(
    "mousewheel",
    function(evt) {
      getMouseWheel(evt);
    },
    false
  );

  canvas.canvas.addEventListener("dblclick", function() {
    mouse.doubleClick = true;
  });

  canvas.canvas.addEventListener("mousedown", mouseDown);
  canvas.canvas.addEventListener("mouseup", mouseUp);
  canvas.canvas.oncontextmenu = function(e) {
    e.preventDefault();
  };
  move();
}

init();

export default { keyboard, mouse };
