import {
  ContactRound,
  GitBranch,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { Language } from "../../language";

type LocalizedText = Record<Language, string>;

export type SocialLink = {
  id: "github" | "linkedin" | "email" | "phone";
  label: LocalizedText;
  detail: LocalizedText;
  href: string;
  icon: LucideIcon;
};

export const portfolioLinks = {
  github: "https://github.com/err0r4o4-dev",
  linkedin: "https://www.linkedin.com/in/thirawat-duangta-2467023a6/",
  email: "mailto:title.thirawat.dev@gmail.com",
  phone: "tel:+66615071665",
} as const;

export const connectCopy = {
  en: {
    title: "Let's talk.",
    intro: "Whether you have a question about a project, share an interest, or think we could build something together, you can reach me through any of the channels below.",
    profileName: "Thirawat Duangta",
    profileRole: "Software Developer · Computer Engineering Student",
    location: "Bangkok, Thailand",
    available: "Open to ideas",
    availabilityNote: "Projects, shared interests & collaboration",
    profileLogoAlt: "Thirawat Duangta logo",
    socialTitle: "Around the web",
    basedIn: "Based in Thailand",
    remote: "Available for remote collaboration",
  },
  th: {
    title: "มาพูดคุยกัน",
    intro: "หากคุณมีคำถามเกี่ยวกับโปรเจกต์ สนใจเรื่องใกล้เคียงกัน หรือคิดว่าเราอาจได้ร่วมสร้างอะไรบางอย่าง ติดต่อผมได้ผ่านช่องทางด้านล่าง",
    profileName: "ถิรวัฒน์ ดวงตา",
    profileRole: "นักพัฒนาซอฟต์แวร์ · นักศึกษาวิศวกรรมคอมพิวเตอร์",
    location: "กรุงเทพฯ ประเทศไทย",
    available: "พร้อมแลกเปลี่ยนไอเดีย",
    availabilityNote: "โปรเจกต์ ความสนใจร่วมกัน และการร่วมสร้างงาน",
    profileLogoAlt: "โลโก้ของถิรวัฒน์ ดวงตา",
    socialTitle: "ช่องทางออนไลน์",
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
    id: "linkedin",
    label: { en: "LinkedIn", th: "LinkedIn" },
    detail: { en: "Thirawat Duangta", th: "ถิรวัฒน์ ดวงตา" },
    href: portfolioLinks.linkedin,
    icon: ContactRound,
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

export const getLocalizedText = (text: LocalizedText, language: Language) => text[language];
