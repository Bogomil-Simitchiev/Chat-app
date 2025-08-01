import { useState } from 'react';
import './AddFriend.css';

const AddFriend = () => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  const handleAddFriend = async (e) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setMessage('Please enter a nickname.');
      return;
    }
    // TODO: Replace with actual API call to send friend request
    
    setMessage(`Friend request sent to ${nickname}`);
    setNickname('');
  };

  return (
    <div className="add-friend-container">
      <h2 className="add-friend-title">Add a Friend</h2>
      <form onSubmit={handleAddFriend} className="add-friend-form">
        <input
          type="text"
          placeholder="Enter friend's nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button type="submit">Send Request</button>
      </form>
      {message && <p className="add-friend-message">{message}</p>}
    </div>
  );
};

export default AddFriend;
