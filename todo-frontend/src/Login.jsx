import { useState } from "react";
import axios from "axios";

export default function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/token/",
      { username, password }
    );

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    setLoggedIn(true);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}