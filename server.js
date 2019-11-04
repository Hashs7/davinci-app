const server = require('http').createServer();
const io = require('socket.io')(server);
const helpers = require('./helpers');
const pf = require('pathfinding');

io.on('connection', client => {
    console.log('connected');
    client.on('event', data => {
        console.log('event', data);
        client.emit('monChannel', 'Salut mec')
    });

    client.on('disconnect', () => { /* … */ });
});

server.listen(3000, () => {
    const matrice = helpers.generateMatrice(8);

    const grid = new pf.Grid(5, 5);
    const gridBackup = grid.clone();
    grid.setWalkableAt(0, 1, false);

    const finder = new pf.AStarFinder();
    const path = finder.findPath(4, 1, 1, 4, grid);
    console.log('path', path);
    console.log('gridBackup', gridBackup.nodes);
});