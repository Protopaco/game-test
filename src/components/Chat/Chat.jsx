import React, { useState } from 'react';
import styles from './chat.module.scss';

export default function Chat({ text, setText }) {
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
        console.log(event.target.value);
        setInput(event.target.value);
    };


    return (
        <div className={styles.chatContainer}>
            <div>
                <input
                    type="text"
                    onChange={handleChange}
                    value={input}
                />
                <button onClick={() => { setText(`Player: ${input}`); }}>submit</button>
            </div>
            <div>
                {text.length > 0 ? renderTexts() : null}
            </div>
        </div>
    );

}

