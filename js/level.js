import canvas from "./canvas";
import lines from "./lines";

var wallsData = [
  {
    x1: 600,
    y1: 100,
    x2: 1100,
    y2: 600
  },
  {
    x1: 1100,
    y1: 600,
    x2: 600,
    y2: 1100
  },
  {
    x1: 600,
    y1: 1100,
    x2: 100,
    y2: 100
  },
  {
    x1: 100,
    y1: 100,
    x2: 600,
    y2: 100
  },
  {
    x1: 700,
    y1: 540,
    x2: 600,
    y2: 500
  },
  {
    x1: 600,
    y1: 500,
    x2: 500,
    y2: 600
  },
  {
    x1: 500,
    y1: 600,
    x2: 700,
    y2: 540
  }
];

var walls = [];

function checkCol(x, y, vx, vy, rad) {
  // var dp;
  var radSqr = rad * rad;
  var colLine;
  var n = lines.normalize({
    x: vx,
    y: vy
  }); //normalized vx,vy
  var colPoint;
  var colPoints = [];
  var res = { x: 0, y: 0 };

  //check walls first
  walls.forEach(wall => {
    colLine = lines.getLine(
      x,
      y,
      x + -wall.normal.x * rad,
      y + -wall.normal.y * rad
    );

    colPoint = lines.getIntersection(wall, colLine);
    if (colPoint) {
      lines.drawPoint(colPoint);
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
      lines.drawPoint({ x: wall.x1, y: wall.y1 }, "red", 3);
      var l = lines.normalize({ x: dx, y: dy });
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
    canvas.ctx.beginPath();
    canvas.ctx.strokeStyle = "orange";
    canvas.ctx.moveTo(wall.x1, wall.y1);
    canvas.ctx.lineTo(wall.x2, wall.y2);
    canvas.ctx.stroke();

    //normal
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(wall.midX, wall.midY);
    canvas.ctx.lineTo(
      wall.midX + wall.normal.x * 20,
      wall.midY + wall.normal.y * 20
    );
    canvas.ctx.stroke();
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
    var wall = lines.getLine(
      wallData.x1,
      wallData.y1,
      wallData.x2,
      wallData.y2
    );
    walls.push(wall);
  });
}

init();

export default {
  draw,
  checkCol,
  getWalls,
  getWall
};
