const constants = require('./constants');

exports.getSymbolCombination = (symbolId) => {
    const symbol = constants.SYMBOLS.find(el => el.id === Number(symbolId));
    return symbol.combination;
};

exports.getNewPosition = (allPositions, move) => {
    const lastPos = allPositions.last();
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