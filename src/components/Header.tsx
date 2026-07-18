import "../styles/Header.css";

export default function Header() {
  return (
    <header className="Header">
      <a className="Skip-link" href="#main-content">Skip to content</a>
      <div className="Header-container">
        <a className="Header-brand" href="#home" aria-label="Thirawat Duangta, home">
          <span className="Header-mark">TD</span>
          <span>Thirawat Duangta</span>
        </a>
        <nav className="Header-nav" aria-label="Main navigation">
          <a href="#about">Profile</a>
          <a href="#projects">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="Header-cv">Résumé <span aria-hidden="true">↓</span></a>
      </div>
    </header>
  );
}
