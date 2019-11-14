const constants = require('./constants');

exports.getSymbolCombination = (symbolId) => {
    const symbol = constants.SYMBOLS.find(el => el.id === Number(symbolId));
    return symbol.combination;
};

exports.getNewPositions = (allPositions, move) => {
    const lastPos  = allPositions[allPositions.length - 1];
    const dronePos = allPositions;
    switch (move) {
        case "front":
            lastPos.y -= 1;
            break;
        case "back":
            lastPos.y += 1;
            break;
        case "left":
            lastPos.x -= 1;
            break;
        case "right":
            lastPos.x += 1;
            break;
    }
    dronePos.push(lastPos);
    return dronePos
};

exports.convertPathToMoves = (path) => {
    const moves = [];
    path.forEach((el, i) => {
        if(i === path.length - 1) return;
        const nextEl = path[i+1];
        if (el[0] > nextEl[0]) {
            console.log("go left");
            moves.push(constants.MOVE.left)
        } else if (el[0] < nextEl[0]){
            console.log("go right");
            moves.push(constants.MOVE.right)
        } else if (el[1] > nextEl[1]) {
            console.log("go front");
            moves.push(constants.MOVE.front)
        } else if (el[1] < nextEl[1]) {
            console.log("go back");
            moves.push(constants.MOVE.back)
        }
    });
    return moves;
};