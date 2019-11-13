const app = require('./app');
const helpers = require('./helpers');

const server = app.listen(process.env.PORT || 3000);
const io = require('./socket').init(server);

io.on('connection', socket => {
    console.log('Client connected');

    // Swift app
    socket.on('detectSymbol', (symbolId) => {
        const combination = helpers.getSymbolCombination(symbolId);
        console.log(symbolId);
        console.log(combination);
        io.emit('droneCombination', combination)
    });

    // Vue app
    socket.on('pushView', (data) => io.emit('pushView', data));

    socket.on('disconnect', () => {
        console.log('Client disconnect');
    });
});