import React, { useState, useEffect } from 'react';
import styles from '../engine/engine.module.scss';


export default function Player({ position, direction, userName }) {
    const [frame, setFrame] = useState(0);
    const [sprite, setSprite] = useState('/run3/adventurer-run3-00.png');
    const [idleFrame, setIdleFrame] = useState(0);
    const runDirections = ['up', 'down', 'left', 'right'];

    useEffect(() => {
        setTimeout(() => {
            if (runDirections.includes(direction)) {
                runAnimation();
            } else {
                idleAnimation();
            }
        }, 120);
    }, [frame, idleFrame]);

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
                <div className={styles.userName}>
                    {userName}
                </div>
                <img
                    className={styles.player, styles[direction]}
                    src={sprite}
                />

            </div>
        </div>
    );
}
