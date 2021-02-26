import React, { useState, useEffect } from 'react';
import styles from './janitor.module.scss';

export default function Janitor({ position, storyBeat }) {
    const [frame, setFrame] = useState(1);
    const [sprite, setSprite] = useState('/janitor/idle/hero_idle0001.png');


    useEffect(() => {
        setTimeout(() => {
            idleAnimation();
        }, 120);
    }, [frame]);

    const idleAnimation = () => {
        frame < 9 ? setFrame(frame + 1) : setFrame(1);
        setSprite(`/janitor/idle/hero_idle000${frame}.png`);
    };

    return (
        <div className={styles.janitor}
            style={{
                left: position.x,
                top: position.y
            }}
        >
            <div className={styles.name}>
                {'BOB'}
            </div>
            <img
                className={styles.sprite}
                src={sprite}
            />
        </div>
    );
}
