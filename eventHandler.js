/* global Render Game Util*/
const EventHandler = (() => {
    function setEvents() {
        Render.canv.addEventListener('mouseup', eventMouseClick);
        Render.canv.addEventListener('mousemove', eventMouseMove);
    }

    function eventMouseMove(e) {
        const [x, y] = cellOnMouse(e);
        const [xAxis, yAxis] = Render.getBaseAxis(x, y);
        Render.common();
        Render.effect(xAxis, yAxis);
    }

    function eventMouseClick(e) {
        const [x, y] = cellOnMouse(e);
        const flipPos = Game.getFlipPos(x, y);
        if(flipPos.length !== 0) {
            Game.setCell(x, y, Game.turn);
            flipPos.forEach(([xp, yp]) => {
                Game.setCell(xp, yp, Game.turn);
            });
            Game.changeTurn();
            if(Game.getPuttablePos().length === 0) {
                Render.common();
                Game.changeTurn();
                if(Game.getPuttablePos().length === 0) {
                    Render.clearMessage();
                    Render.appendMessage(`${Game.getWinner()}です`);
                    Render.appendMessage(`黒: ${Game.getCellNum(1)}  白: ${Game.getCellNum(-1)}`);
                } else {
                    Render.clearMessage();
                    Render.appendMessage('置けるところがありません');
                    Render.appendMessage(`${Game.getPlayer()}の手番です`);
                    Render.appendMessage(`黒: ${Game.getCellNum(1)}  白: ${Game.getCellNum(-1)}`);
                }
            } else {
                Render.clearMessage();
                Render.appendMessage(`${Game.getPlayer()}の手番です`);
                Render.appendMessage(`黒: ${Game.getCellNum(1)}  白: ${Game.getCellNum(-1)}`);
                Render.common();
            }
        }
    }

    function cellOnMouse(e) {
        let xp, yp;
        const [mouseX, mouseY] = Util.getMouseAxis(e);
        Util.foreachCells((x, y) => {
            const [xAxis, yAxis] = Render.getBaseAxis(x, y);
            if(mouseY > yAxis && mouseY < yAxis + 50 && mouseX > xAxis && mouseX < xAxis + 50) {
                [xp, yp] = [x, y];
            }
        });
        return [xp, yp];
    }

    return {
        setEvents: setEvents,
        eventMouseMove: eventMouseMove,
        eventMouseClick: eventMouseClick,
    };
})();
