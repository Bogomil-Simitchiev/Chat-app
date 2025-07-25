import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { register } from "../../services/authService";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const { loginUser } = useContext(AuthContext);

  const registerHandler = (e) => {
    e.preventDefault();

    const { email, nickname, password, confirmPassword } = Object.fromEntries(
      new FormData(e.target)
    );

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    register(email, nickname, password)
      .then((result) => {
        loginUser(result);
        e.target.reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={registerHandler}>
        <h2 className="register-title">Create Account</h2>

        <input type="text" name="nickname" placeholder="Nickname" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
