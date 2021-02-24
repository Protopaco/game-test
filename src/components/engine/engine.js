import React, { useState, useEffect } from 'react';
import styles from './engine.module.scss';
import { useEvent } from '../../hooks/';
import Player from '../player/player';
import io from 'socket.io-client';


const socket = io.connect('https://test-game-monster-lovers.herokuapp.com:3000');

export default function Engine() {
    const [player, setPlayer] = useState(new Player);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [userArray, setUserArray] = useState([]);
    const [userName, setUserName] = useState();
    const [userId, setUserId] = useState();

    useEffect(() => {
        socket.on('MOVE_PLAYER', response => {
            setUserArray(response);
            console.log(response);
        });

        socket.on('CREATE_USER', newUser => {
            setPosition(newUser.position);
            setUserName(newUser.user);
            console.log(newUser);
        });

        socket.on('RETURN_ID', id => {
            setUserId(id);
            console.log(id);
        });
    });

    useEffect(() => {
        console.log(userId);
        socket.emit('CREATE_USER', userId);
    }, []);



    const handleKeyPress = (e) => {
        e.preventDefault();
        if (e.key === 'ArrowUp') {
            console.log('up');
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
    };


    useEvent('keydown', handleKeyPress);


    const renderUsers = () => {
        return (
            <div>
                {userArray.map(user => {
                    return (
                        <div
                            className={styles.character}
                            style={{
                                transform: `translate(${user.position.x}px, ${user.position.y}px)`
                            }}
                        >
                            <img
                                src={'/idle/adventurer-idle-00.png'}
                            />
                        </div>
                    );
                })
                }
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {renderUsers()}
        </div>
    );
}
