import { Route, Routes, Navigate } from 'react-router-dom'
import EditorWrapedWithLiveBlock from './pages/EditorWrapedWithLiveBlock';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EditorWrapedWithLiveBlock />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
