import React, { useState, useEffect } from 'react';
import styles from './engine.module.scss';
import { useEvent } from '../../hooks/';

export default function Engine() {
    // const [engine, setEngine] = useState(null);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

    const handleKeyPress = (e) => {
        e.preventDefault();

        if (e.key === 'ArrowUp') {
            const newPlayerPosition = {
                x: playerPosition.x,
                y: playerPosition.y - 25
            };
            setPlayerPosition(newPlayerPosition);
        }

        if (e.key === 'ArrowDown') {
            const newPlayerPosition = {
                x: playerPosition.x,
                y: playerPosition.y + 25
            };
            setPlayerPosition(newPlayerPosition);
        }

        if (e.key === 'ArrowRight') {
            const newPlayerPosition = {
                x: playerPosition.x + 25,
                y: playerPosition.y
            };
            setPlayerPosition(newPlayerPosition);
        }

        if (e.key === 'ArrowLeft') {
            const newPlayerPosition = {
                x: playerPosition.x - 25,
                y: playerPosition.y
            };
            setPlayerPosition(newPlayerPosition);
        }
    };

    useEvent('keydown', handleKeyPress);

    function gameloop() {

        requestAnimationFrame(gameloop);
    }

    useEffect(() => {
        const anim = requestAnimationFrame(gameloop);

        return () => {
            cancelAnimationFrame(anim);
        };
    }, [playerPosition]);

    return (
        <div className={styles.container}>
            <span
                className={styles.character}
                style={{
                    transform: `translate(${playerPosition.x}px, ${playerPosition.y}px)`
                }}
            />
        </div>
    );
}
