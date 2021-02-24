import React, { useState } from 'react';
// import styles from './player.module.scss';
import styles from '../engine/engine.module.scss';


export default function Player() {
    const [example, setExample] = useState(null);
    let orientation = 'left';
    const animation = 0;
    const idle = 0;
    const sprite = `/idle/adventurer-idle-0${idle}.png`;
    this.position = { x: 0, y: 0 };

    this.move = (direction) => {
        if (direction === 'Up') {
            this.position = { ...this.position, y: this.position.y - 25 };
            runAnimation();
        }

        if (direction === 'Down') {
            this.position = { ...this.position, y: this.position.y + 25 };
            runAnimation();
        }

        if (direction === 'Left') {
            this.position = { ...this.position, x: this.position.x - 25 };
            orientation = 'left';
            runAnimation();
        }

        if (direction === 'Right') {
            this.position = { ...this.position, x: this.position.x + 25 };
            runAnimation();
            orientation = 'right';
        }
    };







    this.PlayerObject = () => {
        return (
            <div
                className={styles.character}
                style={{
                    transform: `translate(${this.position.x}px, ${this.position.y}px)`
                }}
            >
                <img
                    src={sprite}
                    className={styles[orientation]}
                />
            </div>
        );

    };
}
