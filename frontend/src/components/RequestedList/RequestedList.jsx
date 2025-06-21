import "./RequestedList.css";

const mockFriends = [
  { id: 1, name: "Alice Johnson", status: "online" },
  { id: 2, name: "Bob Martinez", status: "offline" },
  { id: 3, name: "Clara Smith", status: "online" },
  { id: 4, name: "David Lee", status: "online" },
  { id: 5, name: "Eva Turner", status: "offline" },
  { id: 6, name: "Frank Zhao", status: "online" },
];

const RequestedList = () => {
  const handleAccept = (id) => {
    console.log(`Accepted request from user ID ${id}`);
  };

  const handleDecline = (id) => {
    console.log(`Declined request from user ID ${id}`);
  };

  return (
    <div className="requested-container">
      <h2 className="requested-title">Friend Requests</h2>
      <ul className="requested-list">
        {mockFriends.map((friend) => (
          <li key={friend.id} className={`requested-item ${friend.status}`}>
            <div className="requested-name">{friend.name}</div>

            <div className="requested-actions">
              <span className="accept" onClick={() => handleAccept(friend.id)}>
                Accept
              </span>
              <span
                className="decline"
                onClick={() => handleDecline(friend.id)}
              >
                Decline
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestedList;
