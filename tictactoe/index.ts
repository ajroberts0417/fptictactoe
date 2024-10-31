import { Server } from 'socket.io';
import { createServer } from 'http';
import { move, initialGameState } from './game';
import { Game, CellIndex } from './shared/types';
import express from 'express';

const app = express();

interface ServerToClientEvents {
    game: (game: Game) => void;
    hey: (message: string) => void;
}

interface ClientToServerEvents {
    move: (position: CellIndex) => void;
}

type InterServerEvents = object // this is empty

type SocketData = object // this is empty

const httpServer = createServer(app);
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {
    cors: {
        origin: "*",
    }
});


let gameState: Game = initialGameState;

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send the current game state to the newly connected client
    socket.emit('game', gameState);

    // Listen for move events from clients
    socket.on('move', (position: CellIndex) => {
        console.log('received move event')
        gameState = move(gameState, position); // update the game state
        console.log('gameState', gameState)
        socket.emit('game', gameState);
        socket.emit('hey', 'whats up')
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
