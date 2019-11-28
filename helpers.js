const fs        = require('fs');
const constants = require('./constants');

exports.getSymbolCombination = (symbolName) => {
    const symbol = constants.SYMBOLS.find(el => el.name === symbolName);
    return symbol.combination;
};

const getLastPos = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return
            }
            const matrix = JSON.parse(data);
            if (!matrix.dronePositions.length) {
                resolve(matrix.start)
            } else {
                const last = matrix.dronePositions.length - 1;
                resolve(matrix.dronePositions[last]);
            }
        });
    });
};

const readFileMatrix = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const matrix = JSON.parse(data);
            if (matrix) {
                resolve(matrix);
            } else {
                reject()
            }
        })
    });
};

const storeDroneMove = (position, move, isFirst) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile('matrix.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let {matrix, start, end, dronePositions, droneMoves} = JSON.parse(data);
                // console.log("current dronePositions", dronePositions);
                console.log("to store", position);
                if (isFirst) {
                    droneMoves = []
                }
                if (move !== "impossible") {
                    dronePositions.push(position);
                }
                droneMoves.push(move);
                const io = require('./socket').getIO();
                console.log("updateDronePos");
                io.emit('updateDronePos', dronePositions);


                const json = JSON.stringify({
                    start,
                    end,
                    matrix,
                    dronePositions,
                    droneMoves,
                });

                fs.writeFile('matrix.json', json, 'utf8', () => {
                    resolve("gg")
                });
            });
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });

};

exports.testCombination = async (combination) => {
    console.log("combination", combination);
    let lastPosition = await getLastPos();
    singleMove(0, combination, lastPosition)
};

const singleMove = async (index, combination, lastPos) => {
    try {
        console.log(index);
        const {newPosition, move} = await testNewMove(lastPos, combination[index]);
        const result              = await storeDroneMove(newPosition, move, index === 0);
        if (combination.length - 1 !== index && move !== "impossible") {
            console.log("trigger next singlemove");
            singleMove(index += 1, combination, newPosition);
        } else {
            emitCombination();
        }
    } catch (e) {
        console.error(e);
    }
};

const emitCombination = async () => {
    const io        = require('./socket').getIO();
    const {droneMoves} = await readFileMatrix();
    const isImpossible = droneMoves.filter(move => move === "impossible");
    if (isImpossible.length) {
        // c'est impossible
        io.emit('drone_combination', droneMoves);
    } else {
        //Emit color
        const { name } = constants.SYMBOLS.find(el => arraysEqual(el.combination, droneMoves));
        io.emit('drone_color-combination', [name])  ;
    }
};

const testNewMove = (lastPos, move) => {
    return new Promise((async (resolve, reject) => {
        const newPos = lastPos;
        switch (move) {
            case "front":
                newPos.y -= 1;
                break;
            case "back":
                newPos.y += 1;
                break;
            case "left":
                newPos.x -= 1;
                break;
            case "right":
                newPos.x += 1;
                break;
        }

        const {matrix} = await readFileMatrix();
        try {
            const testPos = matrix.nodes[newPos.y][newPos.x];

            if (!testPos.walkable) {
                resolve({move: "impossible"})
            }
            resolve({
                newPosition: {
                    x: newPos.x,
                    y: newPos.y,
                },
                move,
            });
        } catch (e) {
            resolve({move: "impossible"});
            console.error(e);
        }
    }))
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


exports.clearDronePositions = async () => {
    const matrix = await readFileMatrix();
    const json = JSON.stringify({
        ...matrix,
        dronePositions: [],
    });

    fs.writeFile('matrix.json', json, 'utf8', () => {});
};

exports.convertPathToMoves = (path) => {
    const moves = [];
    path.forEach((el, i) => {
        if (i === path.length - 1) return;
        const nextEl = path[i + 1];
        if (el[0] > nextEl[0]) {
            moves.push(constants.MOVE.left)
        } else if (el[0] < nextEl[0]) {
            moves.push(constants.MOVE.right)
        } else if (el[1] > nextEl[1]) {
            moves.push(constants.MOVE.front)
        } else if (el[1] < nextEl[1]) {
            moves.push(constants.MOVE.back)
        }
    });
    return moves;
};

function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) === JSON.stringify(a2);
}