import "../styles/Header.css";

export default function Header() {
  return (
    <header className="Header">
      <div className="Header-container">
        <div className="Header-brand">
          <div className="Header-logo-circle">d</div>
          <span className="Header-logo-text">designer</span>
        </div>

        <nav className="Header-nav">
          <a href="#home" className="Header-link">Home</a>
          <a href="#about" className="Header-link">About</a>
          <a href="#skills" className="Header-link">Skills</a>
          <a href="#projects" className="Header-link">Projects</a>
          <a href="#contact" className="Header-link">Contact</a>
        </nav>

        <a href="#contact" className="Header-btn">Download CV</a>
      </div>
    </header>
  );
}
