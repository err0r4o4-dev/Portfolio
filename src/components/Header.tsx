import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "../language";
import brandLogo from "../assets/thirawat-logo.png";
import "../styles/Header.css";

const navigation = {
  en: { home: "Home", profile: "About", portfolio: "Work", contact: "Contact", resume: "CV", skip: "Skip to content", menu: "Menu", close: "Close menu", language: "Select language", mainNav: "Main navigation", mobileNav: "Mobile navigation", brandHome: "Thirawat Duangta, home", mobileNote: "Personal archive · Thailand" },
  th: { home: "หน้าหลัก", profile: "เกี่ยวกับฉัน", portfolio: "ผลงาน", contact: "ติดต่อ", resume: "CV", skip: "ข้ามไปยังเนื้อหา", menu: "เมนู", close: "ปิดเมนู", language: "เลือกภาษา", mainNav: "เมนูนำทางหลัก", mobileNav: "เมนูนำทางบนมือถือ", brandHome: "ธีรวัฒน์ ดวงตา, หน้าหลัก", mobileNote: "คลังข้อมูลส่วนตัว · ประเทศไทย" },
};

const sectionIds = ["home", "about", "work", "contact"];
const HEADER_SCROLL_THRESHOLD = 24;
const HEADER_DIRECTION_DELTA = 6;

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [shouldRevealHeaderInstantly, setShouldRevealHeaderInstantly] = useState(false);
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
    setShouldRevealHeaderInstantly(true);
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
        setShouldRevealHeaderInstantly(true);
        setIsHeaderVisible(true);
        lastScrollY = currentScrollY;
      } else if (Math.abs(scrollDelta) >= HEADER_DIRECTION_DELTA) {
        const isScrollingUp = scrollDelta < 0;
        setShouldRevealHeaderInstantly(isScrollingUp);
        setIsHeaderVisible(isScrollingUp);
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
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const pageRegions = [
      document.getElementById("main-content"),
      document.querySelector<HTMLElement>(".Footer"),
    ].filter(Boolean) as HTMLElement[];
    const previousRegionStates = pageRegions.map((region) => ({
      region,
      inert: region.inert,
      ariaHidden: region.getAttribute("aria-hidden"),
    }));
    const focusFirstMenuLink = () => {
      mobileMenuRef.current?.querySelector<HTMLElement>("a")?.focus();
    };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const focusTimer = window.setTimeout(focusFirstMenuLink, prefersReducedMotion ? 0 : 450);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !headerRef.current) return;

      const focusableElements = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((element) => (
        !element.closest('[aria-hidden="true"]')
        && window.getComputedStyle(element).visibility !== "hidden"
        && window.getComputedStyle(element).display !== "none"
      ));
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    pageRegions.forEach((region) => {
      region.inert = true;
      region.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousRegionStates.forEach(({ region, inert, ariaHidden }) => {
        region.inert = inert;
        if (ariaHidden === null) region.removeAttribute("aria-hidden");
        else region.setAttribute("aria-hidden", ariaHidden);
      });
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className={`Header${isScrolled || isMenuOpen ? " is-scrolled" : ""}${isMenuOpen ? " is-menu-open" : ""}${shouldRevealHeaderInstantly ? " is-instant" : ""}${isHeaderVisible || isMenuOpen ? "" : " is-hidden"}`}>
      <a className="Skip-link" href="#main-content">{copy.skip}</a>
      <div className="Header-container">
        <a className="Header-brand" href="#home" aria-label={copy.brandHome} onClick={() => selectSection("home")}>
          <span className="Header-mark"><img src={brandLogo} alt="" /></span>
          <span>Thirawat Duangta</span>
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
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`Mobile-menu${isMenuOpen ? " is-open" : ""}`}
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
