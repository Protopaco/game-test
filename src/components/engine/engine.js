import React, { useState, useEffect, useRef } from 'react';
import styles from './engine.module.scss';
import { useEvent } from '../../hooks/';
import Player from '../Player/Player';
import io from 'socket.io-client';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const socket = io.connect(serverUrl);

const CHANGE_POSITION = {
    UP: (position, speed) => {
        return {
            x: position.x,
            y: position.y - speed
        };
    },
    DOWN: (position, speed) => {
        return {
            x: position.x,
            y: position.y + speed
        };
    },
    LEFT: (position, speed) => {
        return {
            x: position.x - speed,
            y: position.y
        };
    },
    RIGHT: (position, speed) => {
        return {
            x: position.x + speed,
            y: position.y
        };
    },
};

export default function Engine() {
    const [userArray, setUserArray] = useState([]);
    const localUser = useRef(null);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        socket.on('CREATE_USER', ({ newUser, userArray }) => {
            console.log(newUser);
            localUser.current = newUser;
            setUserArray(userArray);
        });

        socket.on('GAME_STATE', response => {
            setUserArray(response);
            setDisable(false);
        });
    }, [socket]);

    useEffect(() => {
        socket.emit('CREATE_USER', null);

        setInterval(() => {
            socket.emit('GAME_STATE', localUser.current);
        }, 250);
    }, []);


    const handleKeyPress = (e) => {
        e.preventDefault();
        if (localUser.current && !disable) {
            setDisable(true);
            const { position, speed, id } = localUser.current;
            if (e.key === 'ArrowUp') {
                const newPosition = CHANGE_POSITION.UP(position, speed);
                localUser.current = { ...localUser.current, position: newPosition };
                // socket.emit('MOVE_PLAYER', { id, position: newPosition, dir: 'up' });
            }
            if (e.key === 'ArrowDown') {
                const newPosition = CHANGE_POSITION.DOWN(position, speed);
                localUser.current = { ...localUser.current, position: newPosition };
                // socket.emit('MOVE_PLAYER', { id, position: newPosition, dir: 'down' });
            }
            if (e.key === 'ArrowLeft') {
                const newPosition = CHANGE_POSITION.LEFT(position, speed);

                localUser.current = { ...localUser.current, position: newPosition, dir: 'left' };
                // socket.emit('MOVE_PLAYER', { id, position: newPosition, dir: 'left' });
            }
            if (e.key === 'ArrowRight') {
                const newPosition = CHANGE_POSITION.RIGHT(position, speed);

                localUser.current = { ...localUser.current, position: newPosition, dir: 'right' };
                // socket.emit('MOVE_PLAYER', { id, position: newPosition, dir: 'right' });
            }
            setTimeout(() => {
                localUser.current = { ...localUser.current };
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
            {localUser.current ?
                <Player
                    key={localUser.current.id}
                    position={localUser.current.position}
                    direction={localUser.current.dir}
                />
                : null}
        </div>
    );
}

