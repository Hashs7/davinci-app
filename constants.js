const MOVE = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
};

const SYMBOLS = [{
    id: 1,
    name: "square",
    combination: [MOVE.up, MOVE.up, MOVE.left]
}, {
    id: 2,
    name: "square",
    combination: [MOVE.down, MOVE.right, MOVE.up, MOVE.left]
}, {
    id: 3,
    name: "square",
    combination: [MOVE.up, MOVE.left, MOVE.up]
}, {
    id: 4,
    name: "square",
    combination: [MOVE.down, MOVE.down, MOVE.down]
}, {
    id: 5,
    name: "square",
    combination: [MOVE.up, MOVE.left, MOVE.left]
}];

module.exports = {
    MOVE,
    SYMBOLS
};
