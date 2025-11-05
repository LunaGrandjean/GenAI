import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import logo from './assets/griffith-white.png';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';
import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';
import About from './components/About';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-video-section">
      <video autoPlay muted loop playsInline className="video-background">
        <source src="/home-video.mp4" type="video/mp4" />
        Your browser does not support the video tag. Please reload or try a different borwser. 
      </video>

      <div className="video-overlay-content">
        <h1 className="home-title">Welcome to Griffith AI</h1>
        <p className="home-subtitle">Your virtual guide to Griffith College information.</p>
        <button className="home-btn" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname === '/chat') {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="app">
      <header className="griffith-header">
        <div className="header-left">
          <img src={logo} alt="Griffith Logo" className="griffith-logo" />

          <nav className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/how-it-works" className="nav-link">How it Works</a>
            <a href="/about" className="nav-link">About Us</a>
            {isLoggedIn && (
              <a href="/chat" className="nav-link">Conversations</a>
            )}
          </nav>
        </div>

        <div className="header-right">
          {isLoggedIn ? (
            <button className="griffith-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="griffith-btn" onClick={() => navigate('/login')}>Login / Register</button>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/chat" element={isLoggedIn ? <Chat username={username} /> : <HomePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}