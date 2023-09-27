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
import PrivateRoutes from './components/PrivateRoutes';
import PasswordResetForm from './pages/PasswordResetForm';
import PasswordResetRequestForm from './pages/PasswordResetRequestForm';

export default function App() {
  const { user, setUser } = useContext(UserContext)
  const [events, setEvents] = useState([])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginForm setUser={setUser} />} />
        <Route path='/login/signup' element={<SignupForm setUser={setUser} />} />
        <Route path='/login/password/reset' element={<PasswordResetRequestForm />} />
        <Route path='/login/password/reset/edit' element={<PasswordResetForm />} />
        
        {/*Protected Routes */}
        <Route element={<PrivateRoutes />} >
          <Route path='/home' element={<Home user={user} setUser={setUser} events={events} setEvents={setEvents} />} />
          <Route path='/events/new' element={<NewEventForm setEvents={setEvents} />} />
          <Route path='/events/:eventId' element={<EventPage user={user} events={events} setEvents={events} />} />
          <Route path='/profiles/new' element={<NewProfileForm />} />
          <Route path='/profiles/:id' element={<UserProfile user={user}/>} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

