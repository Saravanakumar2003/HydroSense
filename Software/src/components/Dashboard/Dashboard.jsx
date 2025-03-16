import React, { useState } from 'react';
import { useEffect } from 'react';
import "../assets/css/Dashboard.css";
import "../assets/js/Dashboard"  
import Chart from "./Chart";
import Battery from "./Battery";
import SensorGauge from "./Meter";

const Dash = () => {
    const [isRightAreaOpen, setIsRightAreaOpen] = useState(false);

    const toggleRightArea = () => {
        setIsRightAreaOpen(!isRightAreaOpen);
    };

    const [ph, setPh] = useState(30);
    const [turbidity, setTurbidity] = useState(60);
    const [tds, setTds] = useState(90);
    const [temp, setTemp] = useState(50);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setPh(Math.round(Math.random() * 100));
        setTurbidity(Math.round(Math.random() * 100));
        setTds(Math.round(Math.random() * 100));
        setTemp(Math.round(Math.random() * 100));
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div class="app-container">
                <div class="app-left">
                    <button class="close-menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                    <div class="app-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />       </svg>
                        <span>HydroSense</span>
                    </div>
                    <ul class="nav-list">
                        <li class="nav-list-item active">
                            <a class="nav-list-link" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-columns"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" /></svg>
                                Dashboard
                            </a>
                        </li>
                        <li class="nav-list-item">
                            <a class="nav-list-link" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                <line x1="12" x2="12" y1="20" y2="10" />
                                <line x1="18" x2="18" y1="20" y2="4" />
                                <line x1="6" x2="6" y1="20" y2="16" />
                                </svg>
                                Charts
                            </a>
                        </li>
                        <li class="nav-list-item">
                            <a class="nav-list-link" href="#">
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
                            </a>
                        </li>
                        <li class="nav-list-item">
                            <a class="nav-list-link" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
                                Reports
                            </a>
                        </li>
                        <li class="nav-list-item">
                            <a class="nav-list-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                            </svg>
                                Profile
                            </a>
                        </li>
                        <li class="nav-list-item">
                            <a class="nav-list-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                                Settings
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="app-main">
                    <div class="main-header-line">
                        <div className="action-buttons">
                            <h1>HydroSense Dashboard</h1>
                            <button className="open-right-area" onClick={toggleRightArea}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                            </button>
                            <button className="menu-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                            </button>
                        </div>
                        <div className="action-buttons">
                            <button>
                                Start Monitoring
                            </button>
                            <button>
                                Stop Monitoring
                            </button>
                        </div>
                    </div>
                    <div class="chart-row three">
                        <div class="chart-container-wrapper">
                            <div class="chart-container">
                                <div class="chart-info-wrapper">
                                    <h2>pH Value</h2>
                                    <span>{ph}</span>
                                </div>
                                <div class="chart-svg">
                                    <SensorGauge value={ph} label="pH Value" />
                                </div>
                            </div>
                        </div>
                        <div class="chart-container-wrapper">
                            <div class="chart-container">
                                <div class="chart-info-wrapper">
                                    <h2>Turbidity Value</h2>
                                    <span>{turbidity} NTU</span>
                                </div>
                                <div class="chart-svg">
                                    <SensorGauge value={turbidity} label="pH Value" />
                                </div>
                            </div>
                        </div>
                        <div class="chart-container-wrapper">
                            <div class="chart-container">
                                <div class="chart-info-wrapper">
                                    <h2>TDS Value</h2>
                                    <span>{tds} ppm</span>
                                </div>
                                <div class="chart-svg">
                                    <SensorGauge value={tds} label="pH Value" />
                                </div>
                            </div>
                        </div>
                        <div class="chart-container-wrapper">
                            <div class="chart-container">
                                <div class="chart-info-wrapper">
                                    <h2>Temperature Value</h2>
                                    <span>{temp} K</span>
                                </div>
                                <div class="chart-svg">
                                    <SensorGauge value={temp} label="pH Value" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chart-row two">
                        <div class="chart-container-wrapper big">
                            <div class="chart-container">
                                <div class="chart-container-header">
                                    <h2>Sensor Data</h2>
                                    <span>Last 30 days</span>
                                </div>
                                {/* Sensor Data Starts */}
                                <Chart />
                                {/* Sensor Data Ends */}
                            </div>
                        </div>
                        <div class="chart-container-wrapper small">
                            <div class="chart-container">
                                <div class="chart-container-header">
                                    <h2>Test Details</h2>
                                    <span href="#">D-0001</span>
                                </div>
                                <div class="acquisitions-bar">
                                    <span class="bar-progress rejected"></span>
                                    <span class="bar-progress on-hold"></span>
                                    <span class="bar-progress shortlisted"></span>
                                    <span class="bar-progress applications"></span>
                                </div>
                                <div class="progress-bar-info">
                                    <span class="progress-color applications"></span>
                                    <span class="progress-type">Total Test Conducted</span>
                                    <span class="progress-amount">5</span>
                                </div>
                                <div class="progress-bar-info">
                                    <span class="progress-color shortlisted"></span>
                                    <span class="progress-type">Last Tested</span>
                                    <span class="progress-amount">16/03/2025</span>
                                </div>
                                <div class="progress-bar-info">
                                    <span class="progress-color on-hold"></span>
                                    <span class="progress-type">Test Location</span>
                                    <span class="progress-amount">Chennai</span>
                                </div>
                                <div class="progress-bar-info">
                                    <span class="progress-color rejected"></span>
                                    <span class="progress-type">Water Quality</span>
                                    <span class="progress-amount">Good</span>
                                </div>
                            </div>
                            <div class="chart-container applicants">
                                <div class="chart-container-header">
                                    <h2>Battery Level</h2>
                                    <span>3000 MaH</span>
                                </div>
                                <Battery />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="app-right">
                    <button class="close-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                    <div class="profile-box">
                        <div class="profile-photo-wrapper">
                            {/* <img src="https://images.unsplash.com/photo-1551292831-023188e78222?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTE0fHxwb3J0cmFpdHxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="profile"></img> */}
                        </div>
                        <p class="profile-text">Julia Pellegrini</p>
                        <p class="profile-subtext">Recruiting Manager</p>
                    </div>
                    <div class="app-right-content">
                        <div class="app-right-section">
                            <div class="app-right-section-header">
                                <h2>Announcements</h2>
                                <span class="notification-active">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                </span>
                            </div>
                            <div class="message-line">
                                {/* <img src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fHBvcnRyYWl0JTIwbWFufGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="profile"></img> */}
                                    <div class="message-text-wrapper">
                                        <p class="message-text">Eric Clampton</p>
                                        <p class="message-subtext">Have you planned any deadline for this?</p>
                                    </div>
                            </div>
                            <div class="message-line">
                                {/* <img src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80" alt="profile"></img> */}
                                    <div class="message-text-wrapper">
                                        <p class="message-text">Jess Flax</p>
                                        <p class="message-subtext">Can we schedule another meeting for next thursday?</p>
                                    </div>
                            </div>
                            <div class="message-line">
                                {/* <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80" alt="profile"> </img> */}
                                    <div class="message-text-wrapper">
                                        <p class="message-text">Pam Halpert</p>
                                        <p class="message-subtext">The candidate has been shorlisted.</p>
                                    </div>
                            </div>
                        </div>
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
                                    <p class="activity-text">Your plan is expires in <strong>3 days.</strong></p>
                                    <a class="activity-link" href="#">Renew Now</a>
                                </div>
                            </div>
                            <div class="activity-line">
                                <span class="activity-icon applicant">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                                </span>
                                <div class="activity-text-wrapper">
                                    <p class="activity-text">There are <strong>3 new applications</strong> for <strong>UI Developer</strong></p>
                                </div>
                            </div>
                            <div class="activity-line">
                                <span class="activity-icon close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                                </span>
                                <div class="activity-text-wrapper">
                                    <p class="activity-text">Your teammate, <strong>Wade Wilson</strong> has closed the job post of <strong>IOS Developer</strong></p>
                                </div>
                            </div>
                            <div class="activity-line">
                                <span class="activity-icon draft">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-minus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                                </span>
                                <div class="activity-text-wrapper">
                                    <p class="activity-text">You have drafted a job post for <strong>HR Specialist</strong></p>
                                    <a href="#" class="activity-link">Complete Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dash 