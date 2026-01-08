import React, { useState, useEffect } from "react";
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (savedUser) {
      setForm({
        ...form,
        username: savedUser.username || "",
        email: savedUser.email || ""
      });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleCheckbox = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("userInfo", JSON.stringify({
        username: form.username,
        email: form.email
      }));
    } else {
      localStorage.removeItem("userInfo");
    }

    // Normally you'd validate and send to server here
    console.log("Form submitted:", form);
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label>Username</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />

        <div className="remember-me">
          <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={handleCheckbox} />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Login;
