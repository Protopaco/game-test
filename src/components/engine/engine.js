import React, { useState, useEffect } from 'react';
import styles from './engine.module.scss';
import { useEvent } from '../../hooks/';
import Player from '../Player/Player';
import io from 'socket.io-client';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const socket = io.connect(serverUrl);

export default function Engine() {
    const [userArray, setUserArray] = useState([]);
    const [localUser, setLocalUser] = useState();

    useEffect(() => {
        socket.on('MOVE_PLAYER', response => {
            setUserArray(response);
        });

        socket.on('CREATE_USER', ({ newUser, userArray }) => {
            setLocalUser(newUser);
            setUserArray(userArray);
        });
    }, [socket]);

    useEffect(() => {
        socket.emit('CREATE_USER', '');
    }, []);

    const handleKeyPress = (e) => {
        e.preventDefault();

        if (localUser) {
            if (e.key === 'ArrowUp') {
                socket.emit('MOVE_PLAYER', { ...localUser, dir: 'up' });
            }
            if (e.key === 'ArrowDown') {
                socket.emit('MOVE_PLAYER', { ...localUser, dir: 'down' });
            }
            if (e.key === 'ArrowLeft') {
                socket.emit('MOVE_PLAYER', { ...localUser, dir: 'left' });
            }
            if (e.key === 'ArrowRight') {
                socket.emit('MOVE_PLAYER', { ...localUser, dir: 'right' });
            }
            setTimeout(() => {
                socket.emit('MOVE_PLAYER', { ...localUser, dir: 'idle' });
            }, 1000);
        }
    };

    useEvent('keydown', handleKeyPress);

    const renderUsers = () => {
        return userArray.map(user => {
            return <Player
                key={user.id}
                position={user.position}
                direction={user.dir}
            />;
        });
    };

    return (
        <div className={styles.container}>
            {renderUsers()}
        </div>
    );
}

