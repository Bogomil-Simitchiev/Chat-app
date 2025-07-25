import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { login } from "../../services/authService";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const loginHandler = (e) => {
    e.preventDefault();

    const { nickname, password } = Object.fromEntries(new FormData(e.target));
    login(nickname, password)
      .then((result) => {
        loginUser(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={loginHandler}>
        <h2 className="login-title">Login</h2>

        <input type="text" name="nickname" placeholder="Nickname" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <p className="register-link">
          Don't have an account? <Link to={"/register"}>Create one</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
