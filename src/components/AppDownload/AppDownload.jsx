import React from 'react';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <div className="app-download" id='mobile-app'>
      <h2>📲 Download Our App</h2>
      <p>Order your favorite food anytime, anywhere.</p>

      <div className="app-buttons">
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
          />
        </a>
        <a href="https://www.apple.com/in/app-store/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
          />
        </a>
      </div>
    </div>
  );
};

export default AppDownload;
