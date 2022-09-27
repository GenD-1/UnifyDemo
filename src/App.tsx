import { Route, Routes, Navigate } from 'react-router-dom'
import EditorWraped from './pages/EditorWraped';

function App() {
  return (
    <div className="App h-screen">
      <Routes>
        <Route path="/" element={<EditorWraped />} />
        <Route path="/:id" element={<EditorWraped />} />
        {/* <Route path="*" element={<Navigate to="/" />}/> */}
      </Routes>
    </div>
  );
}

export default App;
