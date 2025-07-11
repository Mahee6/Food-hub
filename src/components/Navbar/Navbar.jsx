import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // true if logged in
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="navbar">
            <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

            <ul className="navbar-menu">
                <li onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</li>
                <li onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>
                    <a href='#explore-menu'>Menu</a>
                </li>
                <li onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>
                    <a href='#mobile-app'>Mobile-app</a>
                </li>
                <li onClick={() => setMenu("Contact-us")} className={menu === "Contact-us" ? "active" : ""}>
                    <a href='#footer-page'>Contact-us</a>
                </li>
            </ul>

            <div className="navbar-right">
                <Link to='/search'><img src={assets.search_icon} alt="Search" /></Link>

                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Basket" /></Link>
                    <div className="dot"></div>
                </div>

                {isLoggedIn ? (
                    <button className='btn' onClick={handleLogout}>{auth.currentUser.email}</button>
                ) : (
                    <button className='btn' onClick={() => setShowLogin(true)}>Sign In</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
