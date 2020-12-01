function random(min, max) {
    return Math.floor(Math.random() * max-min) + min;
}

class Rummikub {
    constructor (main, move) {  
        this.main = main
        this.ctx = main.getContext('2d')

        this.move = move
        this.moveCTX = move.getContext('2d')

        main.width = window.innerWidth
        main.height = window.innerHeight

        move.width = window.innerWidth
        move.height = window.innerHeight

        let colors = ['yellow', 'blue', 'red', 'black']
        this.currentTile = 0

        this.tiles = []
        for (let i = 0; i < 3; i++) {
            this.tiles.push([random(0, window.innerWidth - 100), random(0, window.innerHeight - 150), random(1, 13), colors[random(0, 4)], 0, 0]) // x, y, num, color, offsetX, offsetY
        }

        this.tiles.forEach(function (tile) {
            this.makeTile(this.ctx, tile)
        }.bind(this))

        document.addEventListener('mousedown', function (e) {
            console.log('down')
            let x = e.pageX - this.move.offsetLeft
            let y = e.pageY - this.move.offsetTop

            this.tiles.forEach(function (tile, index) {
                if (x >= tile[0] && x <= tile[0] + 115 && y >= tile[1] && y <= tile[1] + 165) {
                    tile[4] = x - tile[0]
                    tile[5] = y - tile[1]

                    this.ctx.clearRect(tile[0] - 5, tile[1] - 5, 125, 175)

                    this.currentTile = index

                    this.tiles.forEach(function (tile, index) {
                        if (this.tiles[this.currentTile][0] >= tile[0] - 230 && this.tiles[this.currentTile][0] <= tile[0] + 230 && this.tiles[this.currentTile][1] >= tile[1] - 330 && this.tiles[this.currentTile][1] <= tile[1] + 330 && index != this.currentTile) {
                            this.makeTile(this.ctx, tile)
                        }
                    }.bind(this))

                    document.addEventListener('mousemove', this.moveHandler)

                    this.makeTile(this.moveCTX, tile)
                }
            }.bind(this))
        }.bind(this))

        document.addEventListener('mouseup', function () {
            console.log('mouseup')

            document.removeEventListener('mousemove', this.moveHandler)

            this.moveCTX.clearRect(0, 0, this.move.clientWidth, this.move.clientHeight)
            this.makeTile(this.ctx, this.tiles[this.currentTile])
        }.bind(this))

        document.addEventListener('mousedown', function (e) {
            console.log('down')
            let x = e.pageX - this.move.offsetLeft
            let y = e.pageY - this.move.offsetTop

            this.tiles.forEach(function (tile, index) {
                if (x >= tile[0] && x <= tile[0] + 115 && y >= tile[1] && y <= tile[1] + 165) {
                    tile[4] = x - tile[0]
                    tile[5] = y - tile[1]

                    this.ctx.clearRect(tile[0] - 5, tile[1] - 5, 125, 175)

                    this.currentTile = index

                    this.tiles.forEach(function (tile, index) {
                        if (this.tiles[this.currentTile][0] >= tile[0] - 230 && this.tiles[this.currentTile][0] <= tile[0] + 230 && this.tiles[this.currentTile][1] >= tile[1] - 330 && this.tiles[this.currentTile][1] <= tile[1] + 330 && index != this.currentTile) {
                            this.makeTile(this.ctx, tile)
                        }
                    }.bind(this))

                    document.addEventListener('mousemove', this.moveHandler)

                    this.makeTile(this.moveCTX, tile)
                }
            }.bind(this))
        }.bind(this))

        document.addEventListener('mouseup', function () {
            console.log('mouseup')

            document.removeEventListener('mousemove', this.moveHandler)

            this.moveCTX.clearRect(0, 0, this.move.clientWidth, this.move.clientHeight)
            this.makeTile(this.ctx, this.tiles[this.currentTile])
        }.bind(this))

        this.moveHandler = function (e) {
            let x = e.pageX - this.move.offsetLeft
            let y = e.pageY - this.move.offsetTop

            let tile = this.tiles[this.currentTile]

            this.moveCTX.clearRect(0, 0, this.move.clientWidth, this.move.clientHeight)

            tile[0] = x - tile[4]
            tile[1] = y - tile[5]
            this.makeTile(this.moveCTX, tile)
        }.bind(this)
    }

    makeTile(ctx, data) {
        ctx.beginPath();
        ctx.fillStyle = "#b3b3b3";
        ctx.strokeStyle = "#808080";
        ctx.moveTo(data[0] + 100, data[1]);
        ctx.lineTo(data[0] + 115, data[1] + 15);
        ctx.lineTo(data[0] + 115, data[1] + 165);
        ctx.lineTo(data[0] + 100, data[1] + 150);
        ctx.lineTo(data[0] + 100, data[1]);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#999999";
        ctx.strokeStyle = "#808080";
        ctx.moveTo(data[0], data[1] + 150);
        ctx.lineTo(data[0] + 100, data[1] + 150);
        ctx.lineTo(data[0] + 115, data[1] + 165);
        ctx.lineTo(data[0] + 15, data[1] + 165);
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
}

rummikub = new Rummikub(document.querySelector('#main'), document.querySelector('#move'))