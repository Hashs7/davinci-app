const MOVE = {
    front: "front",
    back: "back",
    left: "left",
    right: "right",
};

const SYMBOLS = [{
    id: 1,
    name: "White",
    combination: [MOVE.right, MOVE.right, MOVE.back]
}, {
    id: 2,
    name: "Blue",
    combination: [MOVE.right, MOVE.front, MOVE.front]
}, {
    id: 3,
    name: "Yellow",
    combination: [MOVE.left, MOVE.left, MOVE.left, MOVE.front]
}, {
    id: 4,
    name: "Red",
    combination: [MOVE.front, MOVE.right, MOVE.right, MOVE.right, MOVE.back]
}, {
    id: 5,
    name: "Green",
    combination: [MOVE.left, MOVE.back, MOVE.back]
}];

module.exports = {
    MOVE,
    SYMBOLS
};
