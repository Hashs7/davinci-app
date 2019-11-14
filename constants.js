const MOVE = {
    front: "front",
    back: "back",
    left: "left",
    right: "right",
};

const SYMBOLS = [{
    id: 1,
    name: "square",
    combination: [MOVE.front, MOVE.front, MOVE.left]
}, {
    id: 2,
    name: "square",
    combination: [MOVE.back, MOVE.right, MOVE.front, MOVE.left]
}, {
    id: 3,
    name: "square",
    combination: [MOVE.front, MOVE.left, MOVE.front]
}, {
    id: 4,
    name: "square",
    combination: [MOVE.back, MOVE.back, MOVE.back]
}, {
    id: 5,
    name: "square",
    combination: [MOVE.front, MOVE.left, MOVE.left]
}];

module.exports = {
    MOVE,
    SYMBOLS
};
