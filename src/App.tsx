import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState("");

  async function pingServer() {
    try {
      const time = await invoke("ping");
      setCurrentTime(time as string);
    } catch (error) {
      console.error("Error pinging server:", error);
      setCurrentTime("Error: Could not get time from server");
    }
  }

  return (
    <main className="container">
      <h1>OS Time Ping App</h1>
      
      <div className="row">
        <button onClick={pingServer}>Ping Server</button>
      </div>
      
      {currentTime && (
        <div className="time-display">
          <h2>Current OS Time:</h2>
          <p>{currentTime}</p>
        </div>
      )}
    </main>
  );
}

export default App;
