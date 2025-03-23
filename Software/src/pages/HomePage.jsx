import React, { useState } from "react";
import '../components/assets/css/Home.css'
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="navbar-container">
            <img src="/assets/img/icon.png" alt="Hydro Sense Logo" className="logo" />
            <a className="navbar-brand" href="#">Hydro Sense</a>
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
      </section>

      <section id="about">
        <h2>About Hydro Sense</h2>
        <p>
          Hydro Sense is crafted with precision, ensuring reliability, durability,
          and accurate water contamination detection.
        </p>
        <ul>
          <li>
            <strong>Real-Time Monitoring:</strong> Continuous monitoring and instant alerts.
          </li>
          <li>
            <strong>Contaminant Detection:</strong> Detects 4 key parameters with high accuracy.
          </li>
          <li>
            <strong>User-Friendly Design:</strong> Sleek and portable, suitable for various users.
          </li>
          <li>
            <strong>Cloud-Based Storage:</strong> Secure data storage and accessibility.
          </li>
          <li>
            <strong>Multi-Platform Support:</strong> Available on Windows and Android.
          </li>
        </ul>
      </section>

      <section id="services">
        <h2>Software Key Features</h2>
        <ul>
          <li>
            <strong>Easy Installation:</strong> Simple setup and user-friendly
            interface.
          </li>
          <li>
            <strong>Data Logging & Analysis:</strong> Cloud-based storage and
            analysis.
          </li>
          <li>
            <strong>Report Generation:</strong> Download a complete report of each
            test.
          </li>
          <li>
            <strong>Trend Analysis:</strong> See trends graph of each contaminant
            with 5, 10, 50 tests.
          </li>
          <li>
            <strong>Graph Sharing:</strong> Download and share trends graph.
          </li>
          <li>
            <strong>Threshold Alerts:</strong> Alert if the value goes beyond the
            threshold with country specified.
          </li>
          <li>
            <strong>Real-Time Alerts:</strong> Immediate notifications for unsafe
            contamination levels.
          </li>
          <li>
            <strong>Customizable Settings:</strong> Personalize alerts and
            monitoring.
          </li>
          <li>
            <strong>Continuous Updates:</strong> Regular updates for enhanced
            detection capabilities.
          </li>
          <li>
            <strong>Comprehensive Support:</strong> Full support for optimal
            performance.
          </li>
          <li>
            <strong>Contaminant Detection:</strong> See a total of 11 contaminants
            which includes:
          </li>
          <li></li>
        </ul>
      </section>

      <section id="showcase">
        <h2>Screen Shots</h2>
        <p>View the Hydro Sense app in action.</p>
        <div class="container">
          <div class="row">
            <div class="col-md-3 mt-3">
              <div class="card">
                <img src="./assets/img/Components_Image.jpg" class="card-img-top img-thumbnail" alt="Image 1"
                  data-toggle="modal" data-target="#imageModal" data-src="./assets/img/Comp.jpg" />
                <div class="card-body">
                  <p class="card-text">Hardware Components</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 mt-3">
              <div class="card">
                <img src="./assets/img/Hardware_1.jpg" class="card-img-top img-thumbnail" alt="Image 1"
                  data-toggle="modal" data-target="#imageModal" data-src="./assets/img/Hardware_1.jpg" />
                <div class="card-body">
                  <p class="card-text">Hardware Setup 1</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 mt-3">
              <div class="card">
                <img src="./assets/img/Hardware_2.jpg" class="card-img-top img-thumbnail" alt="Image 1"
                  data-toggle="modal" data-target="#imageModal" data-src="./assets/img/Hardware_2.jpg" />
                <div class="card-body">
                  <p class="card-text">Hardware Setup 2</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 mt-3">
              <div class="card">
                <img src="./assets/img/Hardware_Enclosed_Horizontal.jpg.jpg" class="card-img-top img-thumbnail" alt="Image 1"
                  data-toggle="modal" data-target="#imageModal" data-src="./assets/img/Hardware_Enclosed_Horizontal.jpg.jpg" />
                <div class="card-body">
                  <p class="card-text">Prototype Horizontal</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 mt-3">
              <div class="card">
                <img src="./assets/img/Hardware_Enclosed_Sensor.jpg" class="card-img-top img-thumbnail" alt="Image 1"
                  data-toggle="modal" data-target="#imageModal" data-src="./assets/img/Hardware_Enclosed_Sensor.jpg" />
                <div class="card-body">
                  <p class="card-text">Prototype Sensor</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 mt-3">
              <div class="card">
                <img src="./assets/img/Hardware_Enclosed_Vertical.jpg" class="card-img-top img-thumbnail" alt="Image 1"
                  data-toggle="modal" data-target="#imageModal" data-src="./assets/img/Hardware_Enclosed_Vertical.jpg" />
                <div class="card-body">
                  <p class="card-text">Prototype Vertical</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="video" class="my-5">
        <div class="container">
          <h2 class="text-center">Watch Our Demo Video</h2>
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/3dN2HjRxj_I"
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
                <a href="https://github.com/Saravanakumar2003/Final-Year-Project/releases/download/v1.0.1/HydroSense-1_0_1-windows.exe"
                  class="btn btn-primary">Download for Windows</a>
                <a href="https://github.com/Saravanakumar2003/Final-Year-Project/releases/download/v1.0.1/HydroSense-1_0_1.apk"
                  class="btn btn-primary">Download for Android</a>
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
      );
    </div>
  );
};

export default HomePage;
