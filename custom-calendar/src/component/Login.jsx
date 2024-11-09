import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/", { email, password }).then((res) => {
        if (res.data === "exist") {
          history("/calendar", { state: { id: email } });
        } else {
          alert("User has not signed up");
        }
      }).catch((e) => {
        alert("Wrong details");
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>or</p>
      <Link to="/signUp"> Sign Up </Link>
    </>
  );
}
