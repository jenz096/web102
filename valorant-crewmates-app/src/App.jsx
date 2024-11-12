import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateCrewmate from './pages/CreateCrewmate';
import Gallery from './pages/Gallery';
import CrewmateInfo from './pages/CrewmateInfo';
import EditCrewmateForm from './pages/EditCrewmateForm';
import './App.css';



function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/crewmate/:id" element={<CrewmateInfo />} />
            <Route path="/edit/:id" element={<EditCrewmateForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
