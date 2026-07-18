import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer-container">
        <div className="Footer-top">
          <div className="Footer-brand">
            <div className="Footer-logo">d</div>
            <div>
              <h3 className="Footer-name">designer</h3>
              <p className="Footer-description">Modern portfolio design and developer services for ambitious startups.</p>
            </div>
          </div>

          <div className="Footer-columns">
            <div className="Footer-col">
              <h4>Contact</h4>
              <p>youname@email.com</p>
              <p>github.com/yourname</p>
              <p>linkedin.com/in/yourprofile</p>
            </div>
            <div className="Footer-col">
              <h4>Policy</h4>
              <a href="#">Terms & Service</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="Footer-bottom">
          <span>© 2026 designer. All rights reserved.</span>
          <span>Your Name</span>
        </div>
      </div>
    </footer>
  );
}
