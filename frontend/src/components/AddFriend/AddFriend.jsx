import { useContext, useState } from "react";
import "./AddFriend.css";
import AuthContext from "../../contexts/AuthContext";
import { addFriend } from "../../services/friendService";

const AddFriend = () => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);

  const handleAddFriend = async (e) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setMessage("Please enter a nickname.");
      return;
    }

    addFriend(user.user.nickname, nickname)
      .then((result) => {
        setMessage(result.message);
        setNickname("");
      })
      .catch((err) => console.log(err));
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
