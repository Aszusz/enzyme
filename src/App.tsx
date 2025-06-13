import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/reducers';
import { openFileRequest } from './redux/actions/fileActions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { selectedPath, loading, error } = useSelector((state: RootState) => state.file);

  const handleOpenFile = () => {
    dispatch(openFileRequest());
  };

  return (
    <div className="container">
      <h1>File Dialog Demo</h1>
      
      <div className="button-container">
        <button onClick={handleOpenFile} disabled={loading}>Open File</button>
      </div>
      
      {loading && <p className="loading">Opening dialog...</p>}
      
      {selectedPath && (
        <div className="path-container">
          <h2>Selected Path</h2>
          <p className="path">{selectedPath}</p>
        </div>
      )}
      
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}

export default App;
