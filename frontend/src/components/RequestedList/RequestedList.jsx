import { useEffect, useState, useContext } from "react";
import "./RequestedList.css";
import AuthContext from "../../contexts/AuthContext";
import { acceptFriendRequest, declineFriendRequest, getRequestedPeople } from "../../services/friendService";
import LoadingContext from "../../contexts/LoadingContext";

const RequestedList = () => {
  const [requests, setRequests] = useState([]);
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

  const { user } = useContext(AuthContext);
  const userId = user?.user?.userId;

  useEffect(() => {
    startLoading();
    if (!userId) return;
    getRequestedPeople(userId)
      .then((data) => {
        setRequests(data.requests || []);
        stopLoading();
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setRequests([]);
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
      });
  };

  return (
    <div className="requested-container">
      <h2 className="requested-title">Friend Requests</h2>
      <ul className="requested-list">
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          requests.length === 0 && (
            <p className="requested-empty">No pending friend requests.</p>
          )
        )}
        {requests.map((requester) => (
          <li key={requester._id} className="requested-item">
            <div className="requested-name">{requester.nickname}</div>

            <div className="requested-actions">
              <span className="accept" onClick={() => handleAccept(requester._id)}>
                Accept
              </span>
              <span
                className="decline"
                onClick={() => handleDecline(requester._id)}
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
