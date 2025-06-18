import { Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound.jsx";

const AppRoutes = () => (
    <Routes>
        { /* Define Login and Register routes here */ }
      <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;