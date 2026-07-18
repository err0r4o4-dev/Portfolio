import { useLanguage, type Language } from "../language";
import brandLogo from "../assets/thirawat-logo.png";
import "../styles/Header.css";

const navigation = {
  en: { profile: "Profile", work: "Work", skills: "Skills", contact: "Contact", resume: "CV", skip: "Skip to content" },
  th: { profile: "เกี่ยวกับฉัน", work: "ผลงาน", skills: "ทักษะ", contact: "ติดต่อ", resume: "CV", skip: "ข้ามไปยังเนื้อหา" },
};

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const copy = navigation[language];

  return (
    <header className="Header">
      <a className="Skip-link" href="#main-content">{copy.skip}</a>
      <div className="Header-container">
        <a className="Header-brand" href="#home" aria-label="Thirawat Duangta, home">
          <span className="Header-mark"><img src={brandLogo} alt="" /></span>
          <span>Thirawat Duangta</span>
        </a>
        <nav className="Header-nav" aria-label="Main navigation">
          <a href="#about">{copy.profile}</a>
          <a href="#projects">{copy.work}</a>
          <a href="#skills">{copy.skills}</a>
          <a href="#contact">{copy.contact}</a>
        </nav>
        <div className="Header-actions">
          <div className="Language-switch" aria-label="Select language">
            {(["en", "th"] as Language[]).map((option) => (
              <button
                key={option}
                type="button"
                className={language === option ? "is-active" : ""}
                aria-pressed={language === option}
                onClick={() => setLanguage(option)}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="Header-cv">{copy.resume} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </header>
  );
}
