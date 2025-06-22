import { useState, useRef, useEffect } from 'react';
import './Messages.css';

const initialMessages = [
  { id: 1, sender: 'You', content: 'Hey Kolega! How are you?', time: '10:01 AM' },
  { id: 2, sender: 'Kolegata', content: "Hi! I'm good, thanks. What about you?", time: '10:02 AM' },
  { id: 3, sender: 'You', content: "I'm doing great! Excited for the weekend?", time: '10:03 AM' },
  { id: 4, sender: 'Kolegata', content: 'Absolutely! Any plans?', time: '10:04 AM' }
];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messageEndRef = useRef(null);
  const recipient = 'Kolegata';

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      content: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h2>Chat with {recipient}</h2>
      </div>

      <div className="messages-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'}`}
          >
            <div className="message-text">{msg.content}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="messages-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
