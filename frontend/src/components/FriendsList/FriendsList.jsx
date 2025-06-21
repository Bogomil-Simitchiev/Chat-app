import "./FriendsList.css";

const mockFriends = [
  { id: 1, name: "Alice Johnson", status: "online" },
  { id: 2, name: "Bob Martinez", status: "offline" },
  { id: 3, name: "Clara Smith", status: "online" },
  { id: 4, name: "Alice Johnson", status: "online" },
  { id: 5, name: "Bob Martinez", status: "offline" },
  { id: 6, name: "Clara Smith", status: "online" },
];

const FriendsList = () => {
  return (
    <div className="friends-container">
      <h2 className="friends-title">My Friends</h2>
      <ul className="friends-list">
        {mockFriends.map((friend) => (
          <li key={friend.id} className={`friend-item ${friend.status}`}>
            <div className="friend-name">{friend.name}</div>
            <span className="friend-status">{friend.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
