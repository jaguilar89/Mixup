import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import NewEvent from './pages/NewEvent';

function App() {
  const { user, setUser } = useContext(UserContext)

  return (
    <>
 <NavBar />
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/home' element={<Home user={user} />} />
    <Route path='/login' element={<LoginForm setUser={setUser}/>} />
    <Route path='/login/signup' element={<SignupForm setUser={setUser}/>} />
    <Route path='/events/new' element={<NewEvent />} />
  </Routes>
  </>
  );
}

export default App;
