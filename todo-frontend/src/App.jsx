import { useState } from "react";
import Login from "./Login";
import Todo from "./Todo";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  return (
    <div>
      {loggedIn ? (
        <Todo />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;

