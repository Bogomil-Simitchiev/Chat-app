import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import AuthContext from "../../contexts/AuthContext";
import { logout } from "../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUsers, faBell, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const logoutHandler = () => {
    logout()
      .then((result) => {
        logoutUser(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Talkie
        </Link>
        <nav className="nav-links">
          {user.token ? (
            <>
              <Link to={"/requests"} className="nav-link">
                <FontAwesomeIcon icon={faBell} />
              </Link>
              <Link to={"/friends"} className="nav-link">
                <FontAwesomeIcon icon={faUsers} />
              </Link>
              <Link to={"/add-friend"} className="nav-link">
                <FontAwesomeIcon icon={faUserPlus} />
              </Link>
              <Link onClick={logoutHandler} className="nav-link">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
