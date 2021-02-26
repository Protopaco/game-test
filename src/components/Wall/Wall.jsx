import React from 'react';
import styles from '../Wall/Wall.module.scss';


export default function Wall({ position, dimension }) {

    return (
        <div
            className={styles.wall}
            style={{
                height: dimension.y,
                width: dimension.x,
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
        </div>
    );
}
