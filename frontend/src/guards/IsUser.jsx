import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext";

const IsUser = () => {
    const { user } = useContext(AuthContext);
    if (!user.token) {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export default IsUser;
