import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import ShopPage from './pages/Shoppage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StoryPage from './pages/StoryPage';
import TutorialsPage from './pages/TutorialsPage';
import MentorsPage from './pages/MentorsPage';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/story/:productId" element={<StoryPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/mentors" element={<MentorsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
