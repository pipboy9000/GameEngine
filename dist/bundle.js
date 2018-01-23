/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input__ = __webpack_require__(2);


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
  if (__WEBPACK_IMPORTED_MODULE_0__input__["a" /* default */].keyboard.ControlLeft) {
    setZoom(2);
  }

  if (!__WEBPACK_IMPORTED_MODULE_0__input__["a" /* default */].keyboard.ControlLeft) {
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

/* harmony default export */ __webpack_exports__["a"] = ({
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
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


function getLine(x1, y1, x2, y2) {
  var m = (y2 - y1) / (x2 - x1);
  var b = y1 - m * x1;
  var midX = x1 + (x2 - x1) / 2;
  var midY = y1 + (y2 - y1) / 2;
  var normal = {
    x: -(y2 - y1),
    y: x2 - x1
  };
  var vec = {
    x: x2 - x1,
    y: y2 - y1
  };
  normal = normalize(normal);
  return {
    x1,
    y1,
    x2,
    y2,
    m,
    b,
    normal,
    midX,
    midY,
    vec
  };
}

// x = (y-b) / m
function getX(line, y) {
  return y - line.b / line.m;
}

// y = mx + b
function getY(line, x) {
  return line.m * x + line.b;
}

function getOrthogonal(vec) {
  return {
    x: -vec.y,
    y: vec.x
  };
}

function normalize(vec) {
  var len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  if (len) {
    return {
      x: vec.x / len,
      y: vec.y / len
    };
  } else {
    return {
      x: 0,
      y: 0
    };
  }
}

function getVec(line) {
  return {
    x: line.x2 - line.x1,
    y: line.y2 - line.y1
  };
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function getProj(v1, v2) {
  var a = getVec(v1);
  var b = getVec(v2);
  var dp = dotProduct(a, b);
  var x = dp / (b.x * b.x + b.y * b.y) * b.x;
  var y = dp / (b.x * b.x + b.y * b.y) * b.y;

  //   var proj = getLine(v2.x1, v2.y1, v2.x1 + x, v2.y1 + y);
  var proj = getLine(0, 0, x, y);
  return proj;
}

function drawLine(line, color, width) {
  if (color) __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.strokeStyle = color;
  if (width) __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineWidth = width;
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.beginPath();
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.moveTo(line.x1, line.y1);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineTo(line.x2, line.y2);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.stroke();
}

function drawPoint(p, color, width) {
  if (color) __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.strokeStyle = color;
  if (width) __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineWidth = width;
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.beginPath();
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.stroke();
}

function drawVec(vec, x, y, line, color, width) {
  if (color) __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.strokeStyle = color;
  if (width) __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineWidth = width;
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.beginPath();
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.moveTo(x, y);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineTo(x + vec.x, y + vec.y);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.stroke();
}

function isAbove(line, x, y) {
  return getX(line, y) <= x;
}

function getIntersection(line1, line2) {
  //lines ar orthogonal
  if (line1.m === Infinity && line2.m === 0) {
    var l = line1;
    line1 = line2;
    line2 = l;
  }

  if (line1.m === 0 && line2.m === Infinity) {
    var intersectX = line2.x1;
    var intersectY = line1.y1;
    if (
      ((intersectY < line2.y2 && intersectY >= line2.y1) ||
        (intersectY > line2.y2 && intersectY <= line2.y1)) &&
      ((intersectX > line1.x1 && intersectX <= line1.x2) ||
        (intersectX < line1.x1 && intersectX >= line1.x2))
    ) {
      return {
        x: intersectX,
        y: intersectY
      };
    }
    return null;
  }

  if (line1.m === -Infinity && line2.m === 0) {
    var l = line1;
    line1 = line2;
    line2 = l;
  }

  if (line1.m === 0 && line2.m === -Infinity) {
    var intersectX = line2.x1;
    var intersectY = line1.y1;
    if (
      ((intersectY < line2.y2 && intersectY >= line2.y1) ||
        (intersectY > line2.y2 && intersectY <= line2.y1)) &&
      ((intersectX > line1.x1 && intersectX <= line1.x2) ||
        (intersectX < line1.x1 && intersectX >= line1.x2))
    ) {
      return {
        x: intersectX,
        y: intersectY
      };
    }
    return null;
  }
  
  var a1 = line1.y2 - line1.y1;
  var b1 = line1.x1 - line1.x2;
  var c1 = a1 * line1.x1 + b1 * line1.y1;

  var a2 = line2.y2 - line2.y1;
  var b2 = line2.x1 - line2.x2;
  var c2 = a2 * line2.x1 + b2 * line2.y1;

  var denominator = a1 * b2 - b1 * a2;
  if (denominator === 0) return false;

  var intersectX = (b2 * c1 - b1 * c2) / denominator;
  var intersectY = (a1 * c2 - a2 * c1) / denominator;

  if (
    ((intersectX >= line1.x1 && intersectX <= line1.x2) ||
      (intersectX <= line1.x1 && intersectX >= line1.x2)) &&
    ((intersectX >= line2.x1 && intersectX <= line2.x2) ||
      (intersectX <= line2.x1 && intersectX >= line2.x2))
  ) {
    return {
      x: intersectX,
      y: intersectY
    };
  }
  return null;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  getLine,
  drawLine,
  getIntersection,
  dotProduct,
  getVec,
  getProj,
  getOrthogonal,
  drawVec,
  normalize,
  getX,
  getY,
  isAbove,
  drawPoint
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


var keyboard = {};

var mouse = {
  x: 0,
  y: 0,
  left: false,
  right: false,
  middle: false
};

function getMousePos(evt) {
  var rect = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].canvas.getBoundingClientRect();
  var camPos = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getCamPos();
  mouse.x = (evt.clientX - rect.left + camPos.x - 300) / __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getZoom();
  mouse.y = (evt.clientY - rect.top + camPos.y - 300) / __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getZoom() ;
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
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].canvas.addEventListener(
    "mousemove",
    function(evt) {
      getMousePos(evt);
    },
    false
  );

  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].canvas.addEventListener("mousedown", mouseDown);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].canvas.addEventListener("mouseup", mouseUp);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].canvas.oncontextmenu = function(e) {
    e.preventDefault();
  };
}

