import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext";

const IsGuest = () => {
    const { user } = useContext(AuthContext);
    if (user.token) {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export default IsGuest;
