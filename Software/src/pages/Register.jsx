import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/assets/css/Register.css";
import { registerInitiate } from '../redux/actions';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Register = () => {
    const [state, setState] = useState({
        displayName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const { currentUser } = useSelector((state) => state.user);
    const [captchaToken, setCaptchaToken] = useState(null);

    const history = useHistory();

    useEffect(() => {
        if (currentUser) {
            history.push("/dashboard");
            toast.success("Registration successful!");
        }
    }, [currentUser, history]);

    const dispatch = useDispatch();

    const { email, password, displayName, passwordConfirm } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm || !email || !password || !displayName || !captchaToken) {
            toast.error("Please fill in all fields correctly and complete the captcha");
            return;
        }
        dispatch(registerInitiate(email, password, displayName));
        setState({ email: "", displayName: "", password: "", passwordConfirm: "" });
        toast.success("Registration initiated");
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    }

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
            <div id="register-form">
                <form className='form-signup' onSubmit={handleSubmit}>
                    <h1 className='h3 mb-3 font-weight-normal' style={{ textAlign: "center" }}>Sign Up</h1>

                    <input type="text"
                        id='displayName'
                        className='form-control'
                        name='displayName'
                        placeholder='Full Name'
                        onChange={handleChange}
                        value={displayName}
                        required />

                    <input type="email"
                        id='user-email'
                        className='form-control'
                        name='email'
                        placeholder='Email Address'
                        onChange={handleChange}
                        value={email}
                        required />

                    <input type="password"
                        id='inputPassword'
                        className='form-control'
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                        value={password}
                        required />

                    <input type="password"
                        id='inputRePassword'
                        className='form-control'
                        name='passwordConfirm'
                        placeholder='Repeat Password'
                        onChange={handleChange}
                        value={passwordConfirm}
                        required />

                    <div className="captcha-wrapper">
                        <HCaptcha
                            sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
                            onVerify={handleCaptchaChange}
                        />
                    </div>

                    <button className='btn btn-primary mx-auto ' type='submit' >
                        <i className='fas fa-user-plus'></i> Sign Up</button>
                    <Link to="/login" className="btn btn-secondary mx-auto">
                        Back
                    </Link>
                </form>
                <br />
            </div>
        </div>
    );
};

export default Register;