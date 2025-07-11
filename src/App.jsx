import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Placeorder from './pages/Placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import AppDownload from './components/AppDownload/AppDownload';
import LoginPopup from './components/LoginPopup/LoginPopup';
import SignUpPopup from './components/LoginPopup/SignUpPopup';
import Cart from './components/Cart/Cart';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import SearchFood from './components/Search/Search';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Show login popup conditionally */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        {/* Pass setShowLogin to Navbar to trigger popup */}
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/signup" element={<SignUpPopup />} />
          <Route path="/cheakout" element={<PlaceOrder />} />
          <Route path="/search" element={<SearchFood />} />
        </Routes>

        <AppDownload />
        <Footer />
      </div>
    </>
  );
};

export default App;
