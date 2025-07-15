export const neMessage = (socket, io) => {
    socket.on('newMessage', (message) => {
        console.log('Received Message:', message);
        io.emit('newMessage', message);
        console.log(`Broadcasted message to all connected sockets 💚`);
        
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
}