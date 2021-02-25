import React, { useState, useEffect } from 'react';
import styles from './engine.module.scss';
import { useEvent } from '../../hooks/';
import Player from '../Player/Player';
import io from 'socket.io-client';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const socket = io.connect(serverUrl);

export default function Engine() {
    const [userArray, setUserArray] = useState([]);
    const [userName, setUserName] = useState();
    // const [animationFrame, setAnimationFrame] = useState(0);

    useEffect(() => {
        socket.on('MOVE_PLAYER', response => {
            setUserArray(response);
        });

        socket.on('CREATE_USER', ({ userArray, newUser }) => {
            setUserName(newUser.user);
            setUserArray(userArray);
            console.log(newUser);
        });
    }, [socket]);

    useEffect(() => {
        socket.emit('CREATE_USER', '');
    }, []);

    const handleKeyPress = (e) => {
        e.preventDefault();

        if (userName) {
            if (e.key === 'ArrowUp') {
                socket.emit('MOVE_PLAYER', { dir: 'up', user: userName });
            }
            if (e.key === 'ArrowDown') {

                socket.emit('MOVE_PLAYER', { dir: 'down', user: userName });
            }

            if (e.key === 'ArrowLeft') {
                socket.emit('MOVE_PLAYER', { dir: 'left', user: userName });
            }

            if (e.key === 'ArrowRight') {
                socket.emit('MOVE_PLAYER', { dir: 'right', user: userName });
            }
            setTimeout(() => {
                socket.emit('MOVE_PLAYER', { dir: 'idle', user: userName });
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
