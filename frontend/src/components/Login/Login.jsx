import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    nickname: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Login user:", form);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={form.nickname}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <p className="register-link">Don't have an account? <Link to={'/register'}>Create one</Link></p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
