import React, { useState, useEffect } from "react";
import "../components/assets/css/Home.css"; // Custom CSS for styling
import { FaArrowUp } from "react-icons/fa";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowScroll(window.scrollY > 300);
    });
  }, []);

  return (
    <div className={darkMode ? "homepage dark" : "homepage light"}>
      {/* Header Section */}
      <header className="header">
        <h1>HydroSense</h1>
        <nav>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <a href="/dashboard" className="dashboard-btn">Dashboard</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Portable Water Contamination Detection</h2>
        <p>Real-time monitoring of contaminants with AI-powered insights.</p>
        <div className="download-buttons">
          <a href="#" className="btn">Download for Windows</a>
          <a href="#" className="btn">Download for Android</a>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About HydroSense</h2>
        <p>HydroSense is an innovative system designed to monitor water quality using IoT sensors and AI analysis.</p>
      </section>

      {/* Hardware Section */}
      <section className="hardware">
        <h2>Hardware Components</h2>
        <ul>
          <li>Vega Aries IoT v2.0 (Temp, Humidity, LED, Buttons, WiFi, Bluetooth)</li>
          <li>pH Sensor</li>
          <li>Turbidity Sensor</li>
        </ul>
      </section>

      {/* Software Section */}
      <section className="software">
        <h2>Software Features</h2>
        <ul>
          <li>AI Model for Water Potability Analysis</li>
          <li>Anomaly Detection Algorithm</li>
          <li>Auto-calibration for Sensors</li>
          <li>PDF Report Download</li>
          <li>Real-time Data Visualization</li>
        </ul>
      </section>

      {/* Dashboard Section */}
      <section className="dashboard-info">
        <h2>Dashboard</h2>
        <p>Monitor real-time water quality, AI predictions, and system status.</p>
      </section>

      {/* AI Insights Section */}
      <section className="ai-insights">
        <h2>AI Insights</h2>
        <p>Advanced AI models determine water quality with high accuracy.</p>
      </section>

      {/* Alerts Section */}
      <section className="alerts">
        <h2>Alerts & Notifications</h2>
        <p>Get instant alerts when contamination levels exceed safe thresholds.</p>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <iframe src="https://docs.google.com/forms/d/e/your-google-form-url/viewform" width="100%" height="500px" title="Contact Form"></iframe>
      </section>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default HomePage;
