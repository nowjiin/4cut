import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrameSelector from './components/FrameSelector';
import PhotoBooth from './components/PhotoBooth';
import PhotoSelection from './components/PhotoSelection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FrameSelector />} />
        <Route path='/photo-booth' element={<PhotoBooth />} />
        <Route path='/photo-selection' element={<PhotoSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
