import React, { useState } from "react";
import '../components/assets/css/Home.css'
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="homepage">
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
                <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                <li className="nav-item"><a className="nav-link" href="#services">Features</a></li>
                <li className="nav-item"><a className="nav-link" href="#showcase">Screenshots</a></li>
                <li className="nav-item"><a className="nav-link" href="#download">Download</a></li>
                <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section id="home" class="home">
        <h1>Welcome to Hydro Sense</h1>
        <p>
          A portable water contamination detection device designed to provide
          real-time monitoring and alerts for key contaminants.
        </p>

        <div className="home_buttons">
          <a href="#about" className="btn">Learn More</a>
          <a href="#download" className="btn">Download Now</a>
        </div>

        <div className="home_buttons">
          <Link to="/dashboard"><a className="btn">Dashboard</a></Link>
        </div>
      </section>

      <section id="about">
        <h2>About Hydro Sense</h2>
        <p>
          Hydrosense is a real-time water quality monitoring system powered by IoT and AI technologies. The software module plays a central role in acquiring data from sensors, processing it using machine learning models, and delivering insights through a user-friendly web interface. Designed with modularity, scalability, and usability in mind, the software seamlessly bridges the hardware components and the end-users via a robust backend, intuitive frontend, and well-documented API services.
        </p>
        <ul>
          <li>
            Real-time monitoring and anomaly detection of water quality parameters such as turbidity, TDS, and temperature.
          </li>
          <li>
            Data visualization and interactive dashboard for both administrators and end-users.
          </li>
          <li>
            Integration with cloud storage (Firebase) for persistent and secure data logging.
          </li>
          <li>
            Secure user authentication with support for Google/GitHub sign-ins.
          </li>
          <li>
            AI-driven chatbot support using Hugging Face APIs for interpreting data trends and providing recommendations.
          </li>
          <li>
            Offline testing mode for simulation-based validation without the need for connected hardware.
          </li>
        </ul>
      </section>

      <section id="gallery" className="image-gallery">
        <img src="./assets/img/Components_Image.jpg" alt="Gallery Image 1" />
        <img src="./assets/img/Hardware_1.jpg" alt="Gallery Image 2" />
        <img src="./assets/img/Hardware_2.jpg" alt="Gallery Image 3" />
        <img src="./assets/img/Hardware_Enclosed_Horizontal.jpg" alt="Gallery Image 4" />
        <img src="./assets/img/Hardware_Enclosed_Sensor.jpg" alt="Gallery Image 5" />
        <img src="./assets/img/Hardware_Enclosed_Vertical.jpg" alt="Gallery Image 6" />
      </section>

      <section id="video" class="my-5">
        <div class="container">
          <h2 class="text-center">Watch Our Demo Video</h2>
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://youtu.be/j9XmubUFrgQ"
                  allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="download" class="section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <h2 class="section-title">Download Our App</h2>
              <p>Get the Hydro Sense app for your preferred platform.</p>
              <div class="download-buttons">
                <a href="https://github.com/Saravanakumar2003/HydroSense/releases/download/v1.0.1/Hydrosense-apk.zip"
                  class="btn btn-primary">Download for Android</a>
                <a href="https://github.com/Saravanakumar2003/HydroSense/releases/download/v1.0.1/HydroSense-win-x64.zip"
                  class="btn btn-primary">Download for Windows</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Team Section -->
  <!-- <section id="team">
    <h2>Team Members</h2>
    <p>We are a team of 3 Engineers in 4th year ECE.</p>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <img src="{{ url_for('static', filename='img/team/Saravana.jpg') }}" class="card-img-top"
              alt="Saravanakumar R" />
            <div class="card-body">
              <h3 class="card-title">Saravanakumar R</h3>
              <p class="card-text">Software Developer</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="{{ url_for('static', filename='img/team/Yogi.jpg') }}" class="card-img-top" alt="Yogeshwaran K" />
            <div class="card-body">
              <h3 class="card-title">Yogeshwaran K</h3>
              <p class="card-text">UI/UX Designer</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="{{ url_for('static', filename='img/team/Dilip.jpg') }}" class="card-img-top"
              alt="Kommana Dilip Kumar" />
            <div class="card-body">
              <h3 class="card-title">Kommana Dilip Kumar</h3>
              <p class="card-text">Documentation & Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>  */}

      <section id="contact">
        <h2>Contact Us</h2>
        <p>Reach out to our team for support and inquiries about Hydro Sense.</p>
        <div class="container">
          <div class="row justify-content-center mt-10">
            <div class="col-md-8 mt-10">
              <iframe src="https://forms.gle/dBnUhiFwr5cijoCJ9" width="100%" height="500" frameborder="0" marginheight="0"
                marginwidth="0">Loading…</iframe>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Crafted by Hydro Sense, © 2024 All Rights Reserved</p>
        <Link className='tos' to="/privacy-policy">Privacy Policy</Link>
        <Link className='tos' to="/terms-and-condition"> Terms and Condition </Link>
      </footer>
    </div>
  );
};

export default HomePage;
