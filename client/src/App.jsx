import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log({ API_URL });

function App() {
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));

  // trigger use effect hook whenever token changes
  useEffect(() => {
    console.log("Token changed: ", token);
    if (token) {
      localStorage.setItem("TOKEN", token);
    }
  }, [token]);

  const onLogin = async () => {
    const resp = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "jakob@jake.com",
        password: "jake123",
      }),
    });

    const data = await resp.json();
    console.log(data.token);
    setToken(data.token);

    // store token also in LocalStorage
    // so it will survive page refreshes!
  };

  const onGetAnimals = async () => {
    const resp = await fetch(`${API_URL}/animals`, {
      headers: {
        Authorization: token,
      },
    });

    // token expired!
    if (resp.status === 401) {
    }

    const animals = await resp.json();
    console.log(animals);
  };

  const onLogout = () => {
    setToken(); // clear token from state
    localStorage.removeItem("TOKEN"); // clear token from localstorage
    console.log("Logged you out");
  };

  return (
    <div className="App">
      <header className="App-header">
        {!token && <button onClick={onLogin}>Login</button>}
        {token && <button onClick={onGetAnimals}>Get protected animals</button>}
        {token && <button onClick={onLogout}>Logout</button>}
      </header>
    </div>
  );
}

export default App;
