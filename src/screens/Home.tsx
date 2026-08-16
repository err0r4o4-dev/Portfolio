import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../language";
import ProjectModal, { type Project } from "../components/ProjectModal";
import ProjectCover from "../components/ProjectCover";
import AchievementStats, { type AchievementStat } from "../components/AchievementStats";
import ConnectSection from "../components/connect/ConnectSection";
import profileMomentOne from "../assets/profile-moment-01-optimized.jpg";
import profileMomentTwo from "../assets/profile-moment-02-optimized.jpg";
import profileMomentThree from "../assets/profile-moment-03-optimized.jpg";
import desktopDuckIcon from "../assets/desktop-duck-icon.png";


const portfolioTabs = ["projects", "certificates", "stack"] as const;
type PortfolioTab = (typeof portfolioTabs)[number];
const profileMoments = [profileMomentTwo, profileMomentThree, profileMomentOne];
const PROFILE_MOMENT_INTERVAL_MS = 5_000;
const THE_SVG_CDN = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons";
const techLogoPaths: Record<string, string> = {
  JavaScript: "javascript/default",
  Java: "java/default",
  Python: "python/default",
  "C#": "c-sharp/default",
  C: "c/default",
  Lua: "lua/default",
  Dart: "dart/default",
  "HTML / CSS": "html5/default",
  XML: "xml/default",
  React: "react/default",
  "React Native": "react/default",
  "Next.js": "nextdotjs/default",
  "Express.js": "expressdotjs/light",
  Flutter: "flutter/default",
  Bootstrap: "bootstrap/default",
  MySQL: "mysql/default",
  MariaDB: "mariadb/default",
  GitHub: "github/light",
  "Android Studio": "android-studio/default",
  Figma: "figma/default",
  Unity: "unity/light",
  Blender: "blender/default",
  "UX/UI design": "figma/default",
  "ออกแบบ UX/UI": "figma/default",
  "3D modelling": "blender/default",
  "สร้างโมเดล 3D": "blender/default",
};
const getTechLogo = (name: string) => `${THE_SVG_CDN}/${techLogoPaths[name]}.svg`;

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
      title: "SugarFruit",
      subtitle: "Android application",
      coverCode: "SF",
      coverNumber: "01",
      description: "An Android application that presents sugar-content information in fruit, helping people with diabetes and anyone who wants to manage their sugar intake.",
      techStack: ["Java", "XML", "Android Studio", "UX/UI"],
      features: ["Designed and implemented the user experience and interface", "Developed the application across the full stack", "Focused the product on clear, accessible nutrition information"],
    },
    {
      title: "DesktopDuck",
      subtitle: "Windows desktop application · Public source",
      coverCode: "DD",
      coverNumber: "02",
      coverImage: desktopDuckIcon,
      description: "A source-available Windows desktop pet that walks, rests, sleeps, reacts to the cursor and stays within the usable area across multiple displays.",
      techStack: ["Python", "PySide6", "Windows", "PyInstaller"],
      features: ["Built a state-driven animation and movement system", "Added cursor avoidance, drag interactions, tray controls and multi-monitor boundaries", "Kept the application local-only with no network, registry or autostart behaviour"],
      githubUrl: "https://github.com/err0r4o4-dev/DesktopDuck",
    },
    {
      title: "BrainFit",
      subtitle: "Mobile application",
      coverCode: "BF",
      coverNumber: "03",
      description: "A mobile application that supports cognitive engagement through accessible activities and a simple mobile experience.",
      techStack: ["React Native", "JSX", "Google Sheets API", "UX/UI"],
      features: ["Developed the application with React Native", "Built the backend and supported frontend layout implementation", "Designed the data structure and integrated Google Sheets API"],
    },
    {
      title: "Grande Galaxy Hotel",
      subtitle: "Full-stack web application",
      coverCode: "GG",
      coverNumber: "04",
      description: "A complete hotel booking experience covering room search, reservations, online payments, room availability and an operational management dashboard.",
      techStack: ["Full-stack", "MariaDB", "Database design", "UX/UI"],
      features: ["Contributed to the UX/UI design", "Developed the complete full-stack application", "Designed and implemented the MariaDB database schema"],
    },
    {
      title: "SWU Metaverse",
      subtitle: "Competition project · 3rd place",
      coverCode: "SM",
      coverNumber: "05",
      description: "A virtual Srinakharinwirot University environment developed for the SWU Metaverse Competition, earning 3rd place and an invitation to join Metaverse training workshops.",
      techStack: ["Unity", "C#", "Blender", "3D optimisation"],
      features: ["Developed the player system in Unity with C#", "Modelled university buildings in Blender", "Imported and optimised 3D assets for the Metaverse environment"],
    },
    {
      title: "FiveM Server Development",
      subtitle: "Custom multiplayer server",
      coverCode: "FM",
      coverNumber: "06",
      description: "A custom FiveM server developed and maintained across gameplay systems, Lua scripting, web-based interfaces, debugging and performance optimisation.",
      techStack: ["FiveM", "Lua", "JavaScript", "MySQL"],
      features: ["Developed custom server-side gameplay systems with Lua", "Built and integrated web-based interfaces", "Debugged systems and improved server performance"],
    },
  ],
  th: [
    {
      title: "SugarFruit",
      subtitle: "แอปพลิเคชัน Android",
      coverCode: "SF",
      coverNumber: "01",
      description: "แอปพลิเคชันที่ให้ข้อมูลปริมาณน้ำตาลในผลไม้ เพื่อช่วยผู้ป่วยเบาหวานและผู้ที่ต้องการควบคุมปริมาณน้ำตาลในแต่ละวัน",
      techStack: ["Java", "XML", "Android Studio", "UX/UI"],
      features: ["ออกแบบและพัฒนา UX/UI", "รับผิดชอบการพัฒนาแอปพลิเคชันแบบ Full-stack", "ออกแบบการนำเสนอข้อมูลโภชนาการให้ชัดเจนและเข้าถึงง่าย"],
    },
    {
      title: "DesktopDuck",
      subtitle: "แอปพลิเคชันเดสก์ท็อป Windows · มีซอร์สโค้ดสาธารณะ",
      coverCode: "DD",
      coverNumber: "02",
      coverImage: desktopDuckIcon,
      description: "Desktop pet สำหรับ Windows ที่สามารถเดิน พัก หลับ ตอบสนองต่อเมาส์ และเคลื่อนที่อยู่ในพื้นที่ใช้งานของหลายหน้าจอ",
      techStack: ["Python", "PySide6", "Windows", "PyInstaller"],
      features: ["พัฒนาระบบสถานะ ภาพเคลื่อนไหว และการเคลื่อนที่", "เพิ่มการวิ่งหนีเมาส์ การลาก เมนู tray และขอบเขตหลายหน้าจอ", "ออกแบบให้ทำงานภายในเครื่องโดยไม่มี network, registry หรือ autostart"],
      githubUrl: "https://github.com/err0r4o4-dev/DesktopDuck",
    },
    {
      title: "BrainFit",
      subtitle: "โมบายแอปพลิเคชัน",
      coverCode: "BF",
      coverNumber: "03",
      description: "แอปพลิเคชันมือถือที่สนับสนุนการฝึกทักษะด้านความคิดและความจำ ผ่านกิจกรรมที่เข้าถึงง่ายและประสบการณ์ใช้งานที่ไม่ซับซ้อน",
      techStack: ["React Native", "JSX", "Google Sheets API", "UX/UI"],
      features: ["พัฒนาแอปพลิเคชันด้วย React Native", "พัฒนาระบบ Backend และสนับสนุนการวาง Layout ฝั่ง Frontend", "ออกแบบโครงสร้างข้อมูลและเชื่อมต่อ Google Sheets API"],
    },
    {
      title: "Grande Galaxy Hotel",
      subtitle: "เว็บแอปพลิเคชัน Full-stack",
      coverCode: "GG",
      coverNumber: "04",
      description: "ระบบจองโรงแรมที่ครอบคลุมการค้นหาห้อง การจอง ชำระเงิน ตรวจสอบห้องว่าง และแดชบอร์ดสำหรับบริหารจัดการโรงแรม",
      techStack: ["Full-stack", "MariaDB", "Database design", "UX/UI"],
      features: ["มีส่วนร่วมในการออกแบบ UX/UI", "รับผิดชอบการพัฒนาเว็บแบบ Full-stack ทั้งระบบ", "ออกแบบและพัฒนาโครงสร้างฐานข้อมูล MariaDB"],
    },
    {
      title: "SWU Metaverse",
      subtitle: "ผลงานประกวด · รางวัลอันดับ 3",
      coverCode: "SM",
      coverNumber: "05",
      description: "โลกเสมือนของมหาวิทยาลัยศรีนครินทรวิโรฒสำหรับการแข่งขัน SWU Metaverse ได้รับรางวัลอันดับ 3 และได้รับเชิญให้เข้าร่วมกิจกรรมอบรมด้าน Metaverse",
      techStack: ["Unity", "C#", "Blender", "3D optimisation"],
      features: ["พัฒนาระบบผู้เล่นใน Unity ด้วย C#", "สร้างโมเดลอาคารมหาวิทยาลัยด้วย Blender", "นำเข้าและปรับแต่ง 3D Asset ให้เหมาะกับสภาพแวดล้อม Metaverse"],
    },
    {
      title: "FiveM Server Development",
      subtitle: "เซิร์ฟเวอร์ Multiplayer แบบกำหนดเอง",
      coverCode: "FM",
      coverNumber: "06",
      description: "พัฒนาและดูแลเซิร์ฟเวอร์ FiveM แบบกำหนดเอง ครอบคลุมระบบ Gameplay การเขียน Lua ระบบอินเทอร์เฟซบนเว็บ การแก้ข้อผิดพลาด และการปรับประสิทธิภาพ",
      techStack: ["FiveM", "Lua", "JavaScript", "MySQL"],
      features: ["พัฒนาระบบ Gameplay ฝั่งเซิร์ฟเวอร์ด้วย Lua", "สร้างและเชื่อมต่ออินเทอร์เฟซบนเว็บ", "แก้ไขข้อผิดพลาดและปรับปรุงประสิทธิภาพของเซิร์ฟเวอร์"],
    },
  ],
};

