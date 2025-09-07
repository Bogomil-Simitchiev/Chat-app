import { useEffect, useState, useContext } from "react";
import "./RequestedList.css";
import AuthContext from "../../contexts/AuthContext";
import { getRequestedPeople } from "../../services/friendService";
import LoadingContext from "../../contexts/LoadingContext";

const RequestedList = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

   const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

  const { user } = useContext(AuthContext);
  const userId = user?.user?.userId;

  useEffect(() => {
    startLoading();
    if (!userId) return;
    getRequestedPeople(userId)
      .then((data) => {
        setRequests(data.requests || []);
        setMessage(data.message || "");
        stopLoading();
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setRequests([]);
        setMessage("Server error while fetching requests.");
      });
  }, [userId]);

  // Accept friend request
  const handleAccept = async () => {
    // Implementation for accepting a friend request goes here
    // test for the branch
  };

  // Decline friend request
  const handleDecline = async () => {
    // Implementation for declining a friend request goes here
  };

  return (
    <div className="requested-container">
      <h2 className="requested-title">Friend Requests</h2>

      {message && <p className="requested-message">{message}</p>}

      <ul className="requested-list">
        {isLoading ? <h3>Loading...</h3> : requests.length === 0 &&  <p className="requested-empty">No pending friend requests.</p>}
        {requests.map((friend) => (
          <li key={friend._id} className="requested-item">
            <div className="requested-name">{friend.nickname}</div>

            <div className="requested-actions">
              <span className="accept" onClick={() => handleAccept(friend._id)}>
                Accept
              </span>
              <span
                className="decline"
                onClick={() => handleDecline(friend._id)}
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