init();

/* harmony default export */ __webpack_exports__["a"] = ({ keyboard, mouse });


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lines__ = __webpack_require__(1);



var wallsData = [
  {
    x1: 300,
    y1: 50,
    x2: 550,
    y2: 300
  },
  {
    x1: 550,
    y1: 300,
    x2: 300,
    y2: 550
  },
  {
    x1: 300,
    y1: 550,
    x2: 50,
    y2: 50
  },
  {
    x1: 50,
    y1: 50,
    x2: 300,
    y2: 50
  },
  {
    x1: 350,
    y1: 270,
    x2: 300,
    y2: 250
  },
  {
    x1: 300,
    y1: 250,
    x2: 250,
    y2: 300
  },
  {
    x1: 250,
    y1: 300,
    x2: 350,
    y2: 270
  }
];

var walls = [];

function checkCol(x, y, vx, vy, rad) {
  // var dp;
  var radSqr = rad * rad;
  var colLine;
  var n = __WEBPACK_IMPORTED_MODULE_1__lines__["a" /* default */].normalize({
    x: vx,
    y: vy
  }); //normalized vx,vy
  var colPoint;
  var colPoints = [];
  var res = { x: 0, y: 0 };

  //check walls first
  walls.forEach(wall => {
    colLine = __WEBPACK_IMPORTED_MODULE_1__lines__["a" /* default */].getLine(
      x,
      y,
      x + -wall.normal.x * rad,
      y + -wall.normal.y * rad
    );

    colPoint = __WEBPACK_IMPORTED_MODULE_1__lines__["a" /* default */].getIntersection(wall, colLine);
    if (colPoint) {
      __WEBPACK_IMPORTED_MODULE_1__lines__["a" /* default */].drawPoint(colPoint);
      var moveBackX = colPoint.x - colLine.x2;
      var moveBackY = colPoint.y - colLine.y2;
      colPoints.push({
        x: moveBackX,
        y: moveBackY
      });
    }
  });

  if (colPoints.length > 0) {
    colPoints.forEach(p => {
      res.x += p.x;
      res.y += p.y;
    });
    return res;
  }

  //check vertices
  walls.forEach(wall => {
    var dx = wall.x1 - x;
    var dy = wall.y1 - y;

    if (dx * dx + dy * dy <= radSqr) {
      __WEBPACK_IMPORTED_MODULE_1__lines__["a" /* default */].drawPoint({ x: wall.x1, y: wall.y1 }, "red", 3);
      var l = __WEBPACK_IMPORTED_MODULE_1__lines__["a" /* default */].normalize({ x: dx, y: dy });
      l.x *= rad;
      l.y *= rad;
      colPoints.push({
        x: dx - l.x,
        y: dy - l.y
      });
    }
  });

  if (colPoints.length > 0) {
    colPoints.forEach(p => {
      res.x += p.x;
      res.y += p.y;
    });
  }
  return res;
}

