import React, { useState } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Chatbot.css'; 

const Chatbot = () => {
    const [response, setResponse] = useState('');
    const [query, setQuery] = useState('');

    const commands = [
        {
            command: 'reset',
            callback: () => setResponse('')
        },
        {
            command: 'what is *',
            callback: (query) => handleQuery(query)
        }
    ];

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    const handleQuery = async (query) => {
        try {
            const result = await axios.post('http://localhost:5000/ask', { query });
            setResponse(result.data.response);
        } catch (error) {
            console.error("Error communicating with the assistant:", error);
            setResponse("There was an error communicating with the assistant.");
        }
    };

    const handleTextInput = (e) => {
        setQuery(e.target.value);
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        handleQuery(query);
        setQuery('');
    };

    const handleSpeakClick = () => {
        SpeechRecognition.startListening();
    };

    const handleSpeakSubmit = () => {
        if (transcript) {
            handleQuery(transcript);
            resetTranscript();
        }
    };

    const commonQueries = [
        'What is your return policy?',
        'How can I track my order?',
        'What payment methods do you accept?',
        'Can I change my order?',
        'How do I contact customer support?',
    ];

    return (
        <div className="chatbot-container">
            <h1>Help Page</h1>
            <div className="chatbot-buttons">
                <button onClick={handleSpeakClick} className="speak-button">
                    Speak
                </button>
                <form onSubmit={handleTextSubmit} className="text-form">
                    <input 
                        type="text" 
                        value={query} 
                        onChange={handleTextInput} 
                        placeholder="Type your question..."
                        className="text-input"
                    />
                    <button type="submit" className="text-submit">Ask</button>
                </form>
            </div>
            <div className="response">
                {response && <p>Assistant: {response}</p>}
            </div>
            <div className="common-queries">
                <h2>Common Queries</h2>
                <ul>
                    {commonQueries.map((item, index) => (
                        <li key={index} onClick={() => handleQuery(item)} className="query-item">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Chatbot;