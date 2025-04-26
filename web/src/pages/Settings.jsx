import "../components/assets/css/Dashboard.css";
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { SensorDataContext } from '../components/SensorDataContext';
import { useEffect } from 'react';
import { auth } from '../firebase';

const Settings = () => {
    const location = useLocation();
    const { setIsMonitoring } = useContext(SensorDataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        wifiGateway: '',
        deviceName: '',
        deviceId: '',
    });
    const [user, setUser] = useState(null);

    const { alerts } = useContext(SensorDataContext);

    useEffect(() => {
        // Fetch the current user from Firebase Authentication
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const handleClearLocalData = () => {
        if (window.confirm("Are you sure you want to clear all local data? This action cannot be undone.")) {
            localStorage.clear();
            alert("All local data has been cleared.");
            window.location.reload();
        }
    };

    const handleClearCookies = () => {
        if (window.confirm("Are you sure you want to clear all cookies except login-related ones?")) {
            const cookies = document.cookie.split(";");

            cookies.forEach((cookie) => {
                const cookieName = cookie.split("=")[0].trim();

                // Skip login-related cookies (e.g., "auth" or "session")
                if (!cookieName.includes("auth") && !cookieName.includes("session")) {
                    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                }
            });

            alert("All cookies except login-related ones have been cleared.");
            window.location.reload();
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            alert('Logged out successfully!');
            window.location.reload(); // Reload the page to reset the state
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out. Please try again.');
        }
    };

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
        let wifiGateway = formData.wifiGateway.trim();

        // Ensure the URL includes the protocol
        if (!wifiGateway.startsWith("http://") && !wifiGateway.startsWith("https://")) {
            wifiGateway = `http://${wifiGateway}`;
        }

        console.log('Setup Data:', { ...formData, wifiGateway });
        localStorage.setItem('sensorDataUrl', wifiGateway);
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
                        <li className={`nav-list-item ${location.pathname === '/pressure' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/chart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" ><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                                Water Distribution
                            </Link>
                        </li>
                        <li className={`nav-list-item ${location.pathname === '/hardware' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/pressure">
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
                        <li className={`nav-list-item ${location.pathname === '/feedback' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/feedback">
                                <svg aria-hidden="true" data-prefix="fal" data-icon="comment-alt-smile" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" class="svg-inline--fa fa-comment-alt-smile fa-w-16 fa-7x"><path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm32 352c0 17.6-14.4 32-32 32H293.3l-8.5 6.4L192 460v-76H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h384c17.6 0 32 14.4 32 32v288zM331.8 237.3C313 259.4 285.4 272 256 272s-57-12.6-75.8-34.6c-5.7-6.7-15.8-7.4-22.5-1.8-6.8 5.8-7.5 15.8-1.8 22.6C180.7 287.3 217.2 304 256 304s75.3-16.7 100.2-45.9c5.8-6.7 4.9-16.8-1.8-22.6-6.7-5.7-16.8-4.9-22.6 1.8zM192 184c13.3 0 24-10.7 24-24s-10.7-24-24-24-24 10.7-24 24 10.7 24 24 24zm128 0c13.3 0 24-10.7 24-24s-10.7-24-24-24-24 10.7-24 24 10.7 24 24 24z" class=""></path></svg>
                                Feedback
                            </Link>
                        </li>
                        <li className={`nav-list-item ${location.pathname === '/help' ? 'active' : ''}`}>
                            <Link className="nav-list-link" to="/help">
                                <svg xmlns="http://www.w3.org/2000/svg" color='' width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" /></svg>
                                Help
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
                        </div>
                        <div className="action-buttons">
                            <button className="buttons" onClick={handleClearLocalData}>
                                Clear Local Data
                            </button>
                            <button className="buttons" onClick={handleClearCookies}>
                                Clear Cookies
                            </button>
                        </div>
                    </div>
                    <div className="device-status">
                        <h3 className="device-status-header">Device Status</h3>
                        <div className="device-status-content">
                            <div className="device-status-item">
                                <h4>WiFi Gateway</h4>
                                <p>{formData.wifiGateway || "Not configured"}</p>
                            </div>
                            <div className="device-status-item">
                                <h4>Device Name</h4>
                                <p>{formData.deviceName || "Not configured"}</p>
                            </div>
                            <div className="device-status-item">
                                <h4>Device ID</h4>
                                <p>{formData.deviceId || "Not configured"}</p>
                            </div>
                        </div>
                        <button className="btn setup-btn" onClick={handleOpenModal}>
                            Set-up the Device
                        </button>
                    </div>
                    {/* Modal for Vega Board Setup */}
                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2 className="modal-title">Set-up Device</h2>
                                <form onSubmit={handleSubmit}>
                                    <label className="modal-label">
                                        WiFi Gateway URL:
                                        <input
                                            type="text"
                                            name="wifiGateway"
                                            value={formData.wifiGateway}
                                            onChange={handleInputChange}
                                            required
                                            className="modal-input"
                                        />
                                    </label>
                                    <label className="modal-label">
                                        Device Name:
                                        <input
                                            type="text"
                                            name="deviceName"
                                            value={formData.deviceName}
                                            onChange={handleInputChange}
                                            required
                                            className="modal-input"
                                        />
                                    </label>
                                    <label className="modal-label">
                                        Device ID:
                                        <input
                                            type="text"
                                            name="deviceId"
                                            value={formData.deviceId}
                                            onChange={handleInputChange}
                                            required
                                            className="modal-input"
                                        />
                                    </label>
                                    <div className="modal-buttons">
                                        <button type="submit" className="btn modal-submit-btn">Submit</button>
                                        <button type="button" className="btn modal-cancel-btn" onClick={handleCloseModal}>
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
                    <div className="profile-box">
                        {user ? (
                            <>
                                <div className="profile-photo-wrapper">
                                    <img
                                        src={user.photoURL || 'https://via.placeholder.com/150'}
                                        alt="profile"
                                    />
                                </div>
                                <p className="profile-text">{user.displayName || 'No Name Provided'}</p>
                                <p className="profile-subtext">User ID: {user.uid}</p>
                                <button onClick={handleLogout} className="btn logout-btn">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <p>Loading user data...</p>
                        )}
                    </div>
                    <div class="app-right-content">
                        <div class="app-right-section">
                            <div class="app-right-section-header">
                                <h2>Alerts</h2>
                                <span class="notification-active">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                                </span>
                            </div>
                            {alerts.length > 0 ? (
                                alerts.map((alert, index) => (
                                    <div key={index} class="activity-line">
                                        <span class="activity-icon warning">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                        </span>
                                        <div class="activity-text-wrapper">
                                            <p class="activity-text">{alert}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'white', textAlign: 'center' }}>No alerts at the moment.</p>
                            )}
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