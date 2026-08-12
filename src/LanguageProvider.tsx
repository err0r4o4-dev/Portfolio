import { useEffect, useState, type ReactNode } from "react";
import { LanguageContext, type Language } from "./language";

const LANGUAGE_STORAGE_KEY = "thirawat-portfolio-language";

const getInitialLanguage = (): Language => {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage === "en" || storedLanguage === "th") return storedLanguage;
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }

  return window.navigator.language.toLowerCase().startsWith("th") ? "th" : "en";
};

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    const title = language === "th"
      ? "ธีรวัฒน์ ดวงตา — คลังผลงานส่วนตัว"
      : "Thirawat Duangta — Personal Archive";
    const description = language === "th"
      ? "คลังผลงานซอฟต์แวร์ การทดลอง การเรียนรู้ และเทคโนโลยีสร้างสรรค์ของธีรวัฒน์ ดวงตา"
      : "Thirawat Duangta's personal archive of software projects, experiments, learning, and creative technology.";

    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')?.setAttribute("content", language === "th" ? "th_TH" : "en_US");
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", description);

    const pageUrl = `${window.location.origin}${window.location.pathname}`;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.append(canonicalLink);
    }
    canonicalLink.href = pageUrl;
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute("content", pageUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.setAttribute("content", `${window.location.origin}/thirawat-logo.png`);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.setAttribute("content", `${window.location.origin}/thirawat-logo.png`);

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Keep the in-memory selection when storage is unavailable.
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
