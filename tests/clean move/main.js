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
            this.tiles.push([random(0, window.innerWidth - 100), random(0, window.innerHeight - 150), random(1, 13), colors[random(0, 4)], 0, 0], false) // x, y, num, color, offsetX, offsetY, move
        }

        this.tiles.forEach(function (tile) {
            this.makeTile(this.ctx, tile, this.tiles)
        }.bind(this))

        document.addEventListener('mousedown', function (e) {
            console.log('down')
            let x = e.pageX - this.move.offsetLeft
            let y = e.pageY - this.move.offsetTop

            this.tiles.forEach(function (tile, index) {
                if (x >= tile[0] && x <= tile[0] + 115 && y >= tile[1] && y <= tile[1] + 165) {
                    tile[4] = x - tile[0]
                    tile[5] = y - tile[1]

                    tile[6] = true

                    this.deleteTile(this.ctx, tile, this.tiles)

                    this.currentTile = index

                    document.addEventListener('mousemove', this.moveHandler)

                    this.makeTile(this.moveCTX, tile)
                }
            }.bind(this))
        }.bind(this))

        document.addEventListener('mouseup', function () {
            console.log('up')

            this.tiles[this.currentTile][6] = false

            document.removeEventListener('mousemove', this.moveHandler)

            this.moveCTX.clearRect(0, 0, this.move.clientWidth, this.move.clientHeight)
            this.makeTile(this.ctx, this.tiles[this.currentTile], this.tiles)
        }.bind(this))

        document.addEventListener('touchdown', function (e) {
            console.log('down')
            let x = e.pageX - this.move.offsetLeft
            let y = e.pageY - this.move.offsetTop

            for (let index = 0; index < tiles.length; index++) {
                let tile = tiles[index]
                if (x >= tile[0] && x <= tile[0] + 115 && y >= tile[1] && y <= tile[1] + 165) {
                    tile[4] = x - tile[0]
                    tile[5] = y - tile[1]

                    tile[6] = true

                    clearTile(this.ctx, tile, tiles)

                    this.currentTile = index

                    document.addEventListener('touchmove', this.moveHandler)

                    this.makeTile(this.moveCTX, tile)

                    break
                }
            }
        }.bind(this))

        document.addEventListener('touchend', function () {
            console.log('up')

            this.tiles[this.currentTile][6] = false

            document.removeEventListener('touchmove', this.moveHandler)

            this.moveCTX.clearRect(0, 0, this.move.clientWidth, this.move.clientHeight)
            this.makeTile(this.ctx, this.tiles[this.currentTile], this.tiles)
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

    makeTile(ctx, tile, tiles=[]) {
        ctx.beginPath();
        ctx.fillStyle = "#b3b3b3";
        ctx.strokeStyle = "#808080";
        ctx.moveTo(tile[0] + 100, tile[1]);
        ctx.lineTo(tile[0] + 115, tile[1] + 15);
        ctx.lineTo(tile[0] + 115, tile[1] + 165);
        ctx.lineTo(tile[0] + 100, tile[1] + 150);
        ctx.lineTo(tile[0] + 100, tile[1]);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#999999";
        ctx.strokeStyle = "#808080";
        ctx.moveTo(tile[0], tile[1] + 150);
        ctx.lineTo(tile[0] + 100, tile[1] + 150);
        ctx.lineTo(tile[0] + 115, tile[1] + 165);
        ctx.lineTo(tile[0] + 15, tile[1] + 165);
        ctx.lineTo(tile[0], tile[1] + 150);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#cccccc";
        ctx.strokeStyle = "#666666";
        ctx.rect(tile[0], tile[1], 100, 150);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.font = "70px Arial";
        ctx.fillStyle = tile[3];
        ctx.textAlign = "center";
        ctx.fillText(tile[2], tile[0] + 50, tile[1] + 105);

        tiles.forEach(function (item) {
            console.log(item)
            console.log(item[6] == false)
            if (((item[0] >= tile[0] + 102 && item[0] <= tile[0] + 120 && item[1] >= tile[1] - 175 && item[1] <= tile[1] + 175) || (item[1] >= tile[1] + 150 && item[1] <= tile[1] + 160 && item[0] >= tile[0] - 125 && item[0] <= tile[0] + 125)) && item != tile && item[6] == false) {
                console.log('remake')
                this.makeTile(ctx, item, tiles)
            }
        }.bind(this))
    }

    deleteTile(ctx, tile, tiles=[]) {
        ctx.clearRect(tile[0]-5, tile[1]-5, 125, 175)

        tiles.forEach(function (item) {
            if (item[0] >= tile[0] - 125 && item[0] <= tile[0] + 125 && item[1] >= tile[1] - 175 && item[1] <= tile[1] + 175 && tile != item) {
                console.log('overlap')
                this.makeTile(ctx, item, tiles)
            }
        }.bind(this))
    }
}

rummikub = new Rummikub(document.querySelector('#main'), document.querySelector('#move'))