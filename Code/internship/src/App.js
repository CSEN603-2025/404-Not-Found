import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectLoginType from './pages/SelectLoginType';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectLoginType />} />
        <Route path="/login/:role" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

