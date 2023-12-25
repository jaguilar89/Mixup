import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/ui/NavBar';
import LoginForm from './components/user_forms/LoginForm';
import SignupForm from './components/user_forms/SignupForm';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';
import NewEventForm from './components/events/NewEventForm';
import EventPage from './components/events/EventPage';
import Footer from './components/ui/Footer';
import NewProfileForm from './components/user_forms/NewProfileForm';
import UserProfile from './pages/UserProfile';
import PrivateRoutes from './components/pages/PrivateRoutes';
import PasswordResetForm from './components/user_forms/PasswordResetForm';
import PasswordResetRequestForm from './components/user_forms/PasswordResetRequestForm';
import ErrorPage from './pages/ErrorPage';

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
        <Route path='/login/password/reset/edit/:token' element={<PasswordResetForm />} />
        <Route path='*' element={<ErrorPage />} />
        
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

