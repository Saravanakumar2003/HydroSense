import "../components/assets/css/Dashboard.css";
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { SensorDataContext } from '../components/SensorDataContext';
import { useEffect } from 'react';


const Settings = () => {
    const location = useLocation();
    const { setIsMonitoring } = useContext(SensorDataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        wifiGateway: '',
        deviceName: '',
        deviceId: '',
    });

    const handleEnableTestMode = () => {
        setIsMonitoring(false); // Stop monitoring before switching URL
        localStorage.setItem('sensorDataUrl', 'https://hydrosense.pythonanywhere.com/');
        alert('Test mode enabled. URL switched to test endpoint.');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Setup Data:', formData);
        localStorage.setItem('sensorDataUrl', formData.wifiGateway);
        alert('Device setup completed successfully!');
        setIsModalOpen(false);
    };

    useEffect(() => {
        const openRightArea = () => document.querySelector('.app-right').classList.add('show');
        const closeRightArea = () => document.querySelector('.app-right').classList.remove('show');
        const openMenu = () => document.querySelector('.app-left').classList.add('show');
        const closeMenu = () => document.querySelector('.app-left').classList.remove('show');

        document.querySelector('.open-right-area').addEventListener('click', openRightArea);
        document.querySelector('.close-right').addEventListener('click', closeRightArea);
        document.querySelector('.menu-button').addEventListener('click', openMenu);
        document.querySelector('.close-menu').addEventListener('click', closeMenu);

        return () => {
            document.querySelector('.open-right-area').removeEventListener('click', openRightArea);
            document.querySelector('.close-right').removeEventListener('click', closeRightArea);
            document.querySelector('.menu-button').removeEventListener('click', openMenu);
            document.querySelector('.close-menu').removeEventListener('click', closeMenu);
        };
    }, []);

    return (
        <div>
            <div class="app-container">
                <div class="app-left">
                    <button class="close-menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                    <div className="app-logo">
                        <img src={require("../components/assets/img/icon.png")} alt="logo" />
                        <span>HydroSense</span>
                    </div>
                    <ul className="nav-list">
                        <li className={`nav-list-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-columns"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" /></svg>
                                Dashboard
                            </Link>
                        </li>
                        <li className={`nav-list-item ${location.pathname === '/chart' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/chart">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <line x1="12" x2="12" y1="20" y2="10" />
                                    <line x1="18" x2="18" y1="20" y2="4" />
                                    <line x1="6" x2="6" y1="20" y2="16" />
                                </svg>
                                Charts
                            </Link>
                        </li>
                        <li className={`nav-list-item ${location.pathname === '/hardware' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/hardware">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <rect height="16" rx="2" ry="2" width="16" x="4" y="4" />
                                    <rect height="6" width="6" x="9" y="9" />
                                    <line x1="9" x2="9" y1="1" y2="4" />
                                    <line x1="15" x2="15" y1="1" y2="4" />
                                    <line x1="9" x2="9" y1="20" y2="23" />
                                    <line x1="15" x2="15" y1="20" y2="23" />
                                    <line x1="20" x2="23" y1="9" y2="9" />
                                    <line x1="20" x2="23" y1="14" y2="14" />
                                    <line x1="1" x2="4" y1="9" y2="9" />
                                    <line x1="1" x2="4" y1="14" y2="14" />
                                </svg>
                                Hardware
                            </Link>
                        </li>
                        <li className={`nav-list-item ${location.pathname === '/ai' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/ai">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1="12" x2="12" y1="22.08" y2="12" />
                                </svg>
                                Artificial Intelligence
                            </Link>
                        </li>
                        <li className={`nav-list-item ${location.pathname === '/cloud' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/cloud">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                                </svg>
                                Cloud
                            </Link>
                        </li>

                        <li className={`nav-list-item ${location.pathname === '/reports' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/reports">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
                                Reports
                            </Link>
                        </li>
                        <li className={`nav-list-item ${location.pathname === '/profile' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/profile">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Profile
                            </Link>
                        </li>
                        <li className={`nav-list-item ${location.pathname === '/settings' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/settings">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                                Settings
                            </Link>
                        </li>
                    </ul>
                </div>
                <div class="app-main">
                    <div class="main-header-line">
                        <div className="action-buttons">
                            <h1>Settings</h1>
                            <button className="open-right-area">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                            </button>
                            <button className="menu-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                            </button>
                        </div>
                        <div className="action-buttons">
                            <button className="buttons" onClick={handleEnableTestMode}>
                                Enable test mode
                            </button>
                            <button className="buttons" onClick={handleOpenModal}>
                                Set-up Vega Board
                            </button>
                        </div>
                    </div>
                    {/* Modal for Vega Board Setup */}
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Set-up Vega Board</h2>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        WiFi Gateway Url:
                                        <input
                                            type="text"
                                            name="wifiGateway"
                                            value={formData.wifiGateway}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Device Name:
                                        <input
                                            type="text"
                                            name="deviceName"
                                            value={formData.deviceName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Device ID:
                                        <input
                                            type="text"
                                            name="deviceId"
                                            value={formData.deviceId}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </label>
                                    <div className="modal-actions">
                                        <button type="submit" className="btn">Submit</button>
                                        <button type="button" className="btn" onClick={handleCloseModal}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                <div class="app-right">
                    <button class="close-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                    <div class="profile-box">
                        <div class="profile-photo-wrapper">
                            <img src="https://avatars.githubusercontent.com/u/100985347?v=4" alt="profile"></img>
                        </div>
                        <p class="profile-text">Saravanakumar R</p>
                        <p class="profile-subtext">Velammal Engineering College</p>
                    </div>
                    <div class="app-right-content">
                        <div class="app-right-section">
                            <div class="app-right-section-header">
                                <h2>Alerts</h2>
                                <span class="notification-active">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                                </span>
                            </div>
                            <div class="activity-line">
                                <span class="activity-icon warning">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                </span>
                                <div class="activity-text-wrapper">
                                    <p class="activity-text">This is a test alert message, <strong>Alert!!</strong></p>
                                </div>
                            </div>
                        </div>
                        <div class="app-right-section">
                            <div class="app-right-section-header">
                                <h2>Announcements</h2>
                                <span class="notification-active">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                </span>
                            </div>
                            <div class="activity-line">
                                <span class="activity-icon applicant">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                                </span>
                                <div class="activity-text-wrapper">
                                    <p class="activity-text">Exciting News! The first beta version of Hydro Sense is now live! Experience real-time water quality monitoring with AI-powered insights.</p>
                                </div>
                            </div>
                            <div class="activity-line">
                                <span class="activity-icon applicant">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                                </span>
                                <div class="activity-text-wrapper">
                                    <p class="activity-text">Join the Revolution! We are looking for early adopters to test Hydro Sense and provide valuable insights.</p>
                                </div>
                            </div>
                            <div class="activity-line">
                                <span class="activity-icon applicant">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                                </span>
                                <div class="activity-text-wrapper">
                                    <p class="activity-text">Smarter. Faster. More Accurate. Hydro Sense has been upgraded with a new AI-powered water quality prediction model using Support Vector Machine (SVM). </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings 