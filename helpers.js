const constants = require('./constants');
const fs      = require('fs');

exports.getSymbolCombination = (symbolId) => {
    const symbol = constants.SYMBOLS.find(el => el.id === Number(symbolId));
    return symbol.combination;
};

exports.getLastPos = () => {

    return new Promise((resolve, reject)=>{

        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return
            }
            const matrix = JSON.parse(data);
            let lastPos;
            if(!matrix.dronePositions){
                lastPos= matrix.start
            }else{
                lastPos= matrix.dronePositions
            }
            if(lastPos) {
                resolve(lastPos);
            }else{
                reject()
            }
        })

    });

};

const readFileMatrix =()=>{
    return new Promise((resolve, reject)=>{

        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return
            }
            const matrix = JSON.parse(data);
            if(matrix){
                resolve(matrix);
            }else{
                reject()
            }

        })

    });
};

exports.testNewMove = (lastPos,move) => {
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
    let grid = {};
    readFileMatrix().then((data)=>{
        grid = data.matrix;
        const testPos = grid.nodes[newPos.y][newPos.x];

        if(testPos){
            console.log(testPos)
        }


    })
        .catch((error)=>{
            console.log(error)
        });

    // matrix.dronePositions = lastPos.nodes
    //
    //  fs.writeFile('matrix.json', JSON.stringify(matrix), 'utf8', () => {
    //  });
    // console.log(lastPos)
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