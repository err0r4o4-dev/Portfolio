import { useEffect, useState, type ReactNode } from "react";
import { LanguageContext, type Language } from "./language";

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

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
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
