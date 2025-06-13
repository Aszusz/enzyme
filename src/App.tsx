import { useDispatch, useSelector } from "react-redux";
import { fetchTimeRequest } from "./redux/actions/timeActions";
import { RootState } from "./redux/reducers";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { currentTime, loading, error } = useSelector((state: RootState) => state.time);

  // Function to dispatch the ping action
  const pingServer = () => {
    dispatch(fetchTimeRequest());
  };

  return (
    <main className="container">
      <h1>OS Time Ping App</h1>
      
      <div className="row">
        <button onClick={pingServer} disabled={loading}>
          {loading ? "Loading..." : "Ping Server"}
        </button>
      </div>
      
      {error && (
        <div className="error-display">
          <p>Error: {error}</p>
        </div>
      )}
      
      {currentTime && !error && (
        <div className="time-display">
          <h2>Current OS Time:</h2>
          <p>{currentTime}</p>
        </div>
      )}
    </main>
  );
}

export default App;
