
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
        console.log("detectSymbol: ", name);
        const combination = helpers.getSymbolCombination(name);
        helpers.testCombination(combination);
    });

    socket.on('droneMove', (moveStr) => {
        console.log("droneMove: ", moveStr);
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

            console.log(dronePositions);
            fs.writeFile('matrix.json', JSON.stringify(json), 'utf8', () => {});
        });
    });

    /*
    ** From Vue app
    */
    socket.on('updatePlayers', (data) => io.emit('updatePlayers', data));
    socket.on('droneControls', () => io.emit('droneControls'));
    socket.on('screenView', (data) => io.emit('screenView', data));
    socket.on('timerStart', (data) => io.emit('timerStart', data));
    socket.on('timerPause', (data) => io.emit('timerPause', data));
    socket.on('timerReset', (data) => io.emit('timerReset', data));

    /**
     * DroneControls
     */
    socket.on('drone_start', (data) => {
        helpers.clearDronePositions();
        io.emit('drone_start', data);
    });
    socket.on('drone_stop', (data) => io.emit('drone_stop', data));
    socket.on('drone_backhome', () => {
        console.log("drone_backhome");
        io.emit('drone_backhome');

        /*fs.readFile('matrix.json', 'utf8', (err, data) => {
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
        });*/
    });

    // Super controls
    socket.on('pushSymbol', (name) => {
        const combination = helpers.getSymbolCombination(name);
        helpers.testCombination(combination);
        console.log("pushSymbol", name);
        io.emit('drone_color-combination', [name]);
    });
    socket.on('drone_moveTo', (data) => {
        console.log("drone_moveTo", data);
        io.emit('drone_moveTo', data)
    });
    socket.on('drone_moveTo-long', (data) => {
        console.log("drone_moveTo-long", data);
        io.emit('drone_moveTo-long', data)
    });
    socket.on('drone_calibrate', () => {
        io.emit('drone_calibrate')
    });
    socket.on('drone_detection', () => {
        console.log("drone_detection");
        io.emit('drone_detection')
    });
    socket.on('drone_rotate', (data) => {
        console.log("drone_rotate", data);
        io.emit('drone_rotate', data)
    });

    socket.on('disconnect', () => {
        console.log('Client disconnect');
    });
});