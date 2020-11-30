function makeTile(ctx, x, y, num, color) {
    ctx.beginPath();
    ctx.fillStyle = "#b3b3b3";
    ctx.strokeStyle = "#808080";
    ctx.moveTo(x+100, y);
    ctx.lineTo(x+115, y+15);
    ctx.lineTo(x+115, y+165);
    ctx.lineTo(x+100, y+150);
    ctx.lineTo(x + 100, y);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#999999";
    ctx.strokeStyle = "#808080";
    ctx.moveTo(x, y+150);
    ctx.lineTo(x+100, y+150);
    ctx.lineTo(x+115, y+165);
    ctx.lineTo(x+15, y+165);
    ctx.lineTo(x, y + 150);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#cccccc";
    ctx.strokeStyle = "#666666";
    ctx.rect(x, y, 100, 150);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.font = "70px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(num, x + 50, y + 105);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

makeTile(ctx, 10, 10, 1, 'blue')
makeTile(ctx, 110, 10, 1, 'red')

makeTile(ctx, 10, 185, 12, 'black')
makeTile(ctx, 110, 185, 13, 'black')