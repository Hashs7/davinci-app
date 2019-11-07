const app = require('./app');

const server = app.listen(process.env.PORT || 3000);
const io = require('./socket').init(server);

io.on('connection', socket => {
    console.log('Client connected');
    socket.on('event', (data) => io.emit('back', 'cc'));
    socket.on('disconnect', () => io.emit('disconnected'));
});