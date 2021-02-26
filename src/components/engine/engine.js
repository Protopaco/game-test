import React, { useState, useEffect, useRef } from 'react';
import styles from './engine.module.scss';
import { useEvent } from '../../hooks/';
import Player from '../Player/Player';
import io from 'socket.io-client';
import Wall from '../Wall/Wall';
import checkCollision from '../../utils/checkCollision';
import Janitor from '../Janitor/Janitor';


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
    position: { x: 50, y: 450 },
    dimension: { x: 300, y: 50 }
};

const Wall4 = {
    position: { x: 500, y: 25 },
    dimension: { x: 25, y: 800 }
};

const Wall5 = {
    position: { x: 25, y: 800 },
    dimension: { x: 500, y: 25 }
};

const Island1 = {
    position: { x: 150, y: 150 },
    dimension: { x: 100, y: 100 }
};

const bob = {
    position: { x: 50, y: 50 },
    dimension: { x: 50, y: 50 },
    storyBeat: 0,
    texts: [
        'Bob: HI Paul!',
        'Bob: Hi Sjaan!',
        'Bob: Hi Evan!'
    ]
};


const objectArray = [Wall1, Wall2, Wall3, Wall4, Wall5, Island1];

const npcArray = [bob];

export default function Engine({ text, setText }) {
    const [userArray, setUserArray] = useState([]);
    const localUser = useRef(null);
    const [disable, setDisable] = useState(false);
    const [idleTimer, setIdleTimer] = useState();

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
        }, 150);
    }, []);


    const handleKeyPress = (e) => {
        e.preventDefault();
        if (localUser.current && !disable) {
            clearTimeout(idleTimer);
            setDisable(true);
            const { position, speed, dimension } = localUser.current;
            if (e.key === 'ArrowUp') {
                const newPosition = CHANGE_POSITION.UP(position, speed);

                if (checkCollision(
                    [...objectArray, ...npcArray],
                    newPosition,
                    dimension)) {
                    localUser.current = {
                        ...localUser.current,
                        position: newPosition,
                        dir: 'up'
                    };
                }
            }
            if (e.key === 'ArrowDown') {
                const newPosition = CHANGE_POSITION.DOWN(position, speed);

                if (checkCollision(
                    [...objectArray, ...npcArray],
                    newPosition,
                    dimension)) {
                    localUser.current = {
                        ...localUser.current,
                        position: newPosition,
                        dir: 'down'
                    };
                }
            }
            if (e.key === 'ArrowLeft') {
                const newPosition = CHANGE_POSITION.LEFT(position, speed);

                if (checkCollision(
                    [...objectArray, ...npcArray],
                    newPosition,
                    dimension)) {
                    localUser.current = {
                        ...localUser.current,
                        position: newPosition,
                        dir: 'left'
                    };
                }
            }
            if (e.key === 'ArrowRight') {
                const newPosition = CHANGE_POSITION.RIGHT(position, speed);

                if (checkCollision(
                    [...objectArray, ...npcArray],
                    newPosition,
                    dimension)) {
                    localUser.current = {
                        ...localUser.current,
                        position: newPosition,
                        dir: 'right'
                    };
                }
            }
            if (e.key === ' ') {
                npcArray.some(npc => {
                    if (localUser.current.position.x - npc.position.x === 50 ||
                        localUser.current.position.y - npc.position.y === 50) {
                        setText([...text, bob.texts[bob.storyBeat]]);
                        bob.storyBeat++;
                    }


                });
            }


            setIdleTimer(setTimeout(() => {
                localUser.current = { ...localUser.current, dir: 'idle' };
            }, [400]));
        }
    };

    useEvent('keydown', handleKeyPress);

    const renderUsers = () => {
        return userArray.map(user => {
            return <Player
                key={user.id}
                position={user.position}
                direction={user.dir}
                userName={user.userName}
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
                    userName={' '}
                />
                : null}
            {renderWalls(objectArray)}
            <Janitor
                position={bob.position}
                storyBeat={bob.storyBeat}
            />

        </div>
    );
}

