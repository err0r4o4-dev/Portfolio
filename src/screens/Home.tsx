import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../language";
import ProjectModal, { type Project } from "../components/ProjectModal";
import ProjectCover from "../components/ProjectCover";
import AchievementStats, { type AchievementStat } from "../components/AchievementStats";
import profileMomentTwo from "../assets/profile-moment-02.jpg";
import "../styles/Home.css";

const portfolioTabs = ["projects", "certificates", "stack"] as const;
type PortfolioTab = (typeof portfolioTabs)[number];
type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  avatarDataUrl?: string;
};

const GUESTBOOK_STORAGE_KEY = "portfolio-guestbook";
const MAX_GUESTBOOK_ENTRIES = 12;
const MAX_AVATAR_BYTES = 300 * 1024;
const getTechMark = (name: string) => name.split(/[\s/+.]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => resolve(String(reader.result)));
  reader.addEventListener("error", () => reject(reader.error));
  reader.readAsDataURL(file);
});

const isGuestbookEntry = (value: unknown): value is GuestbookEntry => {
  if (!value || typeof value !== "object") return false;
  const entry = value as Record<string, unknown>;
  return typeof entry.id === "string"
    && typeof entry.name === "string"
    && typeof entry.message === "string"
    && typeof entry.createdAt === "string"
    && (entry.avatarDataUrl === undefined || typeof entry.avatarDataUrl === "string");
};

const loadGuestbookEntries = () => {
  if (typeof window === "undefined") return [];

  try {
    const savedEntries = window.localStorage.getItem(GUESTBOOK_STORAGE_KEY);
    if (!savedEntries) return [];
    const parsedEntries: unknown = JSON.parse(savedEntries);
    return Array.isArray(parsedEntries) ? parsedEntries.filter(isGuestbookEntry) : [];
  } catch {
    return [];
  }
};

const skillGroups = {
  en: [
    { title: "Languages", items: ["JavaScript", "Java", "Python", "C#", "C", "Lua", "Dart", "HTML / CSS", "XML"] },
    { title: "Frameworks", items: ["React", "React Native", "Next.js", "Express.js", "Flutter", "Bootstrap"] },
    { title: "Data & tools", items: ["MySQL", "MariaDB", "GitHub", "Android Studio", "Figma"] },
    { title: "Creative tech", items: ["Unity", "Blender", "UX/UI design", "3D modelling"] },
  ],
  th: [
    { title: "ภาษาโปรแกรม", items: ["JavaScript", "Java", "Python", "C#", "C", "Lua", "Dart", "HTML / CSS", "XML"] },
    { title: "เฟรมเวิร์ก", items: ["React", "React Native", "Next.js", "Express.js", "Flutter", "Bootstrap"] },
    { title: "ข้อมูลและเครื่องมือ", items: ["MySQL", "MariaDB", "GitHub", "Android Studio", "Figma"] },
    { title: "เทคโนโลยีสร้างสรรค์", items: ["Unity", "Blender", "ออกแบบ UX/UI", "สร้างโมเดล 3D"] },
  ],
};

