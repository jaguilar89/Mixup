import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';

function App() {
  return (
    <>
 <NavBar />
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='home' element={<Home />} />
    <Route path='login' element={<LoginForm />} />
    <Route path='signup' element={<SignupForm />} />
  </Routes>
  </>
  );
}

export default App;
