import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const serverUrl = process.env.SERVER_URL;
const socket = io.connect(serverUrl);

export default function Home() {
    const [input, setInput] = useState({ message: '', user: '' });
    const [response, setResponse] = useState([]);


    useEffect(() => {
        socket.on('message', ({ user, message }) => {
            setResponse([...response, { message, user }]);
        });
    });

    const handleClick = (e) => {
        e.preventDefault();
        const { message, user } = input;
        console.log(input);
        socket.emit('message', { user, message });
        setInput({ message: '', user: '' });
    };

    const renderResponse = () => {
        return (
            <div>
                {response.map((res, i) => {
                    return <div key={i}>{res.message}</div>;
                })}
            </div>
        );
    };
    return (
        <div>
            <div>
                <form onSubmit={handleClick}>
                    <input type="text" onChange={e => setInput({ message: e.target.value, user: '' })} value={input.message} />
                </form>
            </div>
            <div>
                {renderResponse()}
            </div>
        </div>
    );
}
