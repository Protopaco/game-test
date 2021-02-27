import React, { useState, useRef } from 'react';
import Chat from '../components/Chat/Chat';
import Engine from '../components/engine/engine';

export default function Home() {
    const [text, setText] = useState([]);
    const engineFocused = useRef(true);

    return (
        <div>
            <Engine
                text={text}
                setText={setText}
                engineFocused={engineFocused}
            />
            <Chat
                text={text}
                setText={setText}
                engineFocused={engineFocused}
            />
        </div>
    );
}
