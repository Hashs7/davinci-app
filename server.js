
const fs      = require('fs');
const pf      = require('pathfinding');
const app     = require('./app');
const helpers = require('./helpers');

const server = app.listen(process.env.PORT || 3000);
const io     = require('./socket').init(server);

const combination = helpers.getSymbolCombination(5);
const finalComb = helpers.testCombination(combination);
console.log(finalComb);

io.on('connection', socket => {
    console.log('Client connected');
    /*
    ** Swift app
    */


    socket.on('detectSymbol', (symbolId) => {
        const combination = helpers.getSymbolCombination(symbolId);
        /*combination.forEach((move) => {
            let lastPos = {};
            helpers.getLastPos().then((data) => {
                lastPos = data;
                helpers.testNewMove(lastPos, move)
            });
        });*/
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
            //fs.writeFile('matrix.json', JSON.stringify(json), 'utf8', () => {
            //});
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