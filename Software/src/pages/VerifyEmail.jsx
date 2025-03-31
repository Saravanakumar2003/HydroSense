import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { logoutInitiate } from '../redux/actions';
import { useDispatch } from 'react-redux';
import '../components/assets/css/VerifyEmail.css'
import '../components/assets/css/Home.css'

const VerifyEmail = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            setUser(auth.currentUser);
        }
    }, [currentUser]);

    const resendVerificationEmail = () => {
        if (user) {
            user.sendEmailVerification().then(() => {
                toast.success("Verification email sent!");
            }).catch((error) => {
                toast.error(error.message);
            });
        }
    };

    const handleAuth = () => {
        if (currentUser) {
            dispatch(logoutInitiate());
            toast.success("Logged out successfully!");
        }
    };

    return (
        <div>
      <header>
        <nav className="navbar">
          <div className="navbar-container">
          <div className="logo-brand">
              <img src="/assets/img/icon.png" alt="Hydro Sense Logo" className="logo" />
              <a className="navbar-brand" href="#">Hydro Sense</a>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={`menu ${isMenuOpen ? "open" : ""}`}>
              <ul className="navbar-nav">
                <li className="nav-item"><a className="nav-link" href="/#home">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/#about">About</a></li>
                <li className="nav-item"><a className="nav-link" href="/#services">Features</a></li>
                <li className="nav-item"><a className="nav-link" href="/#showcase">Screenshots</a></li>
                <li className="nav-item"><a className="nav-link" href="/#download">Download</a></li>
                <li className="nav-item"><a className="nav-link" href="/#contact">Contact</a></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
            <ToastContainer position="bottom-right" />
            <h1 style={{marginTop: '100px'}}>Please verify your email</h1>
            <p>A verification email has been sent to your email address. Please check your inbox and verify your email.</p>
            <button onClick={resendVerificationEmail}>Resend Verification Email</button>
            <button onClick={handleAuth}>Logout</button>
            <br />
            <Link to="/login">
                <i className="fas fa-angle-left"></i> Back
            </Link>
        </div>
    );
};

export default VerifyEmail;