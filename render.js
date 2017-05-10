/* global Util Game */
const Render = (() => {
    const canv = document.getElementById('canv');
    const ctx = canv.getContext('2d');
    const message = document.getElementById('message');

    const black = '#000000';
    const white = '#ffffff';
    const darkGreen = '#006400';
    const blue = '#01168a';
    const boardSize = 402;
    const cellWidth = (boardSize - 2) / 8;

    function init() {
        appendMessage(`${Game.getPlayer()}の手番です`);
        appendMessage(`黒: ${Game.getCellNum(1)}  白: ${Game.getCellNum(-1)}`);
        common();
    }

    function common() {
        ctx.clearRect(0, 0, boardSize, boardSize);
        board();
        cells();
        pieces();
        marks();
    }

    function showMessage(str) {
        message.innerHTML = str + '<br>';
    }

    function appendMessage(str) {
        message.innerHTML = message.innerHTML + str + '<br>';
    }

    function clearMessage() {
        message.innerHTML = '';
    }

    function getBaseAxis(x, y) {
        return [x * cellWidth, y * cellWidth];
    }

    function board() {
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = darkGreen;
        ctx.fillRect(0, 0, boardSize, boardSize);
    }

    function cells() {
        ctx.strokeStyle = white;
        Util.foreachCells((x, y) => {
            const [xAxis, yAxis] = getBaseAxis(x, y);
            ctx.strokeRect(xAxis + 1 , yAxis + 1 , cellWidth, cellWidth);
        });
    }

    function pieces() {
        Util.foreachCells((x, y) => {
            const [xAxis, yAxis] = getBaseAxis(x, y);
            if(Game.getCell(x, y) === -1) {
                blackPiece(xAxis, yAxis);
            } else if (Game.getCell(x, y) === 1) {
                whitePiece(xAxis, yAxis);
            }
        });
    }

    function marks() {
        const puttablePos = Game.getPuttablePos();
        puttablePos.forEach(([x, y]) => {
            const [xAxis, yAxis] = getBaseAxis(x, y);
            mark(xAxis, yAxis);
        });
    }

    function mark(x, y) {
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = blue;
        ctx.fillRect(x + 20, y + 20, 10, 10);
    }

    function blackPiece(x, y) {
        fillArc(x + 26, y + 26, 22, black);
        fillArc(x + 24, y + 24, 22, white);
    }

    function whitePiece(x, y) {
        fillArc(x + 26, y + 26, 22, white);
        fillArc(x + 24, y + 24, 22, black);
    }

    function effect(x, y) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = white;
        ctx.fillRect(x, y, cellWidth, cellWidth);
    }

    function fillArc(x, y, r, color) {
        ctx.globalAlpha = 1.0;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    }

    return {
        init: init,
        common: common,
        canv: canv,
        effect: effect,
        marks: marks,
        showMessage: showMessage,
        clearMessage: clearMessage,
        appendMessage: appendMessage,
        getBaseAxis: getBaseAxis
    };
})();
