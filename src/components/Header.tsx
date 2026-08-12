import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "../language";
import brandLogo from "../assets/thirawat-logo.png";
import "../styles/Header.css";

const navigation = {
  en: { home: "Home", profile: "About", portfolio: "Work", contact: "Contact", resume: "CV", skip: "Skip to content", menu: "Menu", close: "Close menu", language: "Select language", mainNav: "Main navigation", mobileNav: "Mobile navigation", brandHome: "Thirawat Duangta, home" },
  th: { home: "หน้าหลัก", profile: "เกี่ยวกับฉัน", portfolio: "ผลงาน", contact: "ติดต่อ", resume: "CV", skip: "ข้ามไปยังเนื้อหา", menu: "เมนู", close: "ปิดเมนู", language: "เลือกภาษา", mainNav: "เมนูนำทางหลัก", mobileNav: "เมนูนำทางบนมือถือ", brandHome: "ธีรวัฒน์ ดวงตา, หน้าหลัก" },
};

const sectionIds = ["home", "about", "work", "contact"];
const HEADER_SCROLL_THRESHOLD = 24;

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
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
  };

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    let animationFrameId = 0;

    const updateActiveSection = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const activationLine = headerHeight + Math.min(window.innerHeight * .22, 160);
      const navigationTarget = navigationTargetRef.current;

      if (navigationTarget && performance.now() < navigationTarget.expiresAt) {
        const targetSection = document.getElementById(navigationTarget.id);
        const hasReachedTarget = targetSection
          ? Math.abs(targetSection.getBoundingClientRect().top - headerHeight) <= 32
          : true;

        if (!hasReachedTarget) {
          setActiveSection(navigationTarget.id);
          animationFrameId = 0;
          return;
        }
      }

      navigationTargetRef.current = null;
      let nextActiveSection = sections[0]?.id ?? "home";

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          nextActiveSection = section.id;
        }
      });

      const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (isAtPageBottom && sections.length > 0) {
        nextActiveSection = sections[sections.length - 1].id;
      }

      setActiveSection((currentSection) => (
        currentSection === nextActiveSection ? currentSection : nextActiveSection
      ));
      animationFrameId = 0;
    };

    const queueActiveSectionUpdate = () => {
      if (!animationFrameId) animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", queueActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", queueActiveSectionUpdate);
    return () => {
      window.removeEventListener("scroll", queueActiveSectionUpdate);
      window.removeEventListener("resize", queueActiveSectionUpdate);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    let animationFrameId = 0;

    const updateHeader = () => {
      setIsScrolled(Math.max(window.scrollY, 0) > HEADER_SCROLL_THRESHOLD);
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
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusFirstMenuLink = () => {
      mobileMenuRef.current?.querySelector<HTMLElement>("a")?.focus();
    };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const focusTimer = window.setTimeout(focusFirstMenuLink, prefersReducedMotion ? 0 : 450);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [isMenuOpen]);

  return (
    <>
      <header ref={headerRef} className={`Header${isScrolled || isMenuOpen ? " is-scrolled" : ""}`}>
        <a className="Skip-link" href="#main-content">{copy.skip}</a>
        <div className="Header-container">
        <a className="Header-brand" href="#home" aria-label={copy.brandHome} onClick={() => selectSection("home")}>
          <span className="Header-mark"><img src={brandLogo} alt="" /></span>
          <span>Taitunnn</span>
        </a>
        <nav className="Header-nav" aria-label={copy.mainNav}>
          {links.map((link) => (
            <a className={activeSection === link.href.slice(1) ? "is-active" : ""} href={link.href} key={link.href} onClick={() => selectSection(link.href.slice(1))} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>{link.label}</a>
          ))}
        </nav>
        <div className="Header-actions">
          <div className="Language-switch" role="group" aria-label={copy.language}>
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
          ref={menuToggleRef}
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
      </header>
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`Mobile-menu${isMenuOpen ? " is-open" : ""}${isScrolled || isMenuOpen ? " is-header-scrolled" : ""}`}
        aria-hidden={!isMenuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsMenuOpen(false);
        }}
      >
        <div className="Mobile-menu-panel">
          <nav aria-label={copy.mobileNav}>
            {links.map((link, index) => (
              <a href={link.href} key={link.href} onClick={() => { selectSection(link.href.slice(1)); setIsMenuOpen(false); }} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>
                <span>0{index + 1}</span>
                <strong>{link.label}</strong>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
