import { Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound.jsx";
import Register from "../components/Register/Register.jsx";
import Login from "../components/Login/Login.jsx";
import Home from "../components/Home/Home.jsx";
import FriendsList from "../components/FriendsList/FriendsList.jsx";
import RequestedList from "../components/RequestedList/RequestedList.jsx";
import AddFriend from "../components/AddFriend/AddFriend.jsx";
import Messages from "../components/Messages/Messages.jsx";
import IsUser from "../guards/IsUser.jsx";
import IsGuest from "../guards/IsGuest.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    // for logged-in users
    <Route element={<IsUser />}>
      <Route path="/messages/:friendId/:nickname" element={<Messages />} />
      <Route path="/add-friend" element={<AddFriend />} />
      <Route path="/requests" element={<RequestedList />} />
      <Route path="/friends" element={<FriendsList />} />
    </Route>
    // for guests
    <Route element={<IsGuest />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
