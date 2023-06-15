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
import Footer from './components/Footer';
import NewProfileForm from './pages/NewProfileForm';
import UserProfile from './pages/UserProfile';

function App() {
  const { user, setUser } = useContext(UserContext)
  const [events, setEvents] = useState([])

  return (
    <>
 <NavBar />
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/home' element={<Home user={user} setUser={setUser} events={events} setEvents={setEvents}/>} />
    <Route path='/login' element={<LoginForm setUser={setUser}/>} />
    <Route path='/login/signup' element={<SignupForm setUser={setUser}/>} />
    <Route path='/events/new' element={<NewEventForm setEvents={setEvents}/>} />
    <Route path='/events/:eventId' element={<EventPage user={user} events={events} setEvents={events}/>} />
    <Route path='/profile/new' element={<NewProfileForm />} />
    <Route path='/profile/:id' element={<UserProfile />} />
    <Route path='*' element={<LandingPage />} />
  </Routes>
  <Footer />
  </>
  );
}

export default App;