const content = {
  en: {
    available: "Building, learning & documenting",
    heroKicker: "Software Developer · Computer Engineering Student",
    heroTitleLines: ["Software", "Developer"],
    heroIntroStart: "I’m",
    heroIntroEnd: "a Computer Engineering student building projects across web, mobile, backend systems, game servers and interactive 3D.",
    explore: "Explore my work",
    contactMe: "Contact me",
    download: "Download CV",
    heroSkills: ["React", "TypeScript", "Java", "MariaDB"],
    heroCodeAria: "Developer profile shown as TypeScript code",
    heroFocusLabel: "Primary focus",
    heroFocusValue: "Software Developer",
    heroProjectLabel: "Current status",
    heroProjectValue: "Creating & exploring",
    heroScroll: "Scroll to explore",
    profileTitle: "About Me",
    profileSubtitle: "Learning through hands-on projects.",
    profileGreeting: "Hello, I’m",
    profileName: "Thirawat Duangta",
    profileQuote: "I use code to turn practical ideas into experiences people can actually use.",
    profileOne: "I study Computer Engineering at Srinakharinwirot University and enjoy exploring different areas of software development.",
    profileTwo: "My work includes web applications, mobile apps, backend systems, game server development and interactive 3D environments. I've worked with technologies ranging from React and Java to Unity and Blender.",
    profileThree: "This portfolio is where I document the projects I've built, the problems I've solved and what I learned along the way.",
    profileFacts: [
      { label: "Education", value: "Computer Engineering · Srinakharinwirot University" },
      { label: "Interests", value: "Software Development · Interactive Technology · UX/UI" },
      { label: "Currently exploring", value: "Backend Systems · Applied AI · Software Engineering" },
    ],
    nextPhoto: "Next photo",
    momentAlt: "Personal portrait of Thirawat",
    workIndex: "02 / Archive",
    workTitle: "Selected things I’ve made.",
    workIntro: "Coursework, independent builds and competition work across health, hospitality and immersive technology.",
    viewProject: "View project details",
    viewCase: "View case details",
    statsLabel: "Portfolio highlights",
    stats: [
      { value: 6, label: "Project case notes", note: "Documented builds across desktop, web, mobile, and interactive technology.", symbol: "PR" },
      { value: 1, label: "Competition award", note: "3rd place in the SWU Metaverse Competition.", symbol: "AW" },
      { value: 4, label: "Technology areas", note: "Languages, frameworks, data tools, and creative technology.", symbol: "TS" },
    ] satisfies AchievementStat[],

    portfolioTitle: "Portfolio Showcase",
    portfolioIntro: "A collection of applications and interactive experiences built through code, design, and practical problem-solving.",
    tabProjects: "Projects",
    tabCertificates: "Certificates",
    tabStack: "Tech Stack",
    certificatesEmpty: "Certificates coming soon",
    certificatesEmptyDetail: "Verified certificate images, issuing organisations, dates, and credential links will be added here.",
    skillsIndex: "03 / Toolkit",
    skillsTitle: "Tools I use to turn ideas into working things.",

  },
  th: {
    available: "กำลังสร้าง เรียนรู้ และบันทึก",
    heroKicker: "นักพัฒนาซอฟต์แวร์ · นักศึกษาวิศวกรรมคอมพิวเตอร์",
    heroTitleLines: ["นักพัฒนา", "ซอฟต์แวร์"],
    heroIntroStart: "ผมคือ",
    heroIntroEnd: "นักศึกษาวิศวกรรมคอมพิวเตอร์ที่สร้างโปรเจกต์ด้านเว็บ โมบาย ระบบ Backend เกมเซิร์ฟเวอร์ และ Interactive 3D",
    explore: "ดูผลงานของฉัน",
    contactMe: "ติดต่อฉัน",
    download: "ดาวน์โหลด CV",
    heroSkills: ["React", "TypeScript", "Java", "MariaDB"],
    heroCodeAria: "ข้อมูลนักพัฒนาในรูปแบบโค้ด TypeScript",
    heroFocusLabel: "สิ่งที่โฟกัส",
    heroFocusValue: "Software Developer",
    heroProjectLabel: "สถานะปัจจุบัน",
    heroProjectValue: "กำลังสร้างและสำรวจ",
    heroScroll: "เลื่อนเพื่อสำรวจ",
    profileTitle: "เกี่ยวกับฉัน",
    profileSubtitle: "เรียนรู้ผ่านการลงมือสร้างโปรเจกต์จริง",
    profileGreeting: "สวัสดี ผมคือ",
    profileName: "ถิรวัฒน์ ดวงตา",
    profileQuote: "ผมใช้โค้ดเปลี่ยนไอเดียที่ใช้งานได้จริง ให้กลายเป็นประสบการณ์ที่ผู้คนเข้าถึงได้",
    profileOne: "ผมศึกษาวิศวกรรมคอมพิวเตอร์ที่มหาวิทยาลัยศรีนครินทรวิโรฒ และสนุกกับการสำรวจแขนงต่าง ๆ ของการพัฒนาซอฟต์แวร์",
    profileTwo: "ผลงานของผมครอบคลุมเว็บแอปพลิเคชัน แอปมือถือ ระบบ Backend การพัฒนาเกมเซิร์ฟเวอร์ และสภาพแวดล้อม 3D แบบ Interactive โดยได้ทำงานกับเทคโนโลยีตั้งแต่ React และ Java ไปจนถึง Unity และ Blender",
    profileThree: "พอร์ตโฟลิโอนี้คือพื้นที่ที่ผมใช้บันทึกโปรเจกต์ที่สร้าง ปัญหาที่แก้ และสิ่งที่ได้เรียนรู้ตลอดเส้นทาง",
    profileFacts: [
      { label: "การศึกษา", value: "วิศวกรรมคอมพิวเตอร์ · มหาวิทยาลัยศรีนครินทรวิโรฒ" },
      { label: "ความสนใจ", value: "การพัฒนาซอฟต์แวร์ · เทคโนโลยี Interactive · UX/UI" },
      { label: "กำลังศึกษา", value: "ระบบ Backend · Applied AI · วิศวกรรมซอฟต์แวร์" },
    ],
    nextPhoto: "ภาพถัดไป",
    momentAlt: "ภาพถ่ายส่วนตัวของธีรวัฒน์",
    workIndex: "02 / คลังผลงาน",
    workTitle: "สิ่งที่ผมเคยสร้าง",
    workIntro: "ผลงานจากการเรียน โปรเจกต์ส่วนตัว และการแข่งขัน ครอบคลุมด้านสุขภาพ โรงแรม และเทคโนโลยีโลกเสมือน",
    viewProject: "ดูรายละเอียด",
    viewCase: "ดูรายละเอียดโปรเจกต์",
    statsLabel: "ภาพรวมผลงาน",
    stats: [
      { value: 6, label: "บันทึกโปรเจกต์", note: "ผลงานด้านเดสก์ท็อป เว็บ โมบาย และเทคโนโลยี Interactive ที่รวบรวมไว้", symbol: "PR" },
      { value: 1, label: "รางวัลการแข่งขัน", note: "รางวัลอันดับ 3 จากการแข่งขัน SWU Metaverse", symbol: "AW" },
      { value: 4, label: "กลุ่มเทคโนโลยี", note: "ภาษา เฟรมเวิร์ก เครื่องมือข้อมูล และเทคโนโลยีสร้างสรรค์", symbol: "TS" },
    ] satisfies AchievementStat[],

    portfolioTitle: "ผลงานที่คัดสรร",
    portfolioIntro: "รวมผลงานแอปพลิเคชันและประสบการณ์อินเทอร์แอกทีฟที่พัฒนาผ่านการเขียนโค้ด การออกแบบ และการแก้ปัญหาที่ใช้งานได้จริง",
    tabProjects: "โปรเจกต์",
    tabCertificates: "ใบรับรอง",
    tabStack: "Tech Stack",
    certificatesEmpty: "กำลังเพิ่มใบรับรอง",
    certificatesEmptyDetail: "ภาพใบรับรอง ชื่อองค์กร วันที่ และลิงก์ตรวจสอบที่ยืนยันได้จะถูกเพิ่มไว้ในส่วนนี้",
    skillsIndex: "03 / เครื่องมือ",
    skillsTitle: "เครื่องมือที่ผมใช้เปลี่ยนไอเดียให้ทำงานได้จริง",

  },
};

