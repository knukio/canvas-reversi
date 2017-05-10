/* global Util */
const Game = (() => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 1, -1, 0, 0, 0,
                   0, 0, 0, -1, 1, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0];

    const turn = 1;

    function changeTurn() {
        this.turn = this.turn * -1;
    }

    function getPlayer() {
        if(this.turn === 1) return '黒';
        else if (this. turn === -1) return '白';
    }

    function getCellNum(player) {
        return board.filter(c => {return c === player;}).length;
    }

    function getCell(x, y) {
        return board[y * 8 + x];
    }

    function setCell(x, y, v) {
        board[y * 8 + x] = v;
    }

    function getFlipPos(x, y) {
        let flipPos = [];
        if(getCell(x, y) !== 0) return [];
        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                if(j === 0 && i === 0) continue;
                flipPos = flipPos.concat(getFlipPosDir(x, y, i, j));
            }
        }
        return flipPos;
    }

    function getWinner() {
        if(getCellNum(1) > getCellNum(-1)) {
            return '黒の勝ち';
        } else if (getCellNum(1) < getCellNum(-1)) {
            return '白の勝ち';
        } else {
            return '引き分け';
        }
    }

    function getFlipPosDir(x, y, i, j) {
        const flipPos = [];
        const neighborCell = getCell(x + j, y + i);
        flipPos.push([x + j, y + i]);
        if(neighborCell === Game.turn * -1) {
            let k = 2;
            while(x + j * k >= 0 && x + j * k < 8 && y + i * k >= 0 && y + i * k < 8) {
                if(getCell(x + j * k, y + i * k) === Game.turn * -1) {
                    flipPos.push([x + j * k, y + i * k]);
                } else if(getCell(x + j * k, y + i * k) === Game.turn) {
                    return flipPos;
                }
                k++;
            }
        }
        return [];
    }

    function getPuttablePos() {
        const puttablePos = [];
        Util.foreachCells((x, y) => {
            if(getFlipPos(x, y).length !== 0) {
                puttablePos.push([x, y]);
            }
        });
        return puttablePos;
    }

    return {
        turn: turn,
        changeTurn: changeTurn,
        getPlayer: getPlayer,
        getCellNum: getCellNum,
        getCell: getCell,
        setCell: setCell,
        getFlipPos: getFlipPos,
        getWinner: getWinner,
        getPuttablePos: getPuttablePos
    };
})();
