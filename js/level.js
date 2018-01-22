import canvas from "./canvas";
import lines from "./lines";

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
    y2: 300
  },
  {
    x1: 50,
    y1: 300,
    x2: 300,
    y2: 50
  },
  {
    x1: 350,
    y1: 300,
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
    y2: 300
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

  //check walls
  walls.forEach(wall => {
    colLine = lines.getLine(
      x,
      y,
      x + -wall.normal.x * rad,
      y + -wall.normal.y * rad
    );

    // lines.drawLine(colLine, "orange", 2);
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

  //check vertices first
  walls.forEach(wall => {
    colLine = lines.getLine(x, y, wall.x1, wall.y1);

    var dx = wall.x1 - x;
    var dy = wall.y1 - y;

    if (dx * dx + dy * dy <= radSqr) {
      lines.drawPoint({x:wall.x1, y:wall.y1},'red');
      var l = lines.normalize(colLine.vec);
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
