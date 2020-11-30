function random(min, max) {
    return Math.floor(Math.random() * max-min) + min;
}

function makeTile(ctx, data) {
    ctx.beginPath();
    ctx.fillStyle = "#b3b3b3";
    ctx.strokeStyle = "#808080";
    ctx.moveTo(data[0]+100, data[1]);
    ctx.lineTo(data[0]+115, data[1]+15);
    ctx.lineTo(data[0]+115, data[1]+165);
    ctx.lineTo(data[0]+100, data[1]+150);
    ctx.lineTo(data[0] + 100, data[1]);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#999999";
    ctx.strokeStyle = "#808080";
    ctx.moveTo(data[0], data[1]+150);
    ctx.lineTo(data[0]+100, data[1]+150);
    ctx.lineTo(data[0]+115, data[1]+165);
    ctx.lineTo(data[0]+15, data[1]+165);
    ctx.lineTo(data[0], data[1] + 150);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#cccccc";
    ctx.strokeStyle = "#666666";
    ctx.rect(data[0], data[1], 100, 150);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.font = "70px Arial";
    ctx.fillStyle = data[3];
    ctx.textAlign = "center";
    ctx.fillText(data[2], data[0] + 50, data[1] + 105);
}

var main = document.getElementById("main");
var ctx = main.getContext("2d");

main.width = window.innerWidth
main.height = window.innerHeight

var move = document.getElementById("move");
var moveCTX = move.getContext("2d");

move.width = window.innerWidth
move.height = window.innerHeight

var tiles = []
var currentTile;
var clicked = false;

var colors = ['yellow', 'blue', 'red', 'black']

for (let i = 0; i < 3; i++) {
    tiles.push([random(0, window.innerWidth-100), random(0, window.innerHeight-150), random(1, 13), colors[random(0, 4)], 0, 0]) // x, y, num, color, offsetX, offsetY
}

tiles.forEach(function (tile) {
    makeTile(ctx, tile)
})

function moveHandler (e) {
    console.log('move')
    let x = e.pageX - move.offsetLeft
    let y = e.pageY - move.offsetTop

    let tile = tiles[currentTile]

    moveCTX.clearRect(0, 0, move.clientWidth, move.clientHeight)

    tile[0] = x - tile[4]
    tile[1] = y - tile[5]
    console.log(tile)
    makeTile(moveCTX, tile)
}

document.addEventListener('mousedown', function (e) {
    console.log('down')
    tiles.forEach(function (tile, index) {
        if (e.clientX >= tile[0] && e.clientX <= tile[0] + 115 && e.clientY >= tile[1] && e.clientY <= tile[1] + 165) {
            tile[4] = e.clientX - tile[0]
            tile[5] = e.clientY - tile[1]

            ctx.clearRect(tile[0] - 5, tile[1] - 5, 125, 175)

            currentTile = index

            tiles.forEach(function (tile, index) {
                if (tiles[currentTile][0] >= tile[0] - 230 && tiles[currentTile][0] <= tile[0] + 230 && tiles[currentTile][1] >= tile[1] - 330 && tiles[currentTile][1] <= tile[1] + 330 && index != currentTile) {
                    makeTile(ctx, tile)
                }
            })

            document.addEventListener('mousemove', moveHandler)

            makeTile(moveCTX, tile)
        }
    })
})

document.addEventListener('mouseup', function () {
    console.log('mouseup')

    document.removeEventListener('mousemove', moveHandler)

    moveCTX.clearRect(0, 0, move.clientWidth, move.clientHeight)
    makeTile(ctx, tiles[currentTile])
})

document.addEventListener('touchstart', function (e) {
    tiles.forEach(function (tile, index) {
        let x = e.pageX - move.offsetLeft
        let y = e.pageY - move.offsetTop
        if (x >= tile[0] && x <= tile[0] + 115 && y >= tile[1] && y <= tile[1] + 165) {
            console.log('down')
            tile[4] = x - tile[0]
            tile[5] = y - tile[1]

            ctx.clearRect(tile[0] - 5, tile[1] - 5, 125, 175)

            currentTile = index

            tiles.forEach(function (tile, index) {
                if (tiles[currentTile][0] >= tile[0] - 230 && tiles[currentTile][0] <= tile[0] + 230 && tiles[currentTile][1] >= tile[1] - 330 && tiles[currentTile][1] <= tile[1] + 330 && index != currentTile) {
                    makeTile(ctx, tile)
                }
            })

            document.addEventListener('touchmove', moveHandler)

            makeTile(moveCTX, tile)
        }
    })
})

document.addEventListener('touchend', function () {
    console.log('mouseup')

    document.removeEventListener('touchmove', moveHandler)

    moveCTX.clearRect(0, 0, move.clientWidth, move.clientHeight)

    makeTile(ctx, tiles[currentTile])
})