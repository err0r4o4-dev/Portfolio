import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "../language";
import brandLogo from "../assets/thirawat-logo.png";


const navigation = {
  en: { home: "Home", profile: "About", portfolio: "Work", contact: "Contact", resume: "CV", skip: "Skip to content", menu: "Menu", close: "Close menu", language: "Select language", mainNav: "Main navigation", mobileNav: "Mobile navigation", brandHome: "Thirawat Duangta, home" },
  th: { home: "หน้าหลัก", profile: "เกี่ยวกับฉัน", portfolio: "ผลงาน", contact: "ติดต่อ", resume: "CV", skip: "ข้ามไปยังเนื้อหา", menu: "เมนู", close: "ปิดเมนู", language: "เลือกภาษา", mainNav: "เมนูนำทางหลัก", mobileNav: "เมนูนำทางบนมือถือ", brandHome: "ถิรวัฒน์ ดวงตา, หน้าหลัก" },
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
      <header ref={headerRef} className={`site-header sticky top-0 z-50 isolate border-b transition-[background,border-color,box-shadow] duration-400 ease-out-expo ${isScrolled || isMenuOpen ? "is-scrolled border-line bg-canvas/85 shadow-[0_1rem_3.5rem_rgba(0,7,20,.3),inset_0_-1px_rgba(120,183,241,.025)] backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
        <a className="fixed -top-20 left-4 z-100 bg-accent px-4 py-3 text-[#06111e] focus:top-4" href="#main-content">{copy.skip}</a>
        <div className={`site-container grid grid-cols-[1fr_auto_1fr] items-center gap-8 transition-[min-height] duration-300 ease-out-expo max-[720px]:grid-cols-[1fr_auto_auto] max-[720px]:gap-3 ${isScrolled || isMenuOpen ? "min-h-[4.2rem] max-[720px]:min-h-16" : "min-h-19 max-[720px]:min-h-18"}`}>
          <a className="flex items-center gap-3 font-semibold tracking-[-.025em]" href="#home" aria-label={copy.brandHome} onClick={() => selectSection("home")}>
            <span className={`header-logo block overflow-hidden rounded-full border border-[#68b2f5]/65 bg-[#f8fbff] transition-[width,height] duration-300 ease-out-expo ${isScrolled || isMenuOpen ? "size-9" : "size-10"}`}><img className="h-full w-full scale-[1.06] object-cover transition-transform duration-500 ease-out-expo hover:scale-[1.14] hover:-rotate-3" src={brandLogo} alt="" /></span>
            <span className="text-[.94rem] max-[720px]:hidden">Taitunnn</span>
          </a>
          <nav className="flex items-center gap-7 text-sm font-medium text-ink-muted max-[720px]:hidden" aria-label={copy.mainNav}>
            {links.map((link) => (
              <a className={`header-nav-link relative transition-colors duration-300 ease-out-expo hover:text-[#bfe2ff] ${activeSection === link.href.slice(1) ? "is-active text-[#bfe2ff]" : ""}`} href={link.href} key={link.href} onClick={() => selectSection(link.href.slice(1))} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center justify-self-end gap-4 max-[720px]:gap-2">
            <div className="flex rounded-lg border border-line bg-panel/65 p-1 shadow-[inset_0_1px_rgba(255,255,255,.035)]" role="group" aria-label={copy.language}>
              {(["en", "th"] as Language[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`min-w-9 cursor-pointer rounded-md border-0 px-2 py-2 font-mono text-[.68rem] font-medium transition-[color,background,transform] duration-300 ease-out-expo active:scale-95 ${language === option ? "bg-accent text-[#03101f] shadow-[0_.4rem_1rem_rgba(16,97,190,.18)]" : "bg-transparent text-ink-muted hover:text-ink"}`}
                  aria-pressed={language === option}
                  onClick={() => setLanguage(option)}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
            <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="font-mono text-xs font-medium tracking-[.04em] text-[#b7cbe0] transition-colors duration-300 hover:text-[#bfe2ff] max-[720px]:hidden">{copy.resume} <span aria-hidden="true">↓</span></a>
          </div>
          <button
            ref={menuToggleRef}
            className="group relative hidden size-11 cursor-pointer place-items-center rounded-lg border border-line bg-panel/65 p-0 transition-[width,height,background] duration-300 ease-out-expo max-[720px]:grid"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? copy.close : copy.menu}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span className="absolute h-px w-4 -translate-y-[.22rem] bg-ink transition-transform duration-400 ease-out-expo group-aria-expanded:translate-y-0 group-aria-expanded:rotate-45 motion-reduce:transition-none" />
            <span className="absolute h-px w-4 translate-y-[.22rem] bg-ink transition-transform duration-400 ease-out-expo group-aria-expanded:translate-y-0 group-aria-expanded:-rotate-45 motion-reduce:transition-none" />
          </button>
        </div>
      </header>
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`fixed inset-x-0 z-40 hidden bg-canvas/80 backdrop-blur-xl transition-[opacity,transform,visibility] duration-500 ease-out-expo max-[720px]:block ${isScrolled || isMenuOpen ? "top-16" : "top-18"} ${isMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"}`}
        aria-hidden={!isMenuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsMenuOpen(false);
        }}
      >
        <div className={`flex w-full flex-col overflow-y-auto overscroll-contain bg-transparent px-6 pb-4 pt-2 ${isScrolled || isMenuOpen ? "max-h-[calc(100dvh-4rem)]" : "max-h-[calc(100dvh-4.5rem)]"}`}>
          <nav className="grid gap-0.5" aria-label={copy.mobileNav}>
            {links.map((link, index) => (
              <a className="grid min-h-14 grid-cols-[2rem_1fr] items-center gap-3 text-[#9dafc4]" href={link.href} key={link.href} onClick={() => { selectSection(link.href.slice(1)); setIsMenuOpen(false); }} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>
                <span className="font-mono text-[.58rem] font-medium text-[#66809b]">0{index + 1}</span>
                <strong className="mobile-nav-label w-fit text-[clamp(1.3rem,5.6vw,1.65rem)] font-semibold tracking-[-.035em] transition-colors duration-250 ease-out-expo">{link.label}</strong>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
