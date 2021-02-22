import { useEventCallback } from '@material-ui/core';
import React from 'react';
import styles from './engine.module.scss';
import { useDidMount } from '../../hooks/useEvent';

export default function Engine() {
    const handleKeyPress = (e) => { };

    useEventCallback('keyup', handleKeyPress);

    return (
        <div className={styles.container}>
            <span className={styles.character} />
        </div>
    );
}
