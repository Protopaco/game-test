import React, { useState, useEffect } from 'react';
import styles from '../engine/engine.module.scss';


export default function Player({ position, direction }) {
    const [frame, setFrame] = useState(0);
    const [sprite, setSprite] = useState('/run3/adventurer-run3-00.png');

    useEffect(() => {
        runAnimation();
        console.log(direction);
    }, [position]);

    const runAnimation = () => {
        frame < 5 ? setFrame(frame + 1) : setFrame(0);
        setSprite(`/run3/adventurer-run3-0${frame}.png`);
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
