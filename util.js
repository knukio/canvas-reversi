const Util = (() => {
    function foreachCells(f) {
        for(let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                f(x, y);
            }
        }
    }

    function getMouseAxis(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return [x, y];
    }

    return {
        foreachCells: foreachCells,
        getMouseAxis: getMouseAxis
    };
})();