const projects: Record<"en" | "th", Project[]> = {
  en: [
    {
      title: "SugarFulit",
      subtitle: "Android application",
      coverCode: "SF",
      coverNumber: "01",
      description: "An Android application that presents sugar-content information in fruit, helping people with diabetes and anyone who wants to manage their sugar intake.",
      techStack: ["Java", "XML", "Android Studio", "UX/UI"],
      features: ["Designed and implemented the user experience and interface", "Developed the application across the full stack", "Focused the product on clear, accessible nutrition information"],
    },
    {
      title: "BrainFit",
      subtitle: "Mobile application",
      coverCode: "BF",
      coverNumber: "02",
      description: "A mobile application created to help reduce the risk of Alzheimer's disease through accessible cognitive activities and a simple mobile experience.",
      techStack: ["React Native", "JSX", "Google Sheets API", "UX/UI"],
      features: ["Developed the application with React Native", "Built the backend and supported frontend layout implementation", "Designed the data structure and integrated Google Sheets API"],
    },
    {
      title: "Grande Galaxy Hotel",
      subtitle: "Full-stack web application",
      coverCode: "GG",
      coverNumber: "03",
      description: "A complete hotel booking experience covering room search, reservations, online payments, room availability and an operational management dashboard.",
      techStack: ["Full-stack", "MariaDB", "Database design", "UX/UI"],
      features: ["Contributed to the UX/UI design", "Developed the complete full-stack application", "Designed and implemented the MariaDB database schema"],
    },
    {
      title: "SWU Metaverse",
      subtitle: "Competition project · 3rd place",
      coverCode: "SM",
      coverNumber: "04",
      description: "A virtual Srinakharinwirot University environment developed for the SWU Metaverse Competition, earning 3rd place and an invitation to join Metaverse training workshops.",
      techStack: ["Unity", "C#", "Blender", "3D optimisation"],
      features: ["Developed the player system in Unity with C#", "Modelled university buildings in Blender", "Imported and optimised 3D assets for the Metaverse environment"],
    },
    {
      title: "FiveM Server Development",
      subtitle: "Custom multiplayer server",
      coverCode: "FM",
      coverNumber: "05",
      description: "A custom FiveM server developed and maintained across gameplay systems, Lua scripting, web-based interfaces, debugging and performance optimisation.",
      techStack: ["FiveM", "Lua", "JavaScript", "MySQL"],
      features: ["Developed custom server-side gameplay systems with Lua", "Built and integrated web-based interfaces", "Debugged systems and improved server performance"],
    },
  ],
  th: [
    {
      title: "SugarFulit",
      subtitle: "แอปพลิเคชัน Android",
      coverCode: "SF",
      coverNumber: "01",
      description: "แอปพลิเคชันที่ให้ข้อมูลปริมาณน้ำตาลในผลไม้ เพื่อช่วยผู้ป่วยเบาหวานและผู้ที่ต้องการควบคุมปริมาณน้ำตาลในแต่ละวัน",
      techStack: ["Java", "XML", "Android Studio", "UX/UI"],
      features: ["ออกแบบและพัฒนา UX/UI", "รับผิดชอบการพัฒนาแอปพลิเคชันแบบ Full-stack", "ออกแบบการนำเสนอข้อมูลโภชนาการให้ชัดเจนและเข้าถึงง่าย"],
    },
    {
      title: "BrainFit",
      subtitle: "โมบายแอปพลิเคชัน",
      coverCode: "BF",
      coverNumber: "02",
      description: "แอปพลิเคชันมือถือที่พัฒนาขึ้นเพื่อช่วยลดความเสี่ยงของโรคอัลไซเมอร์ ผ่านกิจกรรมฝึกสมองที่เข้าถึงง่ายและประสบการณ์ใช้งานที่ไม่ซับซ้อน",
      techStack: ["React Native", "JSX", "Google Sheets API", "UX/UI"],
      features: ["พัฒนาแอปพลิเคชันด้วย React Native", "พัฒนาระบบ Backend และสนับสนุนการวาง Layout ฝั่ง Frontend", "ออกแบบโครงสร้างข้อมูลและเชื่อมต่อ Google Sheets API"],
    },
    {
      title: "Grande Galaxy Hotel",
      subtitle: "เว็บแอปพลิเคชัน Full-stack",
      coverCode: "GG",
      coverNumber: "03",
      description: "ระบบจองโรงแรมที่ครอบคลุมการค้นหาห้อง การจอง ชำระเงิน ตรวจสอบห้องว่าง และแดชบอร์ดสำหรับบริหารจัดการโรงแรม",
      techStack: ["Full-stack", "MariaDB", "Database design", "UX/UI"],
      features: ["มีส่วนร่วมในการออกแบบ UX/UI", "รับผิดชอบการพัฒนาเว็บแบบ Full-stack ทั้งระบบ", "ออกแบบและพัฒนาโครงสร้างฐานข้อมูล MariaDB"],
    },
    {
      title: "SWU Metaverse",
      subtitle: "ผลงานประกวด · รางวัลอันดับ 3",
      coverCode: "SM",
      coverNumber: "04",
      description: "โลกเสมือนของมหาวิทยาลัยศรีนครินทรวิโรฒสำหรับการแข่งขัน SWU Metaverse ได้รับรางวัลอันดับ 3 และได้รับเชิญให้เข้าร่วมกิจกรรมอบรมด้าน Metaverse",
      techStack: ["Unity", "C#", "Blender", "3D optimisation"],
      features: ["พัฒนาระบบผู้เล่นใน Unity ด้วย C#", "สร้างโมเดลอาคารมหาวิทยาลัยด้วย Blender", "นำเข้าและปรับแต่ง 3D Asset ให้เหมาะกับสภาพแวดล้อม Metaverse"],
    },
    {
      title: "FiveM Server Development",
      subtitle: "เซิร์ฟเวอร์ Multiplayer แบบกำหนดเอง",
      coverCode: "FM",
      coverNumber: "05",
      description: "พัฒนาและดูแลเซิร์ฟเวอร์ FiveM แบบกำหนดเอง ครอบคลุมระบบ Gameplay การเขียน Lua ระบบอินเทอร์เฟซบนเว็บ การแก้ข้อผิดพลาด และการปรับประสิทธิภาพ",
      techStack: ["FiveM", "Lua", "JavaScript", "MySQL"],
      features: ["พัฒนาระบบ Gameplay ฝั่งเซิร์ฟเวอร์ด้วย Lua", "สร้างและเชื่อมต่ออินเทอร์เฟซบนเว็บ", "แก้ไขข้อผิดพลาดและปรับปรุงประสิทธิภาพของเซิร์ฟเวอร์"],
    },
  ],
};

