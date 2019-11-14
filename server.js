const app = require('./app');
const helpers = require('./helpers');

const server = app.listen(process.env.PORT || 3000);
const io = require('./socket').init(server);

io.on('connection', socket => {
    console.log('Client connected');

    /*
    ** Swift app
    */
    socket.on('detectSymbol', (symbolId) => {
        const combination = helpers.getSymbolCombination(symbolId);
        console.log(symbolId);
        console.log(combination);
        io.emit('droneCombination', combination);
    });

    socket.on('droneMove', (moveStr) => {
        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err){
                console.error(err);
                return
            }
            const { dronePositions } = JSON.parse(data);
            const json = {
                ...data,
                dronePositions: helpers.getNewPosition(dronePositions, moveStr)
            };
            fs.writeFile('matrix.json', JSON.stringify(json), 'utf8', () => {});
        });
    });

    /*
    ** Vue app
    */
    socket.on('pushView', (data) => io.emit('pushView', data));

    socket.on('disconnect', () => {
        console.log('Client disconnect');
    });
});