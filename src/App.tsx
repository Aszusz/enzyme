import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/reducers';
import { AC } from './redux/actions/actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { selectedDirectoryPath, loading, error } = useSelector((state: RootState) => state.file);

  const handleOpenDirectory = () => {
    dispatch(AC.OPEN_DIRECTORY_REQUEST({}));
  };

  return (
    <div className="container">
      <h1>Directory Dialog Demo</h1>

      <div className="button-container">
        <button onClick={handleOpenDirectory} disabled={loading}>
          Open Directory
        </button>
      </div>

      {loading && <p className="loading">Opening dialog...</p>}

      {selectedDirectoryPath && (
        <div className="path-container">
          <h2>Selected Directory</h2>
          <p className="path">{selectedDirectoryPath}</p>
        </div>
      )}

      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}

export default App;
