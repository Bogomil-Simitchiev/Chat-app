import { useEffect, useState, useContext } from "react";
import "./RequestedList.css";
import AuthContext from "../../contexts/AuthContext";
import { acceptFriendRequest, declineFriendRequest, getRequestedPeople } from "../../services/friendService";
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

  const handleAccept = async (requesterId) => {
    acceptFriendRequest(requesterId, userId)
      .then(() => {
        setRequests((prev) => prev.filter((req) => req._id !== requesterId));
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setRequests([]);
        setMessage("Server error while fetching requests.");
      });
  };

  const handleDecline = async (requesterId) => {
    declineFriendRequest(requesterId, userId)
      .then(() => {
        setRequests((prev) => prev.filter((req) => req._id !== requesterId));
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setRequests([]);
        setMessage("Server error while fetching requests.");
      });
  };

  return (
    <div className="requested-container">
      <h2 className="requested-title">Friend Requests</h2>

      {message && <p className="requested-message">{message}</p>}

      <ul className="requested-list">
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          requests.length === 0 && (
            <p className="requested-empty">No pending friend requests.</p>
          )
        )}
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
