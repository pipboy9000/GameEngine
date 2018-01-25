import canvas from "./canvas";

var keyboard = {};

var mouse = {
  x: 0,
  y: 0,
  left: false,
  right: false,
  middle: false
};

function getMousePos(evt) {
  var rect = canvas.canvas.getBoundingClientRect();
  var camPos = canvas.getCamPos();
  var zoom = canvas.getZoom();
  mouse.x = (evt.clientX - rect.left - canvas.halfWidth) / zoom + camPos.x;
  mouse.y = (evt.clientY - rect.top - canvas.halfHeight) / zoom + camPos.y;
  console.log(mouse.x, mouse.y);
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

  canvas.canvas.addEventListener("mousedown", mouseDown);
  canvas.canvas.addEventListener("mouseup", mouseUp);
  canvas.canvas.oncontextmenu = function(e) {
    e.preventDefault();
  };
}

init();

export default { keyboard, mouse };
