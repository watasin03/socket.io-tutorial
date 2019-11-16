const io = require('socket.io')(3200);

const user = {}

io.on('connection', socket => {

    socket.on('new-user', name =>{
        user[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });

    socket.emit('chat-message', 'Hellow');
        socket.on('send-chat-message', message=>{
        socket.broadcast.emit('chat-message', {message:message, name: user[socket.id]});
    });
    
    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnected', user[socket.id]);
        delete user[socket.id];
    });
});

