import { useEffect, useState } from "react";
import { useLanguage, type Language } from "../language";
import brandLogo from "../assets/thirawat-logo.png";
import "../styles/Header.css";

const navigation = {
  en: { profile: "About", work: "Archive", skills: "Toolkit", journey: "Journey", contact: "Contact", resume: "CV", skip: "Skip to content", menu: "Menu", close: "Close menu", language: "Select language", mobileNote: "Personal archive · Thailand" },
  th: { profile: "เกี่ยวกับฉัน", work: "คลังผลงาน", skills: "เครื่องมือ", journey: "เส้นทาง", contact: "ติดต่อ", resume: "CV", skip: "ข้ามไปยังเนื้อหา", menu: "เมนู", close: "ปิดเมนู", language: "เลือกภาษา", mobileNote: "คลังข้อมูลส่วนตัว · ประเทศไทย" },
};

const sectionIds = ["about", "projects", "skills", "experience", "contact"];

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const copy = navigation[language];
  const links = [
    { href: "#about", label: copy.profile },
    { href: "#projects", label: copy.work },
    { href: "#skills", label: copy.skills },
    { href: "#experience", label: copy.journey },
    { href: "#contact", label: copy.contact },
  ];

  useEffect(() => {
    const sections = [document.getElementById("home"), ...sectionIds.map((id) => document.getElementById(id))].filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-20% 0px -60%", threshold: [0, .2, .5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="Header">
      <a className="Skip-link" href="#main-content">{copy.skip}</a>
      <div className="Header-container">
        <a className="Header-brand" href="#home" aria-label="Thirawat Duangta, home">
          <span className="Header-mark"><img src={brandLogo} alt="" /></span>
          <span>Thirawat Duangta</span>
        </a>
        <nav className="Header-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a className={activeSection === link.href.slice(1) ? "is-active" : ""} href={link.href} key={link.href} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>{link.label}</a>
          ))}
        </nav>
        <div className="Header-actions">
          <div className="Language-switch" aria-label={copy.language}>
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
        <button
          className="Header-menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? copy.close : copy.menu}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
        </button>
      </div>
      <div id="mobile-navigation" className={`Mobile-menu${isMenuOpen ? " is-open" : ""}`} aria-hidden={!isMenuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a href={link.href} key={link.href} onClick={() => setIsMenuOpen(false)} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>
              <span>0{index + 1}</span>
              <strong>{link.label}</strong>
              <span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>
        <div className="Mobile-menu-footer">
          <span>{copy.mobileNote}</span>
          <a href="/downloads/Thirawat-Duangta-CV.pdf" download onClick={() => setIsMenuOpen(false)}>{copy.resume} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </header>
  );
}
