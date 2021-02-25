import React, { useState, useEffect } from 'react';
import styles from './engine.module.scss';
import { useEvent } from '../../hooks/';
import Player from '../Player/Player';
import io from 'socket.io-client';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const socket = io.connect(serverUrl);

export default function Engine() {
    const [userArray, setUserArray] = useState([]);
    const [localUser, setLocalUser] = useState({
        user: 'tempPlayer',
        position: { x: 25, y: 25 },
        id: 'temp',
        speed: 25,
        dir: 'idle'
    });
    // const [animationFrame, setAnimationFrame] = useState(0);

    useEffect(() => {
        socket.on('MOVE_PLAYER', response => {
            const userIndex = response.findIndex(element => {
                return element.user === localUser.user;
            });
            response.splice(userIndex, 1);
            setUserArray(response);
        });

        socket.on('CREATE_USER', ({ userArray, newUser }) => {
            setLocalUser(newUser);
            setUserArray(userArray);
        });
    }, [socket]);

    useEffect(() => {
        socket.emit('CREATE_USER', '');
    }, []);

    const handleKeyPress = (e) => {
        e.preventDefault();
        const { position, speed } = localUser;
        if (localUser) {
            if (e.key === 'ArrowUp') {
                setLocalUser({
                    ...localUser,
                    position: {
                        x: position.x,
                        y: position.y - speed
                    },
                    dir: 'up'
                });
                socket.emit('MOVE_PLAYER', { user: localUser, });
            }
            if (e.key === 'ArrowDown') {
                setLocalUser({
                    ...localUser,
                    position: {
                        x: position.x,
                        y: position.y + speed
                    },
                    dir: 'down',
                });
                socket.emit('MOVE_PLAYER', { user: localUser, });
            }
            if (e.key === 'ArrowLeft') {
                setLocalUser({
                    ...localUser,
                    position: {
                        x: position.x - speed,
                        y: position.y
                    },
                    dir: 'left'
                });
                socket.emit('MOVE_PLAYER', { user: localUser, });
            }
            if (e.key === 'ArrowRight') {
                setLocalUser({
                    ...localUser,
                    position: {
                        x: position.x + speed,
                        y: position.y,
                        dir: 'right',
                    }
                });
                socket.emit('MOVE_PLAYER', { user: localUser, });
            }
            setTimeout(() => {
                socket.emit('MOVE_PLAYER', {
                    user:
                    {
                        ...localUser,
                        dir: 'idle'
                    }
                });
            }, 1000);
        }
    };


    useEvent('keydown', handleKeyPress);

    const gameloop = () => {


        setInterval(() => {
            requestAnimationFrame(gameloop());
        }, 100);
    };


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
            <Player
                key={localUser.id}
                position={localUser.position}
                direction={localUser.dir}
            />
            {renderUsers()}
        </div>
    );
}