export default function Home() {
  const { language } = useLanguage();
  const ambientLayerRef = useRef<HTMLDivElement>(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
  const [activePortfolioTab, setActivePortfolioTab] = useState<PortfolioTab>("projects");
  const [activeProfileMoment, setActiveProfileMoment] = useState(0);
  const shouldRotateProfile = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const copy = content[language];
  const localizedProjects = projects[language];
  const selectedProject = localizedProjects.find((project) => project.title === selectedProjectTitle) ?? null;
  const closeSelectedProject = useCallback(() => setSelectedProjectTitle(null), []);
  const nextProfileMoment = profileMoments[(activeProfileMoment + 1) % profileMoments.length];

  useEffect(() => {
    const image = new Image();
    image.src = nextProfileMoment;
  }, [nextProfileMoment]);

  useEffect(() => {
    if (!shouldRotateProfile) return;

    const intervalId = window.setInterval(() => {
      setActiveProfileMoment((current) => (current + 1) % profileMoments.length);
    }, PROFILE_MOMENT_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [shouldRotateProfile]);

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
        element.classList.remove("is-reveal-from-top");
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
    const instantRevealFrameIds = new Set<number>();

    const revealWithoutTransition = (element: HTMLElement) => {
      element.classList.add("is-reveal-instant", "is-visible");
      const frameId = window.requestAnimationFrame(() => {
        element.classList.remove("is-reveal-instant");
        instantRevealFrameIds.delete(frameId);
      });
      instantRevealFrameIds.add(frameId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const isAboveViewportCenter = entry.boundingClientRect.top < window.innerHeight / 2;

          if (entry.isIntersecting) {
            element.classList.toggle("is-reveal-from-top", isAboveViewportCenter);
            if (isAboveViewportCenter) {
              revealWithoutTransition(element);
            } else {
              element.classList.add("is-visible");
            }
          } else {
            element.classList.toggle("is-reveal-from-top", isAboveViewportCenter);
            element.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      instantRevealFrameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
      revealElements.forEach((element) => element.classList.remove("is-reveal-instant"));
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

      const motionScale = window.innerWidth <= 640 ? 0.65 : 1.3;
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
    <main id="main-content" className="Home relative isolate overflow-x-clip bg-canvas-deep">
      <div className="Home-ambient fixed inset-0 z-0 overflow-hidden pointer-events-none" ref={ambientLayerRef} aria-hidden="true">
        <span className="Home-ambient-orb Home-ambient-orb-blue" />
        <span className="Home-ambient-orb Home-ambient-orb-cyan" />
        <span className="Home-ambient-orb Home-ambient-orb-indigo" />
      </div>
      <section className="Hero relative z-10 grid min-h-[calc(100dvh-73px)] items-center overflow-hidden px-6 pb-28 pt-[clamp(4rem,7vh,6rem)] max-[900px]:min-h-0 max-[900px]:pt-28 max-sm:px-4 max-sm:pb-22 max-sm:pt-20" id="home">
        <span className="hidden" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-[95rem] grid-cols-[minmax(0,.86fr)_minmax(34rem,1.14fr)] items-center gap-[clamp(2rem,4vw,4.5rem)] max-[1100px]:grid-cols-[minmax(0,.9fr)_minmax(27rem,1.1fr)] max-[900px]:grid-cols-1 max-[900px]:gap-14">
          <div className="Hero-copy relative z-10 min-w-0 max-[900px]:max-w-176">
            <p className="Hero-status inline-flex min-h-9 w-fit items-center gap-2.5 rounded-full border border-[#47b4ff]/30 bg-[#07182c]/65 px-3.5 py-2 font-mono text-[.68rem] font-semibold text-[#bde1ff] backdrop-blur-xl max-sm:text-[.62rem] [&>span]:size-2 [&>span]:rounded-full [&>span]:bg-[#38e6b2]"><span aria-hidden="true" /> {copy.available}</p>
            <p className="Hero-kicker mt-8 font-mono text-[.68rem] font-semibold uppercase leading-normal tracking-[.18em] text-[#71b8f8] max-sm:mt-7 max-sm:text-[.6rem]">{copy.heroKicker}</p>
            <h1 className="my-5 grid font-heading text-[clamp(3.05rem,4.55vw,4.7rem)] font-semibold leading-[.96] tracking-[-.068em] max-[900px]:text-[clamp(3.2rem,8vw,5rem)] max-sm:text-[clamp(2.5rem,12vw,3.35rem)] [&>span]:block [&>span]:w-fit max-sm:[&>span]:whitespace-normal">
              {copy.heroTitleLines.map((line, index) => (
                <span
                  className={language === "en" ? (index === 1 ? "is-about-accent hero-heading-accent" : undefined) : (index > 0 ? "is-accent hero-heading-accent-soft" : undefined)}
                  key={line}
                >
                  {line}
                </span>
              ))}
            </h1>
            <p className="Hero-intro max-w-152 text-[clamp(.94rem,1.15vw,1.04rem)] leading-[1.8] text-[#9eb0c6] text-pretty max-sm:[overflow-wrap:anywhere] [&>strong]:font-bold [&>strong]:text-ink">{copy.heroIntroStart} <strong>{copy.profileName}</strong>, {copy.heroIntroEnd}</p>
            <div className="Hero-actions mt-8 flex items-center gap-3 max-sm:flex-col max-sm:items-stretch">
              <a href="#work" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg border border-transparent bg-[linear-gradient(125deg,#1c7ef2,#2562dc)] px-5 py-3 font-semibold text-white shadow-[0_1rem_2.8rem_rgba(25,112,235,.23)] transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-[#8fcfff]/60 active:scale-[.975]">{copy.explore}<span aria-hidden="true">↗</span></a>
              <a href="#contact" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg border border-[#a6ccf0]/20 bg-[#081526]/65 px-5 py-3 font-semibold text-ink transition-[transform,border-color,background] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-accent/10 [&_svg]:size-4 [&_svg]:fill-none [&_svg]:stroke-current">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6" /></svg>
                {copy.contactMe}
              </a>
            </div>
            <div className="Hero-tech mt-7 flex flex-wrap gap-x-4 gap-y-3 font-mono text-[.65rem] font-medium text-[#6f849e] [&>span]:inline-flex [&>span]:items-center [&>span]:gap-4" role="list" aria-label={language === "th" ? "เทคโนโลยีหลัก" : "Core technologies"}>
              {copy.heroSkills.map((skill) => <span role="listitem" key={skill}>{skill}</span>)}
            </div>
          </div>
          <figure className="Hero-code-visual relative isolate m-0 grid min-h-136 min-w-0 place-items-center max-[900px]:mx-auto max-[900px]:w-[min(100%,43rem)] max-sm:min-h-100" aria-label={copy.heroCodeAria}>
            <span className="Hero-code-orbit pointer-events-none absolute z-0 aspect-square w-[min(84%,40rem)] rounded-full border border-[#3d8ae5]/15 before:absolute before:inset-[12%] before:rounded-full before:border before:border-[#3d8ae5]/10" aria-hidden="true" />
            <div className="Hero-code-entry relative z-10 grid w-[min(100%,42.5rem)] place-items-center isolate max-sm:w-full">
              <div className="Hero-code-float relative w-full [perspective:820px] [perspective-origin:100%_50%] [transform-style:preserve-3d]">
                <div className="Hero-code-window relative z-10 grid min-h-102 w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-2xl border border-[#89bbeb]/30 bg-[#030c19] shadow-[-34px_38px_86px_rgba(0,0,0,.5)] [transform:rotateY(-9deg)_translateZ(0)] [transform-origin:right_center] max-[900px]:[transform:rotateY(-2deg)_translateZ(0)] max-sm:min-h-84">
                  <div className="relative flex min-h-13 items-center gap-2 border-b border-[#90bce8]/15 bg-[#081425]/55 px-5 [&>span]:size-2 [&>span]:rounded-full [&>strong]:absolute [&>strong]:left-1/2 [&>strong]:-translate-x-1/2 [&>strong]:font-mono [&>strong]:text-[.62rem] [&>strong]:text-[#62768f]" aria-hidden="true">
                    <span className="is-red bg-[#ff7180]" /><span className="is-yellow bg-[#ffca66]" /><span className="is-green bg-[#43d6aa]" />
                    <strong>portfolio.tsx</strong>
                  </div>
                  <ol className="Hero-code-lines m-0 grid list-none content-center gap-3 overflow-hidden px-5 py-7 pl-16 text-[#556b84] [counter-reset:code-line] max-sm:gap-2 max-sm:px-3 max-sm:py-5 max-sm:pl-14">
                    <li><code><span className="text-[#79aaff]">const</span> developer = &#123;</code></li>
                    <li><code>name: <span className="text-[#63d9d0]">&quot;Thirawat Duangta&quot;</span>,</code></li>
                    <li><code>focus: <span className="text-[#63d9d0]">&quot;Software Developer&quot;</span>,</code></li>
                    <li className="is-array-line"><code>works: [<span className="text-[#63d9d0]">&quot;Web&quot;</span>, <span className="text-[#63d9d0]">&quot;Mobile&quot;</span>, <span className="text-[#63d9d0]">&quot;Backend&quot;</span>, <span className="text-[#63d9d0]">&quot;Interactive 3D&quot;</span>],</code></li>
                    <li><code>approach: <span className="text-[#63d9d0]">&quot;Learn by building&quot;</span>,</code></li>
                    <li><code>status: <span className="text-[#63d9d0]">&quot;Creating and exploring&quot;</span></code></li>
                    <li><code>&#125;;</code></li>
                    <li><code><span className="text-[#79aaff]">export default</span> developer;</code></li>
                  </ol>
                  <div className="flex min-h-11 items-center justify-between border-t border-[#90bce8]/15 bg-[#05101e]/35 px-5 font-mono text-[.56rem] tracking-[.12em] text-[#445b73] max-sm:justify-end max-sm:[&>span:first-child]:hidden" aria-hidden="true"><span>BUILD · LEARN · ITERATE</span><span>UTF-8</span></div>
                </div>
              </div>
              <div className="Hero-callout Hero-callout-focus absolute right-0 top-0 z-10">
                <div className="Hero-callout-surface flex min-w-34 items-center gap-3 rounded-xl border border-[#7ebeff]/30 bg-[#071527]/90 px-3.5 py-3 shadow-[0_1.5rem_3.8rem_rgba(0,7,19,.52)] [&>span:last-child]:grid [&>span:last-child]:gap-1 [&_small]:text-[.62rem] [&_small]:text-[#a7bad0] [&_strong]:whitespace-nowrap [&_strong]:text-[.8rem]">
                  <span className="grid size-9 place-items-center rounded-lg border border-[#4e9bf0]/25 bg-[#205fbf]/20 font-mono text-[.68rem] text-[#71b8ff]" aria-hidden="true">&lt;/&gt;</span>
                  <span><small>{copy.heroFocusLabel}</small><strong>{copy.heroFocusValue}</strong></span>
                </div>
              </div>
              <div className="Hero-callout Hero-callout-status absolute bottom-0 left-0 z-10">
                <div className="Hero-callout-surface flex min-w-34 items-center gap-3 rounded-xl border border-[#7ebeff]/30 bg-[#071527]/90 px-3.5 py-3 shadow-[0_1.5rem_3.8rem_rgba(0,7,19,.52)] [&>span:last-child]:grid [&>span:last-child]:gap-1 [&_small]:text-[.62rem] [&_small]:text-[#a7bad0] [&_strong]:whitespace-nowrap [&_strong]:text-[.8rem]">
                  <span className="Hero-callout-dot size-2 rounded-full bg-[#45c8ff]" aria-hidden="true" />
                  <span><small>{copy.heroProjectLabel}</small><strong>{copy.heroProjectValue}</strong></span>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className="Intro site-container section-shell relative z-10" id="about">
        <div className="Section-heading-centered mx-auto mb-[clamp(3.5rem,6vw,5.5rem)] grid max-w-3xl justify-items-center text-center [&>h2]:text-[clamp(2.9rem,4.5vw,4.5rem)] [&>h2]:font-semibold [&>h2]:leading-[.94] [&>h2]:tracking-[-.065em] [&>p]:mt-5 [&>p]:max-w-xl [&>p]:leading-[1.75] [&>p]:text-ink-muted max-sm:[&>h2]:text-[clamp(2.55rem,12vw,3.7rem)]" data-reveal>
          <h2 className="title-gradient">{copy.profileTitle}</h2>
          <p>{copy.profileSubtitle}</p>
        </div>
        <div className="grid grid-cols-[minmax(0,1.12fr)_minmax(20rem,.88fr)] items-center gap-[clamp(4rem,8vw,9rem)] max-[900px]:grid-cols-1 max-[900px]:gap-14">
          <div className="Intro-copy grid w-[min(100%,43rem)] gap-5 text-[clamp(1.02rem,1.15vw,1.08rem)] font-medium leading-[1.85] text-[#b8c9dc] max-[900px]:mx-auto [&>h3]:mb-2 [&>h3]:grid [&>h3]:gap-1 [&>h3>span]:font-mono [&>h3>span]:text-[.82rem] [&>h3>span]:uppercase [&>h3>span]:tracking-[.12em] [&>h3>span]:text-[#8bc8ff] [&>h3>strong]:text-[clamp(2.5rem,5vw,4.8rem)] [&>h3>strong]:leading-none [&>h3>strong]:tracking-[-.065em] [&>h3>strong]:text-ink" data-reveal>
            <h3><span>{copy.profileGreeting}</span><strong>{copy.profileName}</strong></h3>
            <p>{copy.profileOne}</p>
            <p>{copy.profileTwo}</p>
            <p>{copy.profileThree}</p>
            <dl className="grid gap-3 [&>div]:grid [&>div]:grid-cols-[minmax(6.5rem,.32fr)_1fr] [&>div]:gap-4 [&>div]:border-t [&>div]:border-line [&>div]:pt-3 max-sm:[&>div]:grid-cols-1 max-sm:[&>div]:gap-1 [&_dt]:font-mono [&_dt]:text-xs [&_dt]:uppercase [&_dt]:text-[#8bc8ff] [&_dd]:m-0 [&_dd]:text-ink">
              {copy.profileFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <blockquote className="intro-quote relative my-1 overflow-hidden rounded-xl border border-line bg-panel/70 py-5 pl-10 pr-5 text-base italic text-[#dbe7f3]">“{copy.profileQuote}”</blockquote>
            <div className="mt-1 flex items-center gap-6 pt-3 max-sm:flex-col max-sm:items-start">
              <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg border border-transparent bg-[linear-gradient(125deg,#1c7ef2,#2562dc)] px-5 py-3 font-semibold text-white shadow-[0_1rem_2.8rem_rgba(25,112,235,.23)] transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-[#8fcfff]/60 active:scale-[.975]">{copy.download}</a>
              <a href="#work" className="inline-flex w-fit cursor-pointer items-center gap-2 border-0 border-b border-current bg-transparent py-1 font-semibold text-ink transition-colors duration-200 hover:text-accent">{copy.explore} <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="order-none grid justify-items-end max-[900px]:-order-1 max-[900px]:justify-items-center" data-reveal>
            <div className="Intro-image-float grid">
              <div className="intro-image-frame relative isolate aspect-square w-[min(100%,25rem)] rounded-full border border-[#77b1ee]/35 bg-[#051120]/95 p-2 shadow-[0_2.4rem_6rem_rgba(0,7,20,.52)] transition-transform duration-700 hover:-translate-y-1 hover:scale-[1.015] max-sm:w-[min(82vw,20rem)] [&>img]:h-full [&>img]:w-full [&>img]:rounded-full [&>img]:object-cover [&>img]:object-[center_24%]">
                <img
                  key={profileMoments[activeProfileMoment]}
                  src={profileMoments[activeProfileMoment]}
                  alt={copy.momentAlt}
                  loading="lazy"
                />
                <div className="absolute bottom-7 right-4 z-10 flex flex-col items-end gap-3 [&>span]:rounded-md [&>span]:border [&>span]:border-accent/35 [&>span]:bg-[#030c19]/85 [&>span]:px-3 [&>span]:py-2.5 [&>span]:font-mono [&>span]:text-[.62rem] [&>span]:text-accent">
                  <button
                    className="w-[clamp(3.5rem,18vw,4.5rem)] rotate-3 cursor-pointer overflow-hidden rounded-xl border border-[#7ec4ff]/60 bg-[#030c19]/90 p-1 [&>img]:aspect-square [&>img]:h-full [&>img]:w-full [&>img]:rounded-lg [&>img]:object-cover"
                    type="button"
                    aria-label={copy.nextPhoto}
                    onClick={() => setActiveProfileMoment((current) => (current + 1) % profileMoments.length)}
                  >
                    <img key={nextProfileMoment} src={nextProfileMoment} alt="" />
                  </button>
                  <span aria-hidden="true">THIRAWAT / 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AchievementStats stats={copy.stats} ariaLabel={copy.statsLabel} />
      </section>

      <section className="Portfolio site-container section-shell relative z-10" id="work">
        <div className="Section-heading-centered mx-auto mb-[clamp(3.5rem,6vw,5.5rem)] grid max-w-3xl justify-items-center text-center [&>h2]:text-[clamp(2.9rem,4.5vw,4.5rem)] [&>h2]:font-semibold [&>h2]:leading-[.94] [&>h2]:tracking-[-.065em] [&>p]:mt-5 [&>p]:max-w-xl [&>p]:leading-[1.75] [&>p]:text-ink-muted max-sm:[&>h2]:text-[clamp(2.55rem,12vw,3.7rem)]" data-reveal>

          <h2 className="title-gradient">{copy.portfolioTitle}</h2>
          <p>{copy.portfolioIntro}</p>
        </div>
        <div className="Portfolio-tabs mx-auto mb-14 grid w-fit max-w-full grid-cols-3 rounded-xl border border-line-strong bg-[#040f1d]/80 p-1 max-sm:w-full" role="tablist" aria-label={copy.portfolioTitle} data-reveal>
          {portfolioTabs.map((tab) => {
            const label = tab === "projects"
              ? copy.tabProjects
              : tab === "certificates"
                ? copy.tabCertificates
                : copy.tabStack;
            return (
              <button
                id={`portfolio-tab-${tab}`}
                key={tab}
                className={`flex min-h-13 min-w-38 cursor-pointer items-center justify-center rounded-lg border-0 px-4 py-3 transition-[color,background,transform] duration-300 active:scale-[.985] max-sm:min-w-0 max-sm:px-2 ${activePortfolioTab === tab ? "bg-[linear-gradient(135deg,#2b9aff,#1e6ed9)] text-[#06111e] shadow-[0_.8rem_2rem_rgba(23,108,210,.2)]" : "bg-transparent text-ink-muted hover:text-ink"}`}
                type="button"
                role="tab"
                aria-selected={activePortfolioTab === tab}
                aria-controls={`portfolio-panel-${tab}`}
                tabIndex={activePortfolioTab === tab ? 0 : -1}
                onClick={() => setActivePortfolioTab(tab)}
                onKeyDown={(event) => changePortfolioTabWithKeyboard(event, tab)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="min-h-108">
          {activePortfolioTab === "projects" && (
            <div className="Portfolio-panel grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-sm:grid-cols-1" id="portfolio-panel-projects" role="tabpanel" aria-labelledby="portfolio-tab-projects" key="projects">
              {localizedProjects.map((project) => (
                <article key={project.title} className="Project-card group flex min-w-0 flex-col rounded-panel border border-[#4e8ecd]/20 bg-canvas-deep/40 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[#459dee]/40" data-reveal>
                  <button className="group/visual relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-t-panel border-0 bg-panel p-0 [&_.project-cover-title]:text-[clamp(2rem,3.2vw,3.5rem)]" onClick={() => setSelectedProjectTitle(project.title)} aria-label={`${copy.viewProject}: ${project.title}`}>
                    <ProjectCover title={project.title} subtitle={project.subtitle} code={project.coverCode} number={project.coverNumber} imageUrl={project.coverImage} />
                    <span className="absolute right-6 top-6 z-10 grid size-12 place-items-center rounded-full bg-accent text-[#06111e] transition-transform group-hover/visual:rotate-45" aria-hidden="true">↗</span>
                  </button>
                  <div className="flex flex-1 flex-col items-start rounded-b-panel bg-[#071426]/80 p-6 [&>h3]:my-4 [&>h3]:text-[clamp(1.65rem,2.5vw,2.35rem)] [&>h3]:leading-none [&>h3]:tracking-[-.05em] [&>p]:line-clamp-3 [&>p]:text-sm [&>p]:text-[#7f95ab]">
                    <span className="font-mono text-xs uppercase tracking-[.1em] text-[#238ff2]">{project.subtitle}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="my-5 flex flex-wrap gap-2 [&>span]:rounded [&>span]:border [&>span]:border-line [&>span]:px-2.5 [&>span]:py-1.5 [&>span]:font-mono [&>span]:text-[.7rem] [&>span]:text-[#7f95ab]">{project.techStack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
                    <button className="mt-auto inline-flex w-fit cursor-pointer items-center gap-2 border-0 border-b border-current bg-transparent py-1 font-semibold text-ink transition-colors duration-200 hover:text-accent" onClick={() => setSelectedProjectTitle(project.title)}>{copy.viewCase} <span aria-hidden="true">→</span></button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activePortfolioTab === "certificates" && (
            <div className="Portfolio-panel grid min-h-108 place-items-center content-center rounded-panel border border-dashed border-accent/30 bg-[#040f1d]/60 px-4 py-16 text-center [&>h3]:text-[clamp(2rem,4vw,3.5rem)] [&>h3]:leading-none [&>p]:mt-4 [&>p]:text-ink-muted" id="portfolio-panel-certificates" role="tabpanel" aria-labelledby="portfolio-tab-certificates" key="certificates">
              <h3>{copy.certificatesEmpty}</h3>
              <p>{copy.certificatesEmptyDetail}</p>
            </div>
          )}

          {activePortfolioTab === "stack" && (
            <div className="Portfolio-panel grid gap-14" id="portfolio-panel-stack" role="tabpanel" aria-labelledby="portfolio-tab-stack" key="stack">
              {skillGroups[language].map((group) => (
                <section className="grid grid-cols-[minmax(10rem,14rem)_1fr] gap-8 border-t border-line-strong pt-6 max-[900px]:grid-cols-1" key={group.title}>
                  <div className="flex items-start [&>h3]:font-semibold"><h3>{group.title}</h3></div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(9.75rem,1fr))] gap-3 max-[420px]:grid-cols-1">
                    {group.items.map((item) => (
                      <article className="group/tech relative grid min-h-30 rounded-xl border border-line bg-panel/60 p-4 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-line-strong [&>span]:grid [&>span]:size-10 [&>span]:place-items-center [&>span]:rounded-lg [&>span]:border [&>span]:border-accent/40 [&>span>img]:size-6 [&>strong]:mt-4 [&>strong]:self-end [&>small]:text-ink-muted" key={item}>
                        <span aria-hidden="true"><img src={getTechLogo(item)} alt="" loading="lazy" /></span>
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

      <ConnectSection language={language} />

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeSelectedProject} />}
    </main>
  );
}
