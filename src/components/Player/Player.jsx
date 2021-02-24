import React, { useState, useEffect } from 'react';
import styles from '../engine/engine.module.scss';


export default function Player({ position, direction }) {
    const [frame, setFrame] = useState(0);
    const [sprite, setSprite] = useState('/run3/adventurer-run3-00.png');
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
    const [idleFrame, setIdleFrame] = useState(0);

    useEffect(() => {
        if (currentPosition.x !== position.x || currentPosition.y !== position.y) {
            runAnimation();
        } else {

        }
        setCurrentPosition(position);
    }, [position]);

    const runAnimation = () => {
        frame < 5 ? setFrame(frame + 1) : setFrame(0);
        setSprite(`/run3/adventurer-run3-0${frame}.png`);
    };

    const idleAnimation = () => {
        idleFrame < 3 ? setIdleFrame(idleFrame + 1) : setIdleFrame(0);
        setSprite(`/idle/adventurer-idle-0${idleFrame}.png`);
    };
    return (
        <div>

            <div
                className={styles.character}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`
                }}
            >
                <img
                    className={styles.player, styles[direction]}
                    src={sprite}
                />
            </div>
        </div>
    );
}
