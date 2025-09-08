import { useEffect, useState, useContext } from "react";
import "./FriendsList.css";
import AuthContext from "../../contexts/AuthContext";
import LoadingContext from "../../contexts/LoadingContext";
import { getFriends } from "../../services/friendService";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  const { user } = useContext(AuthContext);
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
  const userId = user?.user?.userId;

  useEffect(() => {
    startLoading();
    if (!userId) return;
    getFriends(userId)
      .then((data) => {
        setFriends(data.friends || []);
        stopLoading();
      })
      .catch((err) => {
        console.error("Error fetching friends:", err);
      });
  }, [userId]);

  return (
    <div className="friends-container">
      <h2 className="friends-title">My Friends</h2>

      <ul className="friends-list">
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          friends.length === 0 && (
            <p className="requested-empty">You don't have any friends yet.</p>
          )
        )}
        {friends.map((friend) => (
          <li key={friend._id} className={`friend-item ${friend.status || ""}`}>
            <div className="friend-name">{friend.nickname}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
