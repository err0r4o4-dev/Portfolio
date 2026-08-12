import {
  BrainCircuit,
  Code2,
  GitBranch,
  Layers3,
  Mail,
  Palette,
  Phone,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Language } from "../../language";

type LocalizedText = Record<Language, string>;

export type SocialLink = {
  id: "github" | "email" | "phone";
  label: LocalizedText;
  detail: LocalizedText;
  href: string;
  icon: LucideIcon;
};

export type ConnectListItem = {
  id: string;
  label: LocalizedText;
  icon: LucideIcon;
};

export const portfolioLinks = {
  github: "https://github.com/err0r4o4-dev",
  email: "mailto:title.thirawat.dev@gmail.com",
  phone: "tel:+66615071665",
  resume: "/downloads/Thirawat-Duangta-CV.pdf",
} as const;

export const connectCopy = {
  en: {
    title: "Let’s connect.",
    intro: "Find me across the web, explore what I’m building, and see where we could collaborate.",
    profileName: "Thirawat Duangta",
    profileRole: "Computer Engineering Student · Web & Backend Developer",
    location: "Bangkok, Thailand",
    available: "Available",
    availabilityNote: "Open to internships & selected projects",
    profileLogoAlt: "Thirawat Duangta logo",
    socialTitle: "Around the web",
    openToTitle: "What I’m open to",
    focusTitle: "Current focus",
    actionTitle: "Let’s build something great.",
    actionBody: "Explore my work or download my résumé to learn more about me.",
    viewGithub: "View GitHub",
    sendEmail: "Send an email",
    downloadResume: "Download résumé",
    basedIn: "Based in Thailand",
    remote: "Available for remote collaboration",
  },
  th: {
    title: "มารู้จักกันให้มากขึ้น",
    intro: "ติดตามผมผ่านช่องทางออนไลน์ ดูสิ่งที่ผมกำลังสร้าง และค้นหาโอกาสที่เราจะได้ร่วมงานกัน",
    profileName: "ธีรวัฒน์ ดวงตา",
    profileRole: "นักศึกษาวิศวกรรมคอมพิวเตอร์ · นักพัฒนาเว็บและ Backend",
    location: "กรุงเทพฯ ประเทศไทย",
    available: "พร้อมรับโอกาส",
    availabilityNote: "เปิดรับฝึกงานและโปรเจกต์ที่เหมาะสม",
    profileLogoAlt: "โลโก้ของธีรวัฒน์ ดวงตา",
    socialTitle: "ช่องทางออนไลน์",
    openToTitle: "สิ่งที่ผมเปิดรับ",
    focusTitle: "สิ่งที่กำลังโฟกัส",
    actionTitle: "มาสร้างสิ่งดี ๆ ด้วยกัน",
    actionBody: "ดูผลงานหรือดาวน์โหลดเรซูเม่เพื่อทำความรู้จักผมให้มากขึ้น",
    viewGithub: "ดู GitHub",
    sendEmail: "ส่งอีเมล",
    downloadResume: "ดาวน์โหลดเรซูเม่",
    basedIn: "อยู่ในประเทศไทย",
    remote: "พร้อมร่วมงานแบบรีโมต",
  },
} satisfies Record<Language, Record<string, string>>;

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: { en: "GitHub", th: "GitHub" },
    detail: { en: "err0r4o4-dev", th: "err0r4o4-dev" },
    href: portfolioLinks.github,
    icon: GitBranch,
  },
  {
    id: "email",
    label: { en: "Email", th: "อีเมล" },
    detail: { en: "title.thirawat.dev@gmail.com", th: "title.thirawat.dev@gmail.com" },
    href: portfolioLinks.email,
    icon: Mail,
  },
  {
    id: "phone",
    label: { en: "Phone", th: "โทรศัพท์" },
    detail: { en: "+66 61 507 1665", th: "+66 61 507 1665" },
    href: portfolioLinks.phone,
    icon: Phone,
  },
];

export const openToItems: ConnectListItem[] = [
  { id: "web", label: { en: "Web applications", th: "เว็บแอปพลิเคชัน" }, icon: Code2 },
  { id: "api", label: { en: "Backend APIs", th: "Backend APIs" }, icon: Server },
  { id: "ai", label: { en: "AI projects", th: "โปรเจกต์ AI" }, icon: BrainCircuit },
  { id: "design", label: { en: "UX/UI collaboration", th: "ร่วมงานด้าน UX/UI" }, icon: Palette },
];

export const focusItems: ConnectListItem[] = [
  { id: "products", label: { en: "Building reliable digital products", th: "สร้างผลิตภัณฑ์ดิจิทัลที่เชื่อถือได้" }, icon: Sparkles },
  { id: "systems", label: { en: "Learning system design", th: "เรียนรู้การออกแบบระบบ" }, icon: Layers3 },
  { id: "applied-ai", label: { en: "Exploring applied AI", th: "สำรวจการประยุกต์ใช้ AI" }, icon: BrainCircuit },
];

export const getLocalizedText = (text: LocalizedText, language: Language) => text[language];