function draw() {
  walls.forEach(wall => {
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.beginPath();
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.strokeStyle = "orange";
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.moveTo(wall.x1, wall.y1);
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineTo(wall.x2, wall.y2);
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.stroke();

    //normal
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.beginPath();
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.moveTo(wall.midX, wall.midY);
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineTo(
      wall.midX + wall.normal.x * 20,
      wall.midY + wall.normal.y * 20
    );
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.stroke();
  });
}

function getWall(idx) {
  return walls[idx];
}

function getWalls() {
  return walls;
}

function init() {
  wallsData.forEach(wallData => {
    var wall = __WEBPACK_IMPORTED_MODULE_1__lines__["a" /* default */].getLine(
      wallData.x1,
      wallData.y1,
      wallData.x2,
      wallData.y2
    );
    walls.push(wall);
  });
}

init();

/* harmony default export */ __webpack_exports__["a"] = ({
  draw,
  checkCol,
  getWalls,
  getWall
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lines__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__level__ = __webpack_require__(3);






const FPS = 10;
var interval = 1000 / FPS;
var lastFrame = performance.now();

var line;

function gameLoop(time) {
  __WEBPACK_IMPORTED_MODULE_1__canvas__["a" /* default */].clearCanvas();

  //calculate delta time
  var dt = time - lastFrame;
  lastFrame = time;

  dt /= 16; //normalize

  __WEBPACK_IMPORTED_MODULE_3__player__["a" /* default */].move(dt);

  __WEBPACK_IMPORTED_MODULE_1__canvas__["a" /* default */].draw();
  __WEBPACK_IMPORTED_MODULE_4__level__["a" /* default */].draw();
  __WEBPACK_IMPORTED_MODULE_3__player__["a" /* default */].draw();

  var playerPos = __WEBPACK_IMPORTED_MODULE_3__player__["a" /* default */].getXY();

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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lines__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__level__ = __webpack_require__(3);





var x, y;
var vx, vy;
var pushVec;
var dir;
var rad;
var speed;
var acc = 1.5; //acceleration
var maxSpeed = 5;
var colVec;

function init() {
  x = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].canvas.width / 2;
  y = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].canvas.height / 2;
  vx = 0;
  vy = 0;
  rad = 30;
  speed = 0;
}

function getDir() {
  return Math.atan2(x - __WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */].mouse.x, y - __WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */].mouse.y);
}

function move(dt) {
  dir = getDir();

  var push = false;

  pushVec = {
    x: 0,
    y: 0
  };

  if (__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */].keyboard.KeyW) {
    pushVec.x += -Math.sin(dir);
    pushVec.y += -Math.cos(dir);
    push = true;
  }

  if (__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */].mouse.left) {
    pushVec.x += -Math.sin(dir);
    pushVec.y += -Math.cos(dir);
    push = true;
  }

  if (__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */].keyboard.KeyA) {
    pushVec.x += Math.sin(dir - Math.PI / 2);
    pushVec.y += Math.cos(dir - Math.PI / 2);
    push = true;
  }

  if (__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */].keyboard.KeyD) {
    pushVec.x += Math.sin(dir + Math.PI / 2);
    pushVec.y += Math.cos(dir + Math.PI / 2);
    push = true;
  }

  if (__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */].keyboard.KeyS) {
    pushVec.x += Math.sin(dir);
    pushVec.y += Math.cos(dir);
    push = true;
  }

  pushVec = __WEBPACK_IMPORTED_MODULE_2__lines__["a" /* default */].normalize(pushVec);

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

  var moveBack = __WEBPACK_IMPORTED_MODULE_3__level__["a" /* default */].checkCol(x, y, vx, vy, rad);
  if (moveBack) {
    x += moveBack.x;
    y += moveBack.y;
  }

  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].setCamPos(x, y);
}

function draw() {
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.beginPath();
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.strokeStyle = "green";
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineWidth = 3;
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.arc(x, y, rad, 0, Math.PI * 2);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.stroke();

  //mouse look
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.beginPath();
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.moveTo(x, y);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.strokeStyle = "white";
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineTo(x - Math.sin(dir) * rad, y - Math.cos(dir) * rad);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.stroke();

  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.beginPath();
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.moveTo(x, y);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.strokeStyle = "red";
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.lineTo(x, y);
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].ctx.stroke();
}

function getXY() {
  return { x, y };
}

init();

/* harmony default export */ __webpack_exports__["a"] = ({
  draw,
  move,
  getXY,
  colVec
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map