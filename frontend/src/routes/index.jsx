import { Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound.jsx";
import Register from "../components/Register/Register.jsx";
import Login from "../components/Login/Login.jsx";
import Home from "../components/Home/Home.jsx";
import FriendsList from "../components/FriendsList/FriendsList.jsx";
import RequestedList from "../components/RequestedList/RequestedList.jsx";
import AddFriend from "../components/AddFriend/AddFriend.jsx";
import Messages from "../components/Messages/Messages.jsx";

const AppRoutes = () => (
    <Routes>
      <Route path="/messages" element={<Messages />} />
      <Route path="/add-friend" element={<AddFriend />} />
      <Route path="/requests" element={<RequestedList />} />
      <Route path="/friends" element={<FriendsList />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
