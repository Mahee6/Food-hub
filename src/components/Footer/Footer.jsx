import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer" id='footer-page'>
     
<div className="footer-right">
        <p><strong>📞 Contact Us</strong></p>
        <br>
        </br>
        <p>Phone: +91 98765 43210</p>
        <br>
        </br>
        <p>Email: mahee@foodiehub.com</p>
        <br>
        </br>
        <p>Address: 101, Food Street, Bengaluru, India</p>
        <br>
        </br>
      </div>
 <p>🍽️ FoodHub &copy; {new Date().getFullYear()} — All rights reserved</p>
      <div className="footer-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" />
        </a>
       <a href="https://www.google.com/maps?q=Food+Street,+Bengaluru,+India"
   target="_blank"
   rel="noopener noreferrer"
   title="View Location">
  <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
       alt="Location"
       width="24"
       height="24" />
</a>


      </div>
    </div>
  );
};

export default Footer;


