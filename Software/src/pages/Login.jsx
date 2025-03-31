import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/assets/css/Login.css";
import '../components/assets/css/Home.css'
import { googleSignInInitiate, loginInitiate, githubSignInInitiate } from '../redux/actions';

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [captchaToken, setCaptchaToken] = useState(null);

    const { currentUser } = useSelector((state) => state.user);
    const history = useHistory();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (currentUser) {
            history.push("/dashboard");
            toast.success("Login successful!");
        }
    }, [currentUser, history]);

    const dispatch = useDispatch();
    const { email, password } = state;

    const handleGoogleSignIn = () => {
        dispatch(googleSignInInitiate());
        toast.info("Google sign-in initiated");
    };

    // const handleFBSignIn = () => {
    //     dispatch(fbSignInInitiate());
    //     toast.info("Facebook sign-in initiated");
    // };

    const handleGithubSignIn = () => {
        dispatch(githubSignInInitiate());
        toast.info("Github sign-in initiated");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !captchaToken) {
            toast.error("Please fill in all fields and complete the captcha");
            return;
        }
        dispatch(loginInitiate(email, password));
        setState({ email: "", password: "" });
        toast.success("Login initiated");
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
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
            <div id="logreg-forms">
                <form className='form-signin' onSubmit={handleSubmit}>
                    <h1 className='h3 mb-3'>Sign In</h1>
                    <input type="email"
                        id='inputEmail'
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

                    <div className="captcha-wrapper">
                        <HCaptcha
                            sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
                            onVerify={handleCaptchaChange}
                        />
                    </div>

                    <div className="social-login">
                        <button className='btn social-btn' type='submit'>
                            <i className='fas fa-sign-in-alt'></i> Sign In
                        </button>
                    </div>

                    <p>OR</p>

                    <div className="social-login">
                        <button className='btn btn-primary github-btn' type='button' onClick={handleGoogleSignIn}>Sign in with Google</button>
                    </div>
                    <div className="social-login">
                        <button className='btn btn-primary google-btn' type='button' onClick={handleGoogleSignIn}>Sign in with Google</button>
                    </div>

                    <hr />
                    <p>Don't have an account?</p>
                    <div className="social-login">
                        <Link to="/forget-password">
                            <button className='btn btn-primary' type='button' id='forgot_pswd'> Forgot password?</button>
                        </Link>
                        <Link to="/register">
                            <button className='btn btn-primary' type='button' id='btn-signup'>
                                <i className='fas fa-user-plus'></i> Sign Up New Account
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;