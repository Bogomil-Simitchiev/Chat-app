import { Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound.jsx";
import Register from "../components/Register/Register.jsx";
import Login from "../components/Login/Login.jsx";

const AppRoutes = () => (
    <Routes>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;