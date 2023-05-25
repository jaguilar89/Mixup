import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';
import NewEventForm from './pages/NewEventForm';
import EventPage from './pages/EventPage';

function App() {
  const { user, setUser } = useContext(UserContext)
  const [events, setEvents] = useState([])

  return (
    <>
 <NavBar />
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/home' element={<Home user={user} events={events} setEvents={setEvents}/>} />
    <Route path='/login' element={<LoginForm setUser={setUser}/>} />
    <Route path='/login/signup' element={<SignupForm setUser={setUser}/>} />
    <Route path='/events/new' element={<NewEventForm setEvents={setEvents}/>} />
    <Route path='/events/:id' element={<EventPage />} />
  </Routes>
  </>
  );
}

export default App;
