// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/", { email, password });

      if (res.data === "exist") {
        // Navigate to calendar if login is successful
        navigate("/calendar", { state: { id: email } });
      } else if (res.data === "notexist") {
        // Show alert if user is not registered
        alert("User has not signed up");
      } else if (res.data === "incorrect password") {
        // Show alert if password is incorrect
        alert("Incorrect password");
      }
    } catch (e) {
      alert("An error occurred during login");
      console.log(e);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={submit}>Login</button>
      </form>
      <p>or</p>
      <Link to="/signUp">Sign Up</Link>
    </>
  );
}
