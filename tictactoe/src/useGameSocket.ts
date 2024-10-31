import { useState, useEffect, useCallback } from 'react';
import type { Game, CellIndex } from '../shared/types'
import { socket } from './socket';

type SocketEventMap = {
    move: [CellIndex];
    // Add other event types here as needed
};

export const useWebSocket = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            console.log('Connected to server');
            setIsConnected(true);
        }

        function onDisconnect() {
            console.log('Disconnected from server');
            setIsConnected(false);
        }

        function onConnectError(err: Error) {
            console.log('Connection error:', err);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('connect_error', onConnectError);

        if (!socket.connected) {
            console.log('Attempting to connect socket...');
            socket.connect();
        }

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('connect_error', onConnectError);
        };
    }, []);

    const emit = (eventName: keyof SocketEventMap, ...args: SocketEventMap[keyof SocketEventMap]) => {
        // ...args is a rest parameter that allows the function to accept any number of additional arguments
        // These arguments are collected into an array named 'args'
        if (socket.connected) {
            socket.emit(eventName, ...args);
        } else {
            console.warn('Socket is not connected. Unable to emit event:', eventName);
        }
    }

    return { isConnected, socket, emit };
};

const initialGameState: Game = {
    currentPlayer: 'x',
    cells: ['', '', '', '', '', '', '', '', ''],
    winCondition: { playerWon: null, result: null }
};


export const useGameSocket = () => {
    const { isConnected, socket, emit } = useWebSocket();
    const [game, setGame] = useState<Game>(initialGameState);

    useEffect(() => {
        function onGameState(updatedGame: Game) {
            console.log('updatedGame', updatedGame);
            setGame(updatedGame);
        }

        socket.on('game', onGameState);
        socket.onAny((eventName, ...args) => {
            console.log('Received event:', eventName, 'with args:', args);
        });

        return () => {
            console.log('cleaning up sockets');
            socket.off('gameState', onGameState);
            socket.offAny();
        };
    }, [socket]);

    const makeMove = (position: CellIndex) => {
        console.log('making move', position);
        emit('move', position);
    }

    return { game, makeMove, isConnected };
};


export default useWebSocket;