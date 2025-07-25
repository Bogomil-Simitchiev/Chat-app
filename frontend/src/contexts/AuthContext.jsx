import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', {});

    const loginUser = (userData) => {
        if (userData.user == undefined) {
            alert("Invalid nickname or password!");
            return;
        }

        setUser({ user: userData.user, token: userData.token }); 
    }

    const logoutUser = () => { 
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{user, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}
