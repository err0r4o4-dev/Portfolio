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
import "../styles/Home.css";

const portfolioTabs = ["projects", "certificates", "stack"] as const;
type PortfolioTab = (typeof portfolioTabs)[number];
const profileMoments = [profileMomentTwo, profileMomentThree, profileMomentOne];
const PROFILE_MOMENT_INTERVAL_MS = 5_000;
const getTechMark = (name: string) => {
  const words = name.replace(/[.#/]/g, " ").split(/\s+/).filter(Boolean);
  return words.length > 1
    ? words.map((word) => word[0]).join("").slice(0, 2).toUpperCase()
    : name.slice(0, 2).toUpperCase();
};

const skillGroups = {
  en: [
    { title: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C#", "Lua", "XML"] },
    { title: "Frameworks", items: ["React", "React Native", "Express.js", "PySide6"] },
    { title: "Data & tools", items: ["MariaDB", "MySQL", "GitHub", "Figma"] },
    { title: "Creative tech", items: ["Unity", "Blender"] },
  ],
  th: [
    { title: "ภาษาโปรแกรม", items: ["TypeScript", "JavaScript", "Python", "Java", "C#", "Lua", "XML"] },
    { title: "เฟรมเวิร์ก", items: ["React", "React Native", "Express.js", "PySide6"] },
    { title: "ข้อมูลและเครื่องมือ", items: ["MariaDB", "MySQL", "GitHub", "Figma"] },
    { title: "เทคโนโลยีสร้างสรรค์", items: ["Unity", "Blender"] },
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
    available: "Currently building & learning",
    heroKicker: "Computer Engineering · Software Development",
    heroTitleLines: ["Full Stack", "Developer"],
    heroIntroStart: "I’m",
    heroIntroEnd: "a Computer Engineering student building thoughtful web experiences and reliable systems that solve real problems.",
    explore: "Explore my work",
    contactMe: "Contact me",
    download: "Download CV",
    heroSkills: ["React", "TypeScript", "Java", "MariaDB"],
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
    profileFacts: [
      { label: "Education", value: "Computer Engineering · Srinakharinwirot University" },
      { label: "Focus", value: "Web applications · Backend systems" },
      { label: "Availability", value: "Internships · Selected projects" },
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

    portfolioTitle: "Projects, Certificates & Tech Stack",
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
    available: "กำลังสร้างและเรียนรู้",
    heroKicker: "วิศวกรรมคอมพิวเตอร์ · การพัฒนาซอฟต์แวร์",
    heroTitleLines: ["ผมสร้างผลิตภัณฑ์", "ดิจิทัลที่ใช้งาน", "ได้อย่างลื่นไหล"],
    heroIntroStart: "ผมคือ",
    heroIntroEnd: "นักศึกษาวิศวกรรมคอมพิวเตอร์ที่สร้างประสบการณ์บนเว็บและระบบที่เชื่อถือได้ เพื่อแก้ปัญหาที่เกิดขึ้นจริง",
    explore: "ดูผลงานของฉัน",
    contactMe: "ติดต่อฉัน",
    download: "ดาวน์โหลด CV",
    heroSkills: ["React", "TypeScript", "Java", "MariaDB"],
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
    profileFacts: [
      { label: "การศึกษา", value: "วิศวกรรมคอมพิวเตอร์ · มหาวิทยาลัยศรีนครินทรวิโรฒ" },
      { label: "สิ่งที่โฟกัส", value: "เว็บแอปพลิเคชัน · ระบบ Backend" },
      { label: "โอกาสที่เปิดรับ", value: "ฝึกงาน · โปรเจกต์ที่เหมาะสม" },
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

    portfolioTitle: "ผลงาน ใบรับรอง และ Tech Stack",
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
                <span
                  className={language === "en" ? (index === 1 ? "is-about-accent" : undefined) : (index > 0 ? "is-accent" : undefined)}
                  key={line}
                >
                  {line}
                </span>
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
            <div className="Hero-tech" role="list" aria-label={language === "th" ? "เทคโนโลยีหลัก" : "Core technologies"}>
              {copy.heroSkills.map((skill) => <span role="listitem" key={skill}>{skill}</span>)}
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
            <dl className="Intro-facts">
              {copy.profileFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <blockquote>“{copy.profileQuote}”</blockquote>
            <div className="Intro-actions">
              <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="Button Button-primary">{copy.download}</a>
              <a href="#work" className="Text-link">{copy.explore} <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="Intro-visual" data-reveal>
            <div className="Intro-image-float">
              <div className="Intro-image-frame">
                <img
                  key={profileMoments[activeProfileMoment]}
                  src={profileMoments[activeProfileMoment]}
                  alt={copy.momentAlt}
                  loading="lazy"
                />
                <div className="Intro-image-meta">
                  <button
                    className="Intro-image-next"
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

      <section className="Portfolio Section" id="work">
        <div className="Section-heading-centered" data-reveal>

          <h2>{copy.portfolioTitle}</h2>
          <p>{copy.portfolioIntro}</p>
        </div>
        <div className="Portfolio-tabs" role="tablist" aria-label={copy.portfolioTitle} data-reveal>
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

        <div className="Portfolio-content">
          {activePortfolioTab === "projects" && (
            <div className="Portfolio-panel Project-list" id="portfolio-panel-projects" role="tabpanel" aria-labelledby="portfolio-tab-projects" key="projects">
              {localizedProjects.map((project) => (
                <article key={project.title} className="Project-card" data-reveal>
                  <button className="Project-visual" onClick={() => setSelectedProjectTitle(project.title)} aria-label={`${copy.viewProject}: ${project.title}`}>
                    <ProjectCover title={project.title} subtitle={project.subtitle} code={project.coverCode} number={project.coverNumber} imageUrl={project.coverImage} />
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
