import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import Dashboard from './pages/Dashboard';
import EditTaskPage from './pages/EditTaskPage';
import CreateTaskPage from './pages/CreateTaskPage';

function App() {
  return (
    <Router>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:taskId" element={<EditTaskPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
