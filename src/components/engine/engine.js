import React, { useState, useEffect, useRef } from 'react';
import styles from './engine.module.scss';
import { useEvent } from '../../hooks/';
import Player from '../Player/Player';
import io from 'socket.io-client';
import Wall from '../Wall/Wall';
import checkCollision from '../../utils/checkCollision';


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


const Wall1 = {
    position: { x: 25, y: 25 },
    dimension: { x: 25, y: 800 }
};

const Wall2 = {
    position: { x: 50, y: 25 },
    dimension: { x: 450, y: 25 }
};

const Wall3 = {
    position: { x: 50, y: 475 },
    dimension: { x: 300, y: 25 }
};

const Wall4 = {
    position: { x: 475, y: 50 },
    dimension: { x: 25, y: 800 }
};

const Wall5 = {
    position: { x: 25, y: 825 },
    dimension: { x: 450, y: 25 }
};

const Island1 = {
    position: { x: 175, y: 175 },
    dimension: { x: 75, y: 75 }
};




export default function Engine() {
    const [userArray, setUserArray] = useState([]);
    const localUser = useRef(null);
    const [disable, setDisable] = useState(false);
    const objectArray = [Wall1, Wall2, Wall3, Wall4, Wall5, Island1, ...userArray];

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
            const { position, speed, dimension } = localUser.current;
            if (e.key === 'ArrowUp') {
                const newPosition = CHANGE_POSITION.UP(position, speed);

                if (checkCollision(objectArray, newPosition, dimension)) {
                    localUser.current = {
                        ...localUser.current,
                        position: newPosition,
                        dir: 'up'
                    };
                }
            }
            if (e.key === 'ArrowDown') {
                const newPosition = CHANGE_POSITION.DOWN(position, speed);

                if (checkCollision(objectArray, newPosition, dimension)) {
                    localUser.current = {
                        ...localUser.current,
                        position: newPosition,
                        dir: 'down'
                    };
                }
            }
            if (e.key === 'ArrowLeft') {
                const newPosition = CHANGE_POSITION.LEFT(position, speed);

                if (checkCollision(objectArray, newPosition, dimension)) {
                    localUser.current = {
                        ...localUser.current,
                        position: newPosition,
                        dir: 'left'
                    };
                }
            }
            if (e.key === 'ArrowRight') {
                const newPosition = CHANGE_POSITION.RIGHT(position, speed);

                if (checkCollision(objectArray, newPosition, dimension)) {
                    localUser.current = {
                        ...localUser.current,
                        position: newPosition,
                        dir: 'right'
                    };
                }
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

    const renderWalls = objectArray => {
        return objectArray.map(({ position, dimension }, index) => {
            return <Wall
                key={index}
                position={position}
                dimension={dimension}
            />;
        });
    };

    return (
        <div className={styles.container}>
            <span className={styles.background} />
            {renderUsers()}
            {localUser.current ?
                <Player
                    key={localUser.current.id}
                    position={localUser.current.position}
                    direction={localUser.current.dir}
                />
                : null}
            {renderWalls(objectArray)}
        </div>
    );
}

