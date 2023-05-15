import { Routes, Route } from 'react-router-dom';
import './App.css';
import EventCard from './components/EventCard';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
 <NavBar />
  <EventCard/>
  <EventCard/>
  <EventCard/>
  <EventCard/>
  <EventCard/>
  </>
  );
}

export default App;
