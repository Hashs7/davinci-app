const constants = require('./constants');
const fs      = require('fs');

const notNull = (value) => {
    return typeof(value) !== undefined && value !== null;
}

exports.getSymbolCombination = (symbolId) => {
    const symbol = constants.SYMBOLS.find(el => el.id === Number(symbolId));
    return symbol.combination;
};

exports.getPosArray = (combination) =>{
    const promises = combination.map(comb => getNewPos(comb));

    Promise.all(promises).then((data)=>{
        data.forEach((item) => {
            console.log(item)
        })
    })
};

function testMove (matrix,newPos) {

    const grid = matrix.matrix;
    let testPos = null;
    //console.log("matrix nodes", grid.nodes)
    //console.log("newPos", newPos)
    try {
        testPos = grid.nodes[newPos.y][newPos.x]
        if (testPos.walkable === false) return "noWalkable";
        return testPos;
    } catch (e) {
        console.log("impossible")
        //console.error(e)
        return "impossible"
    }
}



//GET LAST POSITION
const getNewPos = (move) => {
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
            } else {
                lastPos= matrix.dronePositions
            }


            const newMove = addMove(lastPos, move)
            const test = testMove(matrix, newMove)
            console.log(test);
            resolve(newMove)
        })
    });

};




addMove = (lastPos,move) => {
    //return new Promise((resolve, reject)=> {

    const addMove = lastPos;
    switch (move) {
        case "front":
            addMove.y -= 1;
            break;
        case "back":
            addMove.y += 1;
            break;
        case "left":
            addMove.x -= 1;
            break;
        case "right":
            addMove.x += 1;
            break;
    }
    return addMove

    // matrix.dronePositions = lastPos.nodes
    //
    //  fs.writeFile('matrix.json', JSON.stringify(matrix), 'utf8', () => {
    //  });
    // console.log(lastPos)
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