import React, { useState } from 'react';
import Chat from '../components/Chat/Chat';
import Engine from '../components/engine/engine';

export default function Home() {
    const [text, setText] = useState([]);

    return (
        <div>
            <Engine
                text={text}
                setText={setText}
            />
            <Chat
                text={text}
                setText={setText}
            />
        </div>
    );
}
