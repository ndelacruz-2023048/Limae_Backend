export function getReceiverSocketId(userId) {
    console.log(userId);
    
    return userSocketMap[userId];
}

const userSocketMap = {};

export const userSocket = (socket, io) => {
    const dataSocket = socket; // Renombrado para claridad

    console.log("Nuevo cliente conectado:", dataSocket.id);

    const userId = dataSocket.handshake.query.userId;

    if (!userId) {
        console.log("❌ No se recibió userId en handshake");
        return;
    }

    console.log("Usuario conectado:", userId);
    userSocketMap[userId] = dataSocket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    dataSocket.on("disconnect", () => {
        console.log(`Usuario desconectado: ${userId}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
};