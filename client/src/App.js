import { Routes, Route } from 'react-router-dom';
import './App.css';
import EventCard from './components/EventCard';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
 <NavBar />
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/login' element={<LoginForm />} />
  </Routes>
  </>
  );
}

export default App;
