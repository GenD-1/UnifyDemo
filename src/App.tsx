import { Route, Routes, Navigate } from 'react-router-dom'
import EditorWrapedWithLiveBlock from './pages/EditorWrapedWithLiveBlock';
import EditorWraped from './pages/EditorWraped';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EditorWrapedWithLiveBlock />} />
        <Route path="/" element={<EditorWraped />} />
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;