const content = {
  en: {
    available: "Currently building & learning",
    heroKicker: "Computer Engineering · Software Development",
    heroTitleLines: ["I build digital", "products that feel", "effortless."],
    heroIntroStart: "I’m",
    heroIntroEnd: "a Computer Engineering student building thoughtful web experiences and reliable systems that solve real problems.",
    explore: "Explore my work",
    contactMe: "Contact me",
    download: "Download CV",
    heroSkills: ["React", "TypeScript", "Node.js", "MongoDB"],
    heroCodeAria: "Developer profile shown as TypeScript code",
    heroFocusLabel: "Current focus",
    heroFocusValue: "Full-stack",
    heroProjectLabel: "Project status",
    heroProjectValue: "Building ideas",
    heroScroll: "Scroll to explore",
    profileTitle: "About Me",
    profileSubtitle: "Turning ideas into useful digital experiences.",
    profileGreeting: "Hello, I’m",
    profileName: "Thirawat Duangta",
    profileQuote: "I use code to turn practical ideas into experiences people can actually use.",
    profileOne: "I study Computer Engineering at Srinakharinwirot University and spend my time exploring how software can make everyday ideas useful and tangible.",
    profileTwo: "My work spans web, mobile, databases and interactive 3D. I use this space to document finished projects, experiments, lessons and the direction I’m growing toward.",
    nextPhoto: "Next photo",
    momentAlt: "Personal portrait of Thirawat",
    workIndex: "02 / Archive",
    workTitle: "Selected things I’ve made.",
    workIntro: "Coursework, independent builds and competition work across health, hospitality and immersive technology.",
    viewProject: "View project details",
    viewCase: "View case details",
    statsLabel: "Portfolio highlights",
    stats: [
      { value: 5, label: "Project builds", note: "Completed work across web, mobile, and interactive technology.", symbol: "PR" },
      { value: 1, label: "Competition award", note: "3rd place in the SWU Metaverse Competition.", symbol: "AW" },
      { value: 4, label: "Technology areas", note: "Languages, frameworks, data tools, and creative technology.", symbol: "TS" },
    ] satisfies AchievementStat[],

    portfolioTitle: "Work, credentials, and the tools behind them.",
    portfolioIntro: "A collection of applications and interactive experiences built through code, design, and practical problem-solving.",
    tabProjects: "Projects",
    tabCertificates: "Credentials",
    tabStack: "Toolkit",
    certificatesEmpty: "No certificate records added yet.",
    certificatesEmptyDetail: "This area is ready for verified certificate images, organisations, dates, and links.",
    skillsIndex: "03 / Toolkit",
    skillsTitle: "Tools I use to turn ideas into working things.",

    contactTitle: "Let’s connect.",
    contactIntro: "Interested in my work, want to exchange ideas, or build something together? Feel free to reach out.",
    privateTitle: "Contact",
    privateIntro: "Have something in mind? Send a private message and let’s talk.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    githubLabel: "GitHub",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    replyEmailLabel: "Email",
    emailPlaceholder: "Your email",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your idea, timeline, or question…",
    submitLabel: "Send private message",
    submitHint: "Your email app will open with this message ready to review.",
    connectTitle: "Connect with me",
    guestbookTitle: "Guestbook",
    guestbookIntro: "Leave a public note, question, or quick hello.",
    localPreview: "Local preview",
    guestNameLabel: "Display name",
    guestNamePlaceholder: "Name shown with your note",
    guestMessageLabel: "Public message",
    guestMessagePlaceholder: "Write your message here…",
    photoLabel: "Profile photo",
    optionalLabel: "optional",
    choosePhoto: "Choose a profile photo",
    photoHint: "JPG, PNG, or WebP · up to 300 KB",
    postLabel: "Post to guestbook",
    pinnedLabel: "Pinned note",
    ownerLabel: "Owner",
    ownerMessage: "Thanks for visiting. You can leave a question here or contact me privately by email.",
    ownerAvatarAlt: "Thirawat Duangta",
    emptyTitle: "The guestbook is ready.",
    emptyMessage: "Be the first person to leave a note in this browser.",
    localStorageNote: "Guestbook notes are stored only in this browser until a public backend is connected.",
    guestRequiredError: "Enter your name and a message before posting.",
    photoTypeError: "Choose a JPG, PNG, or WebP image.",
    photoSizeError: "The profile photo must be smaller than 300 KB.",
    storageError: "This browser could not save the note. Try a smaller image.",
    postedMessage: "Your note was added to the guestbook.",
  },
  th: {
    available: "กำลังสร้างและเรียนรู้",
    heroKicker: "วิศวกรรมคอมพิวเตอร์ · การพัฒนาซอฟต์แวร์",
    heroTitleLines: ["ผมสร้างผลิตภัณฑ์", "ดิจิทัลที่ใช้งาน", "ได้อย่างลื่นไหล"],
    heroIntroStart: "ผมคือ",
    heroIntroEnd: "นักศึกษาวิศวกรรมคอมพิวเตอร์ที่สร้างประสบการณ์บนเว็บและระบบที่เชื่อถือได้ เพื่อแก้ปัญหาที่เกิดขึ้นจริง",
    explore: "ดูผลงานของฉัน",
    contactMe: "ติดต่อฉัน",
    download: "ดาวน์โหลด CV",
    heroSkills: ["React", "TypeScript", "Node.js", "MongoDB"],
    heroCodeAria: "ข้อมูลนักพัฒนาในรูปแบบโค้ด TypeScript",
    heroFocusLabel: "สิ่งที่โฟกัส",
    heroFocusValue: "Full-stack",
    heroProjectLabel: "สถานะโปรเจกต์",
    heroProjectValue: "กำลังสร้างไอเดีย",
    heroScroll: "เลื่อนเพื่อสำรวจ",
    profileTitle: "เกี่ยวกับฉัน",
    profileSubtitle: "เปลี่ยนไอเดียให้เป็นประสบการณ์ดิจิทัลที่ใช้งานได้จริง",
    profileGreeting: "สวัสดี ผมคือ",
    profileName: "ธีรวัฒน์ ดวงตา",
    profileQuote: "ผมใช้โค้ดเปลี่ยนไอเดียที่ใช้งานได้จริง ให้กลายเป็นประสบการณ์ที่ผู้คนเข้าถึงได้",
    profileOne: "ผมศึกษาวิศวกรรมคอมพิวเตอร์ที่มหาวิทยาลัยศรีนครินทรวิโรฒ และสนใจการเปลี่ยนไอเดียในชีวิตประจำวันให้เป็นซอฟต์แวร์ที่ใช้งานได้จริง",
    profileTwo: "ผลงานของผมครอบคลุมเว็บ โมบาย ฐานข้อมูล และงาน 3D แบบ Interactive พื้นที่นี้ใช้บันทึกโปรเจกต์ การทดลอง บทเรียน และทิศทางที่กำลังพัฒนาตัวเอง",
    nextPhoto: "ภาพถัดไป",
    momentAlt: "ภาพถ่ายส่วนตัวของธีรวัฒน์",
    workIndex: "02 / คลังผลงาน",
    workTitle: "สิ่งที่ผมเคยสร้าง",
    workIntro: "ผลงานจากการเรียน โปรเจกต์ส่วนตัว และการแข่งขัน ครอบคลุมด้านสุขภาพ โรงแรม และเทคโนโลยีโลกเสมือน",
    viewProject: "ดูรายละเอียด",
    viewCase: "ดูรายละเอียดโปรเจกต์",
    statsLabel: "ภาพรวมผลงาน",
    stats: [
      { value: 5, label: "โปรเจกต์", note: "ผลงานด้านเว็บ โมบาย และเทคโนโลยี Interactive ที่ทำเสร็จแล้ว", symbol: "PR" },
      { value: 1, label: "รางวัลการแข่งขัน", note: "รางวัลอันดับ 3 จากการแข่งขัน SWU Metaverse", symbol: "AW" },
      { value: 4, label: "กลุ่มเทคโนโลยี", note: "ภาษา เฟรมเวิร์ก เครื่องมือข้อมูล และเทคโนโลยีสร้างสรรค์", symbol: "TS" },
    ] satisfies AchievementStat[],

    portfolioTitle: "ผลงาน หลักฐาน และเครื่องมือเบื้องหลัง",
    portfolioIntro: "รวมผลงานแอปพลิเคชันและประสบการณ์อินเทอร์แอกทีฟที่พัฒนาผ่านการเขียนโค้ด การออกแบบ และการแก้ปัญหาที่ใช้งานได้จริง",
    tabProjects: "โปรเจกต์",
    tabCertificates: "ใบรับรอง",
    tabStack: "เครื่องมือ",
    certificatesEmpty: "ยังไม่ได้เพิ่มข้อมูลใบรับรอง",
    certificatesEmptyDetail: "พื้นที่นี้พร้อมสำหรับภาพใบรับรอง ชื่อองค์กร วันที่ และลิงก์ที่ตรวจสอบได้",
    skillsIndex: "03 / เครื่องมือ",
    skillsTitle: "เครื่องมือที่ผมใช้เปลี่ยนไอเดียให้ทำงานได้จริง",

    contactTitle: "มาพูดคุยกัน",
    contactIntro: "สนใจผลงาน อยากแลกเปลี่ยนไอเดีย หรือสร้างอะไรบางอย่างร่วมกัน ติดต่อผมได้เสมอ",
    privateTitle: "ติดต่อ",
    privateIntro: "มีเรื่องอยากพูดคุย ส่งข้อความส่วนตัวมาได้ แล้วมาคุยกัน",
    emailLabel: "อีเมล",
    phoneLabel: "โทรศัพท์",
    githubLabel: "GitHub",
    nameLabel: "ชื่อ",
    namePlaceholder: "ชื่อของคุณ",
    replyEmailLabel: "อีเมล",
    emailPlaceholder: "อีเมลของคุณ",
    messageLabel: "ข้อความ",
    messagePlaceholder: "เล่าไอเดีย ระยะเวลา หรือคำถามที่อยากพูดคุย…",
    submitLabel: "ส่งข้อความส่วนตัว",
    submitHint: "ระบบจะเปิดแอปอีเมลพร้อมข้อความนี้ให้คุณตรวจสอบก่อนส่ง",
    connectTitle: "ช่องทางติดต่อ",
    guestbookTitle: "สมุดเยี่ยม",
    guestbookIntro: "ฝากข้อความ คำถาม หรือคำทักทายสั้น ๆ ไว้บนหน้านี้",
    localPreview: "ตัวอย่างในเครื่อง",
    guestNameLabel: "ชื่อที่แสดง",
    guestNamePlaceholder: "ชื่อที่จะแสดงพร้อมข้อความ",
    guestMessageLabel: "ข้อความสาธารณะ",
    guestMessagePlaceholder: "เขียนข้อความของคุณที่นี่…",
    photoLabel: "รูปโปรไฟล์",
    optionalLabel: "ไม่บังคับ",
    choosePhoto: "เลือกรูปโปรไฟล์",
    photoHint: "JPG, PNG หรือ WebP · ไม่เกิน 300 KB",
    postLabel: "โพสต์ลงสมุดเยี่ยม",
    pinnedLabel: "ข้อความปักหมุด",
    ownerLabel: "เจ้าของเว็บไซต์",
    ownerMessage: "ขอบคุณที่เข้ามาเยี่ยมชม ฝากคำถามไว้ที่นี่หรือติดต่อผมเป็นการส่วนตัวผ่านอีเมลได้เสมอ",
    ownerAvatarAlt: "ธีรวัฒน์ ดวงตา",
    emptyTitle: "สมุดเยี่ยมพร้อมแล้ว",
    emptyMessage: "ฝากข้อความแรกจากเบราว์เซอร์นี้ได้เลย",
    localStorageNote: "ข้อความจะถูกเก็บไว้เฉพาะในเบราว์เซอร์นี้ จนกว่าจะเชื่อมต่อระบบหลังบ้านสำหรับการเผยแพร่จริง",
    guestRequiredError: "กรุณากรอกชื่อและข้อความก่อนโพสต์",
    photoTypeError: "กรุณาเลือกไฟล์ JPG, PNG หรือ WebP",
    photoSizeError: "รูปโปรไฟล์ต้องมีขนาดไม่เกิน 300 KB",
    storageError: "เบราว์เซอร์ไม่สามารถบันทึกข้อความได้ ลองใช้รูปที่เล็กลง",
    postedMessage: "เพิ่มข้อความลงในสมุดเยี่ยมแล้ว",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const ambientLayerRef = useRef<HTMLDivElement>(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
  const [activePortfolioTab, setActivePortfolioTab] = useState<PortfolioTab>("projects");
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(loadGuestbookEntries);
  const [guestbookError, setGuestbookError] = useState("");
  const [guestbookStatus, setGuestbookStatus] = useState("");
  const [selectedAvatarName, setSelectedAvatarName] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const copy = content[language];
  const localizedProjects = projects[language];
  const selectedProject = localizedProjects.find((project) => project.title === selectedProjectTitle) ?? null;
  const closeSelectedProject = useCallback(() => setSelectedProjectTitle(null), []);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = language === "th" ? `ติดต่อผ่าน Portfolio — ${name}` : `Portfolio enquiry — ${name}`;
    const body = language === "th"
      ? `ชื่อ: ${name}\nอีเมล: ${email}\n\nข้อความ:\n${message}`
      : `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    window.location.href = `mailto:title.thirawat.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setGuestbookError("");
    setGuestbookStatus("");

    if (!file) {
      setSelectedAvatarName("");
      return;
    }

    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      event.target.value = "";
      setSelectedAvatarName("");
      setGuestbookError(copy.photoTypeError);
      return;
    }

    if (file.size > MAX_AVATAR_BYTES) {
      event.target.value = "";
      setSelectedAvatarName("");
      setGuestbookError(copy.photoSizeError);
      return;
    }

    setSelectedAvatarName(file.name);
  };

  const handleGuestbookSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGuestbookError("");
    setGuestbookStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("guestName") ?? "").trim();
    const message = String(formData.get("guestMessage") ?? "").trim();
    const avatarFile = avatarInputRef.current?.files?.[0];

    if (!name || !message) {
      setGuestbookError(copy.guestRequiredError);
      return;
    }

    let avatarDataUrl: string | undefined;
    try {
      if (avatarFile) avatarDataUrl = await readFileAsDataUrl(avatarFile);

      const nextEntries = [{
        id: crypto.randomUUID(),
        name,
        message,
        createdAt: new Date().toISOString(),
        avatarDataUrl,
      }, ...guestbookEntries].slice(0, MAX_GUESTBOOK_ENTRIES);

      window.localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(nextEntries));
      setGuestbookEntries(nextEntries);
      setGuestbookStatus(copy.postedMessage);
      setSelectedAvatarName("");
      form.reset();
    } catch {
      setGuestbookError(copy.storageError);
    }
  };

  const formatGuestbookDate = (createdAt: string) => {
    return new Intl.DateTimeFormat(language === "th" ? "th-TH" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(createdAt));
  };


  const changePortfolioTabWithKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>, currentTab: PortfolioTab) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const currentIndex = portfolioTabs.indexOf(currentTab);
    const nextTab = portfolioTabs[(currentIndex + direction + portfolioTabs.length) % portfolioTabs.length];
    setActivePortfolioTab(nextTab);
    document.getElementById(`portfolio-tab-${nextTab}`)?.focus();
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    const revealHashTarget = () => {
      if (!window.location.hash) return;

      const target = document.querySelector(window.location.hash);
      target?.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        element.classList.add("is-visible");
      });
    };

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    root.classList.add("reveal-enabled");
    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", revealHashTarget);
      root.classList.remove("reveal-enabled");
    };
  }, [activePortfolioTab]);

  useEffect(() => {
    const ambientLayer = ambientLayerRef.current;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!ambientLayer || reducedMotionQuery.matches) return;

    let animationFrameId = 0;
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const renderAmbientMotion = () => {
      currentScroll += (targetScroll - currentScroll) * 0.095;

      const motionScale = window.innerWidth <= 640 ? 0.5 : 1;
      const bluePhase = currentScroll / 780;
      const cyanPhase = currentScroll / 940;
      const indigoPhase = currentScroll / 1140;

      ambientLayer.style.setProperty(
        "--ambient-blue-transform",
        `translate3d(${Math.sin(bluePhase) * 210 * motionScale}px, ${Math.cos(bluePhase * 0.72) * 82 * motionScale}px, 0) scale(${1 + Math.sin(bluePhase * 0.54) * 0.06})`,
      );
      ambientLayer.style.setProperty(
        "--ambient-cyan-transform",
        `translate3d(${Math.cos(cyanPhase + 0.8) * 165 * motionScale}px, ${Math.sin(cyanPhase * 0.9) * 108 * motionScale}px, 0) scale(${1 + Math.cos(cyanPhase * 0.61) * 0.07})`,
      );
      ambientLayer.style.setProperty(
        "--ambient-indigo-transform",
        `translate3d(${Math.sin(indigoPhase + 2.1) * 135 * motionScale}px, ${Math.cos(indigoPhase * 1.08) * 76 * motionScale}px, 0) scale(${1 + Math.sin(indigoPhase * 0.66) * 0.05})`,
      );

      if (Math.abs(targetScroll - currentScroll) > 0.1) {
        animationFrameId = window.requestAnimationFrame(renderAmbientMotion);
      } else {
        currentScroll = targetScroll;
        animationFrameId = 0;
      }
    };

    const queueAmbientMotion = () => {
      targetScroll = window.scrollY;
      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(renderAmbientMotion);
      }
    };

    renderAmbientMotion();
    window.addEventListener("scroll", queueAmbientMotion, { passive: true });

    return () => {
      window.removeEventListener("scroll", queueAmbientMotion);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main id="main-content" className="Home">
      <div className="Home-ambient" ref={ambientLayerRef} aria-hidden="true">
        <span className="Home-ambient-orb Home-ambient-orb-blue" />
        <span className="Home-ambient-orb Home-ambient-orb-cyan" />
        <span className="Home-ambient-orb Home-ambient-orb-indigo" />
      </div>
      <section className="Hero" id="home">
        <span className="Hero-lighting" aria-hidden="true" />
        <div className="Hero-content">
          <div className="Hero-copy">
            <p className="Hero-status"><span aria-hidden="true" /> {copy.available}</p>
            <p className="Hero-kicker">{copy.heroKicker}</p>
            <h1>
              {copy.heroTitleLines.map((line, index) => (
                <span className={index > 0 ? "is-accent" : undefined} key={line}>{line}</span>
              ))}
            </h1>
            <p className="Hero-intro">{copy.heroIntroStart} <strong>Thirawat Duangta</strong>, {copy.heroIntroEnd}</p>
            <div className="Hero-actions">
              <a href="#work" className="Button Button-primary">{copy.explore}<span aria-hidden="true">↗</span></a>
              <a href="#contact" className="Button Button-secondary">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6" /></svg>
                {copy.contactMe}
              </a>
            </div>
            <div className="Hero-tech" aria-label={language === "th" ? "เทคโนโลยีหลัก" : "Core technologies"}>
              {copy.heroSkills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
          <figure className="Hero-code-visual" aria-label={copy.heroCodeAria}>
            <span className="Hero-code-orbit" aria-hidden="true" />
            <div className="Hero-code-entry">
              <div className="Hero-code-float">
                <div className="Hero-code-window">
                  <div className="Hero-code-toolbar" aria-hidden="true">
                    <span className="is-red" /><span className="is-yellow" /><span className="is-green" />
                    <strong>portfolio.tsx</strong>
                  </div>
                  <ol className="Hero-code-lines">
                    <li><code><span className="Code-keyword">const</span> developer = &#123;</code></li>
                    <li><code>name: <span className="Code-string">&quot;Thirawat Duangta&quot;</span>,</code></li>
                    <li><code>focus: <span className="Code-string">&quot;Full-stack&quot;</span>,</code></li>
                    <li><code>crafts: <span className="Code-string">&quot;Useful digital products&quot;</span>,</code></li>
                    <li><code>status: <span className="Code-string">&quot;Always learning&quot;</span></code></li>
                    <li><code>&#125;</code></li>
                    <li><code><span className="Code-keyword">export default</span> developer;</code></li>
                  </ol>
                  <div className="Hero-code-footer" aria-hidden="true"><span>BUILD · LEARN · ITERATE</span><span>UTF-8</span></div>
                </div>
              </div>
              <div className="Hero-callout Hero-callout-focus">
                <div className="Hero-callout-surface">
                  <span className="Hero-callout-icon" aria-hidden="true">&lt;/&gt;</span>
                  <span><small>{copy.heroFocusLabel}</small><strong>{copy.heroFocusValue}</strong></span>
                </div>
              </div>
              <div className="Hero-callout Hero-callout-status">
                <div className="Hero-callout-surface">
                  <span className="Hero-callout-dot" aria-hidden="true" />
                  <span><small>{copy.heroProjectLabel}</small><strong>{copy.heroProjectValue}</strong></span>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className="Intro Section" id="about">
        <div className="Section-heading-centered" data-reveal>
          <h2>{copy.profileTitle}</h2>
          <p>{copy.profileSubtitle}</p>
        </div>
        <div className="Intro-grid">
          <div className="Intro-copy" data-reveal>
            <h3><span>{copy.profileGreeting}</span><strong>{copy.profileName}</strong></h3>
            <p>{copy.profileOne}</p>
            <p>{copy.profileTwo}</p>
            <blockquote>“{copy.profileQuote}”</blockquote>
            <div className="Intro-actions">
              <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="Button Button-primary">{copy.download}</a>
              <a href="#work" className="Text-link">{copy.explore} <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="Intro-visual" data-reveal>
            <div className="Intro-image-float">
              <div className="Intro-image-frame">
                <img src={profileMomentTwo} alt={copy.momentAlt} loading="lazy" />
                <span aria-hidden="true">THIRAWAT / 2026</span>
              </div>
            </div>
          </div>
        </div>
        <AchievementStats stats={copy.stats} ariaLabel={copy.statsLabel} />
      </section>

      <section className="Portfolio Section" id="work">
        <div className="Section-heading-centered" data-reveal>

          <h2>{copy.portfolioTitle}</h2>
          <p>{copy.portfolioIntro}</p>
        </div>
        <div className="Portfolio-tabs" role="tablist" aria-label={copy.portfolioTitle} data-reveal>
          {portfolioTabs.map((tab) => {
            const label = tab === "projects" ? copy.tabProjects : tab === "certificates" ? copy.tabCertificates : copy.tabStack;
            return (
              <button
                id={`portfolio-tab-${tab}`}
                key={tab}
                type="button"
                role="tab"
                aria-selected={activePortfolioTab === tab}
                aria-controls={`portfolio-panel-${tab}`}
                tabIndex={activePortfolioTab === tab ? 0 : -1}
                onClick={() => setActivePortfolioTab(tab)}
                onKeyDown={(event) => changePortfolioTabWithKeyboard(event, tab)}
              >
                <span>0{portfolioTabs.indexOf(tab) + 1}</span>{label}
              </button>
            );
          })}
        </div>

        <div className="Portfolio-content">
          {activePortfolioTab === "projects" && (
            <div className="Portfolio-panel Project-list" id="portfolio-panel-projects" role="tabpanel" aria-labelledby="portfolio-tab-projects" key="projects">
              {localizedProjects.map((project) => (
                <article key={project.title} className="Project-card" data-reveal>
                  <button className="Project-visual" onClick={() => setSelectedProjectTitle(project.title)} aria-label={`${copy.viewProject}: ${project.title}`}>
                    <ProjectCover title={project.title} subtitle={project.subtitle} code={project.coverCode} number={project.coverNumber} />
                    <span className="Project-open" aria-hidden="true">↗</span>
                  </button>
                  <div className="Project-copy">
                    <span className="Project-type">{project.subtitle}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="Project-tags">{project.techStack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
                    <button className="Text-link Project-detail" onClick={() => setSelectedProjectTitle(project.title)}>{copy.viewCase} <span aria-hidden="true">→</span></button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activePortfolioTab === "certificates" && (
            <div className="Portfolio-panel Certificates-empty" id="portfolio-panel-certificates" role="tabpanel" aria-labelledby="portfolio-tab-certificates" key="certificates">
              <span aria-hidden="true">00 / CERT</span>
              <h3>{copy.certificatesEmpty}</h3>
              <p>{copy.certificatesEmptyDetail}</p>
            </div>
          )}

          {activePortfolioTab === "stack" && (
            <div className="Portfolio-panel Tech-groups" id="portfolio-panel-stack" role="tabpanel" aria-labelledby="portfolio-tab-stack" key="stack">
              {skillGroups[language].map((group, groupIndex) => (
                <section className="Tech-group" key={group.title}>
                  <div className="Tech-group-heading"><span>0{groupIndex + 1}</span><h3>{group.title}</h3></div>
                  <div className="Tech-grid">
                    {group.items.map((item) => (
                      <article className="Tech-card" key={item}>
                        <span aria-hidden="true">{getTechMark(item)}</span>
                        <strong>{item}</strong>
                        <small>{group.title}</small>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="Contact Section" id="contact">
        <div className="Contact-heading Section-heading-centered" data-reveal>
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactIntro}</p>
        </div>
        <div className="Contact-board" data-reveal>
          <aside className="Contact-sidebar">
            <form className="Contact-private-form" onSubmit={handleContactSubmit}>
              <header className="Contact-card-heading">
                <span className="Contact-heading-mark" aria-hidden="true">↗</span>
                <div>
                  <h3>{copy.privateTitle}</h3>
                  <p>{copy.privateIntro}</p>
                </div>
              </header>

              <label>
                <span>{copy.nameLabel}</span>
                <input name="name" type="text" autoComplete="name" placeholder={copy.namePlaceholder} required />
              </label>
              <label>
                <span>{copy.replyEmailLabel}</span>
                <input name="email" type="email" autoComplete="email" placeholder={copy.emailPlaceholder} required />
              </label>
              <label>
                <span>{copy.messageLabel}</span>
                <textarea name="message" rows={6} minLength={10} placeholder={copy.messagePlaceholder} required />
              </label>
              <button className="Contact-primary-action" type="submit">
                <span>{copy.submitLabel}</span>
                <span aria-hidden="true">→</span>
              </button>
              <p className="Contact-form-note">{copy.submitHint}</p>
            </form>

            <section className="Contact-socials" aria-labelledby="contact-socials-title">
              <h3 id="contact-socials-title"><span aria-hidden="true" />{copy.connectTitle}</h3>
              <nav className="Contact-social-grid" aria-label={copy.connectTitle}>
                <a className="Contact-social-link Contact-social-link-wide" href="mailto:title.thirawat.dev@gmail.com">
                  <span className="Contact-social-icon" aria-hidden="true">@</span>
                  <span><strong>{copy.emailLabel}</strong><small>title.thirawat.dev@gmail.com</small></span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="Contact-social-link" href="https://github.com/err0r4o4-dev" target="_blank" rel="noopener noreferrer">
                  <span className="Contact-social-icon" aria-hidden="true">GH</span>
                  <span><strong>{copy.githubLabel}</strong><small>err0r4o4-dev</small></span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="Contact-social-link" href="tel:+66615071665">
                  <span className="Contact-social-icon" aria-hidden="true">TEL</span>
                  <span><strong>{copy.phoneLabel}</strong><small>+66 61 507 1665</small></span>
                  <span aria-hidden="true">↗</span>
                </a>
              </nav>
            </section>
          </aside>

          <section className="Guestbook" aria-labelledby="guestbook-title">
            <header className="Guestbook-toolbar">
              <div>
                <span className="Guestbook-mark" aria-hidden="true">//</span>
                <h3 id="guestbook-title">{copy.guestbookTitle} <span>({guestbookEntries.length + 1})</span></h3>
              </div>
              <small>{copy.localPreview}</small>
            </header>

            <form className="Guestbook-form" onSubmit={handleGuestbookSubmit}>
              <div className="Guestbook-field-grid">
                <label>
                  <span>{copy.guestNameLabel}<b aria-hidden="true"> *</b></span>
                  <input name="guestName" type="text" autoComplete="name" maxLength={48} placeholder={copy.guestNamePlaceholder} required />
                </label>
                <label>
                  <span>{copy.guestMessageLabel}<b aria-hidden="true"> *</b></span>
                  <textarea name="guestMessage" rows={5} minLength={2} maxLength={500} placeholder={copy.guestMessagePlaceholder} required />
                </label>
              </div>

              <div className="Guestbook-upload-field">
                <span>{copy.photoLabel} <small>({copy.optionalLabel})</small></span>
                <label className="Guestbook-upload">
                  <input ref={avatarInputRef} name="guestAvatar" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleAvatarChange} />
                  <span className="Guestbook-upload-icon" aria-hidden="true">IMG</span>
                  <strong>{selectedAvatarName || copy.choosePhoto}</strong>
                </label>
                <small>{copy.photoHint}</small>
              </div>

              <button className="Guestbook-submit" type="submit">
                <span>{copy.postLabel}</span>
                <span aria-hidden="true">→</span>
              </button>
              <p className="Guestbook-storage-note">{copy.localStorageNote}</p>
              {guestbookError && <p className="Guestbook-feedback is-error" role="alert">{guestbookError}</p>}
              {guestbookStatus && <p className="Guestbook-feedback is-success" role="status">{guestbookStatus}</p>}
            </form>

            <div className="Guestbook-feed" aria-live="polite">
              <article className="Guestbook-entry Guestbook-entry-pinned">
                <div className="Guestbook-pin"><span aria-hidden="true">⌁</span>{copy.pinnedLabel}</div>
                <div className="Guestbook-entry-body">
                  <img src={profileMomentTwo} alt={copy.ownerAvatarAlt} />
                  <div>
                    <header><strong>Thirawat</strong><span>{copy.ownerLabel}</span></header>
                    <p>{copy.ownerMessage}</p>
                  </div>
                </div>
              </article>

              {guestbookEntries.length === 0 ? (
                <div className="Guestbook-empty">
                  <span aria-hidden="true">01</span>
                  <div><strong>{copy.emptyTitle}</strong><p>{copy.emptyMessage}</p></div>
                </div>
              ) : guestbookEntries.map((entry) => (
                <article className="Guestbook-entry" key={entry.id}>
                  <div className="Guestbook-entry-body">
                    {entry.avatarDataUrl
                      ? <img src={entry.avatarDataUrl} alt={entry.name} />
                      : <span className="Guestbook-avatar" aria-hidden="true">{entry.name.slice(0, 2).toUpperCase()}</span>}
                    <div>
                      <header><strong>{entry.name}</strong><time dateTime={entry.createdAt}>{formatGuestbookDate(entry.createdAt)}</time></header>
                      <p>{entry.message}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeSelectedProject} />}
    </main>
  );
}
