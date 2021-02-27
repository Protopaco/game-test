import React, { useState } from 'react';
import styles from './chat.module.scss';

export default function Chat({ text, setText, engineFocused }) {
    const [input, setInput] = useState('');

    const renderTexts = () => {
        return text.map(text => {
            return (
                <div >
                    {text}
                </div>
            );
        });
    };

    const handleChange = (event) => {
        event.preventDefault();
        setInput(event.target.value);
    };


    return (
        <div
            className={styles.chatContainer}
            onClick={() => { engineFocused.current = false; }}
        >
            <div>
                <input
                    type="text"
                    onChange={handleChange}
                    value={input}
                />
                <button onClick={() => { setText([...text, `Player: ${input}`]); }}>submit</button>
            </div>
            <div>
                {text.length > 0 ? renderTexts() : null}
            </div>
        </div>
    );

}

