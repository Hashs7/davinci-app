
const fs      = require('fs');
const pf      = require('pathfinding');
const app     = require('./app');
const helpers = require('./helpers');

const server = app.listen(process.env.PORT || 3000);
const io     = require('./socket').init(server);

io.on('connection', socket => {
    console.log('Client connected');
    /*
    ** Swift app
    */
    socket.on('detectSymbol', (symbolId) => {
        const combination = helpers.getSymbolCombination(symbolId);
        const moveArray = [];
        const indexArray = [];
        helpers.getPosArray(combination);



        // combination.forEach((move,index)=>
        // {
        //     fs.readFile('matrix.json', 'utf8', (err, data) => {
        //         if (err) {
        //             console.error(err);
        //             return
        //         }
        //         const matrix = JSON.parse(data);
        //         let lastPos;
        //         if (!matrix.dronePositions) {
        //             lastPos = matrix.start
        //         } else {
        //             lastPos = matrix.dronePositions
        //         }
        //         //new position
        //         const newPos = helpers.addMove(lastPos,move);
        //         const grid = matrix.matrix;
        //         let testPos = null;
        //
        //         //is out or unwalkable
        //         try {
        //             testPos = grid.nodes[newPos.y][newPos.x];
        //             if (testPos.walkable === false) {
        //                 testPos = "noWalkable";
        //             }
        //         } catch (e) {
        //             testPos = "out";
        //         }
        //         moveArray.push(testPos);
        //         indexArray.push(index);
        //
        //     });
        // });


        // helpers.getPosArray(combination).then((data)=>{
        //     console.log(data)
        // });


        io.emit('droneCombination', combination);
    });

    socket.on('droneMove', (moveStr) => {
        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return
            }
            const dronePositions = JSON.parse(data);
            const json             = {
                ...data,
                dronePositions: helpers.getNewPositions(dronePositions, moveStr)
            };

            console.log(json)
            fs.writeFile('matrix.json', JSON.stringify(json), 'utf8', () => {
            });
        });
    });

    socket.on('goToStart', () => {
        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return
            }
            const {dronePositions, matrix, start} = JSON.parse(data);
            console.log(dronePositions)
            const currentPos                      = dronePositions[dronePositions.length - 1];
            const grid                            = new pf.Grid(matrix.nodes);

            grid.nodes.forEach((el, i) => {
                el.forEach((subEl, j) => {
                    grid.setWalkableAt(j, i, true)
                })
            });
            const finder = new pf.AStarFinder();
            const path   = finder.findPath(currentPos.x, currentPos.y, start.x, start.y, grid);
            const moves  = helpers.convertPathToMoves(path);
            console.log(moves);
            io.emit('goToStart', moves)
        });

    });

    /*
    ** Vue app
    */
    socket.on('screenView', (data) => io.emit('screenView', data));
    socket.on('timerStart', (data) => io.emit('timerStart', data));
    socket.on('timerPause', (data) => io.emit('timerPause', data));
    socket.on('timerReset', (data) => io.emit('timerReset', data));

    socket.on('disconnect', () => {
        console.log('Client disconnect');
    });
});