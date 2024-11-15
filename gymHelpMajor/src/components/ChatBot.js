import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

function ChatBot() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! How can I help you today?' }
    ]);

    const chatboxRef = useRef(null); // Reference for the chatbox container

    const handleSend = async () => {
        if (input.trim()) {
            setMessages([...messages, { sender: 'user', text: input }]);
            const userMessage = input;
            setInput(''); // Clear input field
            try {
                const response = await axios.post('http://127.0.0.1:8000/app/api/chatbot/', { question: userMessage });
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'bot', text: response.data.response },
                ]);
            } catch (error) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'bot', text: "I'm sorry, but I couldn't provide an answer at this moment." },
                ]);
            }
        }
    };

    useEffect(() => {
        // Scroll to the bottom whenever the messages array changes
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chatbot-ui">
            <div className="chatbox" ref={chatboxRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default ChatBot;
