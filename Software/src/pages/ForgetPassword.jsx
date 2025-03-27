import React, { useState } from 'react';
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/assets/css/ForgetPassword.css';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await auth.sendPasswordResetEmail(email);
            toast.success('Password reset email sent! Check your inbox.');
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <div>
            <header>
                <nav className="navbar">
                    <div className="navbar-container">
                        <img src="/assets/img/icon.png" alt="Hydro Sense Logo" className="logo" />
                        <a className="navbar-brand" href="#">Hydro Sense</a>
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
            <h1 style={{marginTop: '100px'}}>Forget Password</h1>
            <form id="forget-password" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Password Reset Email</button>
                <br />
                <Link to="/login" className="forgetbtn">
                    <i className="fas fa-angle-left"></i> Back
                </Link>
            </form>
        </div>
    );
};

export default ForgetPassword;