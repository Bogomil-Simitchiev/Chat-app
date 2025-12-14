import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import socket from "../../socket/socket.js";
import { getOrCreateChat, getMessages } from "../../services/messageService";
import "./Messages.css";

const Messages = () => {
  const { friendId, nickname } = useParams();
  const { user } = useContext(AuthContext);
  const userId = user?.user?.userId;

  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!userId || !friendId) return;

    getOrCreateChat(userId, friendId)
      .then((chat) => {
        setChatId(chat._id);

        socket.emit("joinChat", {
          chatId: chat._id,
          userId,
        });
      })
      .catch((err) => console.error("Chat error:", err));
  }, [userId, friendId]);

  useEffect(() => {
    if (!chatId || !userId) return;

    getMessages(chatId, userId)
      .then((data) => setMessages(data))
      .catch((err) => console.error("Messages error:", err));
  }, [chatId, userId]);

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("newMessage");
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    socket.emit("sendMessage", {
      chatId,
      senderId: userId,
      content: inputValue,
    });

    setInputValue("");
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages-container">
      <div className="messages-header">
        <span className="friend-nickname">Chat with {nickname}</span>
      </div>

      <div className="messages-body">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message-bubble ${
              msg.sender._id === userId ? "sent" : "received"
            }`}
          >
            <div className="message-text">{msg.content}</div>
            <div className="message-time">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="messages-footer">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
