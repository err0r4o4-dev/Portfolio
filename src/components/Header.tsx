import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "../language";
import brandLogo from "../assets/thirawat-logo.png";
import "../styles/Header.css";

const navigation = {
  en: { home: "Home", profile: "About", portfolio: "Work", contact: "Contact", resume: "CV", skip: "Skip to content", menu: "Menu", close: "Close menu", language: "Select language", mobileNote: "Personal archive · Thailand" },
  th: { home: "หน้าหลัก", profile: "เกี่ยวกับฉัน", portfolio: "ผลงาน", contact: "ติดต่อ", resume: "CV", skip: "ข้ามไปยังเนื้อหา", menu: "เมนู", close: "ปิดเมนู", language: "เลือกภาษา", mobileNote: "คลังข้อมูลส่วนตัว · ประเทศไทย" },
};

const sectionIds = ["home", "about", "work", "contact"];
const HEADER_SCROLL_THRESHOLD = 24;
const HEADER_DIRECTION_DELTA = 6;

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const navigationTargetRef = useRef<{ id: string; expiresAt: number } | null>(null);
  const copy = navigation[language];
  const links = [
    { href: "#home", label: copy.home },
    { href: "#about", label: copy.profile },
    { href: "#work", label: copy.portfolio },
    { href: "#contact", label: copy.contact },
  ];

  const selectSection = (sectionId: string) => {
    navigationTargetRef.current = { id: sectionId, expiresAt: performance.now() + 1_600 };
    setActiveSection(sectionId);
    setIsHeaderVisible(true);
  };

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const navigationTarget = navigationTargetRef.current;
        if (navigationTarget && performance.now() < navigationTarget.expiresAt) {
          const targetEntry = entries.find((entry) => entry.target.id === navigationTarget.id);
          if (!targetEntry?.isIntersecting) return;

          navigationTargetRef.current = null;
          setActiveSection(navigationTarget.id);
          return;
        }

        navigationTargetRef.current = null;
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
    let animationFrameId = 0;
    let lastScrollY = window.scrollY;

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDelta = currentScrollY - lastScrollY;

      setIsScrolled(currentScrollY > HEADER_SCROLL_THRESHOLD);

      if (isMenuOpen || currentScrollY <= HEADER_SCROLL_THRESHOLD) {
        setIsHeaderVisible(true);
        lastScrollY = currentScrollY;
      } else if (Math.abs(scrollDelta) >= HEADER_DIRECTION_DELTA) {
        setIsHeaderVisible(scrollDelta < 0);
        lastScrollY = currentScrollY;
      }

      animationFrameId = 0;
    };

    const queueHeaderUpdate = () => {
      if (!animationFrameId) animationFrameId = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", queueHeaderUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", queueHeaderUpdate);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [isMenuOpen]);

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
    <header className={`Header${isScrolled || isMenuOpen ? " is-scrolled" : ""}${isMenuOpen ? " is-menu-open" : ""}${isHeaderVisible || isMenuOpen ? "" : " is-hidden"}`}>
      <a className="Skip-link" href="#main-content">{copy.skip}</a>
      <div className="Header-container">
        <a className="Header-brand" href="#home" aria-label="Thirawat Duangta, home" onClick={() => selectSection("home")}>
          <span className="Header-mark"><img src={brandLogo} alt="" /></span>
          <span>Thirawat Duangta</span>
        </a>
        <nav className="Header-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a className={activeSection === link.href.slice(1) ? "is-active" : ""} href={link.href} key={link.href} onClick={() => selectSection(link.href.slice(1))} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>{link.label}</a>
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
      <div
        id="mobile-navigation"
        className={`Mobile-menu${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="Mobile-menu-panel">
          <nav aria-label="Mobile navigation">
            {links.map((link, index) => (
              <a href={link.href} key={link.href} onClick={() => { selectSection(link.href.slice(1)); setIsMenuOpen(false); }} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>
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
      </div>
    </header>
  );
}
