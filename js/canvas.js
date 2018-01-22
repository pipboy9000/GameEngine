var canvas;
var ctx;
var width, height;

function init() {
    console.log('init canvas');
    canvas = document.getElementById('canvas');
    width = canvas.width;
    height = canvas.height;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.strokeStyle = '#ff0000';
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
}

init();

export default { canvas, ctx, width, height, clearCanvas }