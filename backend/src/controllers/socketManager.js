import {Server} from "socket.io";

export const connectToServer = (httpServer) => {
    const io = new Server(httpServer);
    return io;
}