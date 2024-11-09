import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/signup", { email, password }).then((res) => {
        if (res.data === "exist") {
          alert("User already exists");
        } else {
          history("/calendar", { state: { id: email } });
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
      <h1>Sign Up</h1>
      <form>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>or</p>
      <Link to="/"> Log In </Link>
    </>
  );
}
