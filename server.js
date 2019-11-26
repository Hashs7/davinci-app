
const fs      = require('fs');
const pf      = require('pathfinding');
const app     = require('./app');
const helpers = require('./helpers');

const server = app.listen(process.env.PORT || 3000);
const io     = require('./socket').init(server);



io.on('connection', socket => {
    console.log('Client connected');

    /*
    ** From Swift app
    */
    socket.on('detectSymbol', (name) => {
        console.log("symbolName", name);
        const combination = helpers.getSymbolCombination(name);
        helpers.testCombination(combination);

        /*combination.forEach((move) => {
            let lastPos = {};
            helpers.getLastPos().then((data) => {
                lastPos = data;
                helpers.testNewMove(lastPos, move)
            });
        });*/
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

            console.log(dronePositions)
            fs.writeFile('matrix.json', JSON.stringify(json), 'utf8', () => {
            });
        });
    });



    /*
    ** From Vue app
    */
    socket.on('screenView', (data) => io.emit('screenView', data));
    socket.on('timerStart', (data) => io.emit('timerStart', data));
    socket.on('timerPause', (data) => io.emit('timerPause', data));
    socket.on('timerReset', (data) => io.emit('timerReset', data));

    /**
     * DroneControls
     */
    socket.on('drone_start', (data) => io.emit('drone_start', data));
    socket.on('drone_stop', (data) => io.emit('drone_stop', data));
    socket.on('drone_backhome', () => {
        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return
            }
            const {dronePositions, matrix, start} = JSON.parse(data);
            const currentPos                      = dronePositions[dronePositions.length - 1];
            const grid                            = new pf.Grid(matrix.nodes);
            console.log(dronePositions)

            grid.nodes.forEach((el, i) => {
                el.forEach((subEl, j) => {
                    grid.setWalkableAt(j, i, true)
                })
            });

            const finder = new pf.AStarFinder();
            const path   = finder.findPath(currentPos.x, currentPos.y, start.x, start.y, grid);
            const moves  = helpers.convertPathToMoves(path);
            console.log(moves);
            io.emit('drone_backhome', moves)
        });
    });

    socket.on('pushSymbol', () => {
        const combination = helpers.getSymbolCombination("Blue");
        console.log("pushSymbol");
        helpers.testCombination(combination);
    })

    socket.on('disconnect', () => {
        console.log('Client disconnect');
    });
});