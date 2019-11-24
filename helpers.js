const fs        = require('fs');
const constants = require('./constants');

const notNull = (value) => {
    return typeof(value) !== undefined && value !== null;
}

exports.getSymbolCombination = (symbolId) => {
    const symbol = constants.SYMBOLS.find(el => el.id === Number(symbolId));
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

const newDronePositions = (position) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile('matrix.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let { matrix, start, end, dronePositions } = JSON.parse(data);
                // console.log("current dronePositions", dronePositions);
                console.log("to store", position);
                dronePositions.push(position);

                const json = JSON.stringify({
                    start,
                    end,
                    matrix,
                    dronePositions,
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
        const newPosition = await testNewMove(lastPos, combination[index]);
        const result = await newDronePositions(newPosition);
        if(combination.length - 1 !== index) {
            console.log("trigger next singlemove");
            singleMove(index += 1, combination, newPosition);
        }
    } catch (e) {
        console.error(e);
    }
};

const testNewMove = (lastPos, move) => {
    return new Promise(( async (resolve, reject) => {
        const newPos = lastPos;
        // console.log('lastPos', newPos);
        console.log("move", move);
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

        const { matrix } = await readFileMatrix();
        try {
            const testPos = matrix.nodes[newPos.y][newPos.x];

            if(!testPos.walkable) {
                resolve("impossible")
            }
            resolve({
                x: newPos.x,
                y: newPos.y,
            });
        } catch (e) {
            reject(e)
            console.error(e);
            return "impossible"
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

exports.convertPathToMoves = (path) => {
    const moves = [];
    path.forEach((el, i) => {
        if(i === path.length - 1) return;
        const nextEl = path[i+1];
        if (el[0] > nextEl[0]) {
            moves.push(constants.MOVE.left)
        } else if (el[0] < nextEl[0]){
            moves.push(constants.MOVE.right)
        } else if (el[1] > nextEl[1]) {
            moves.push(constants.MOVE.front)
        } else if (el[1] < nextEl[1]) {
            moves.push(constants.MOVE.back)
        }
    });
    return moves;
};