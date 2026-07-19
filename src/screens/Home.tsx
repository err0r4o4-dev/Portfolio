import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "../language";
import ProjectModal, { type Project } from "../components/ProjectModal";
import ProjectCover from "../components/ProjectCover";
import AchievementStats, { type AchievementStat } from "../components/AchievementStats";
import profileMomentOne from "../assets/profile-moment-01.jpg";
import profileMomentTwo from "../assets/profile-moment-02.jpg";
import profileMomentThree from "../assets/profile-moment-03.jpg";
import profileMomentFour from "../assets/profile-moment-04.jpg";
import "../styles/Home.css";

const profileMoments = [profileMomentOne, profileMomentTwo, profileMomentThree, profileMomentFour];
const portfolioTabs = ["projects", "certificates", "stack"] as const;
type PortfolioTab = (typeof portfolioTabs)[number];
const getTechMark = (name: string) => name.split(/[\s/+.]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

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
  ],
};

const content = {
  en: {
    available: "Personal archive · 2026",
    heroTitle: "Things I build, learn, and care about.",
    heroIntroStart: "I’m",
    heroIntroEnd: "a Computer Engineering student documenting my work across software, mobile experiences, interactive worlds, and the ideas I pick up along the way.",
    explore: "Explore the archive",
    contactMe: "Contact me",
    download: "Download CV",
    heroRoles: ["Frontend development", "Backend systems", "Mobile experiences"],
    heroSkills: ["React", "React Native", "Flutter", "Unity"],
    location: "Based in Thailand",
    focus: "Frontend · Backend · Mobile",
    status: "Learning, building, documenting",
    profileIndex: "01 / Profile",
    profileTitle: "This is where I keep the story behind what I make.",
    profileSubtitle: "A closer look at the person, process, and curiosity behind the work.",
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
      { value: 4, label: "Project builds", note: "Completed work across web, mobile, and interactive technology.", symbol: "PR" },
      { value: 1, label: "Competition award", note: "3rd place in the SWU Metaverse Competition.", symbol: "AW" },
      { value: 4, label: "Technology areas", note: "Languages, frameworks, data tools, and creative technology.", symbol: "TS" },
      { value: 2, label: "Current paths", note: "Computer Engineering studies and FiveM server development.", symbol: "NW" },
    ] satisfies AchievementStat[],
    portfolioIndex: "02 / Portfolio showcase",
    portfolioTitle: "Work, credentials, and the tools behind them.",
    portfolioIntro: "Explore selected builds and the technology I use. Certificate records will appear here when they are added.",
    tabProjects: "Projects",
    tabCertificates: "Certificates",
    tabStack: "Tech stack",
    certificatesEmpty: "No certificate records added yet.",
    certificatesEmptyDetail: "This area is ready for verified certificate images, organisations, dates, and links.",
    skillsIndex: "03 / Toolkit",
    skillsTitle: "Tools I use to turn ideas into working things.",
    experienceIndex: "03 / Journey",
    experience: [
      { period: "2025 — Present", title: "FiveM server development", detail: "Developing and maintaining a custom server across Lua scripting, web-based interfaces, debugging and performance optimisation." },
      { period: "2024 — Present", title: "Computer Engineering, Srinakharinwirot University", detail: "Second-year student building a strong foundation across frontend, backend and database development." },
    ],
    nowIndex: "04 / Now",
    nowTitle: "What I’m exploring right now.",
    nowIntro: "A living snapshot of the subjects and practices currently holding my attention.",
    nowItems: [
      { label: "Building", title: "Personal software projects", detail: "Turning small, practical ideas into complete web and mobile experiences." },
      { label: "Learning", title: "TypeScript & backend architecture", detail: "Improving how I structure reliable applications and connect their moving parts." },
      { label: "Exploring", title: "Interactive 3D experiences", detail: "Combining Unity, Blender and code to create spaces people can move through." },
    ],
    contactIndex: "05 / Contact",
    contactTitle: "Let’s connect.",
    contactIntro: "Interested in my work, want to exchange ideas, or build something together? Feel free to reach out.",
    phoneLabel: "Phone",
    githubLabel: "GitHub",
  },
  th: {
    available: "คลังข้อมูลส่วนตัว · 2026",
    heroTitle: "สิ่งที่ผมสร้าง เรียนรู้ และให้ความสนใจ",
    heroIntroStart: "ผมคือ",
    heroIntroEnd: "นักศึกษาวิศวกรรมคอมพิวเตอร์ที่บันทึกผลงานด้านซอฟต์แวร์ โมบาย โลกเสมือน และสิ่งใหม่ที่ได้เรียนรู้ระหว่างทาง",
    explore: "สำรวจคลังผลงาน",
    contactMe: "ติดต่อฉัน",
    download: "ดาวน์โหลด CV",
    heroRoles: ["พัฒนา Frontend", "ออกแบบระบบ Backend", "สร้างประสบการณ์ Mobile"],
    heroSkills: ["React", "React Native", "Flutter", "Unity"],
    location: "อยู่ในประเทศไทย",
    focus: "Frontend · Backend · Mobile",
    status: "กำลังเรียนรู้ สร้าง และบันทึก",
    profileIndex: "01 / เกี่ยวกับฉัน",
    profileTitle: "พื้นที่รวบรวมเรื่องราวเบื้องหลังสิ่งที่ผมสร้าง",
    profileSubtitle: "ทำความรู้จักตัวตน กระบวนการ และความสนใจที่อยู่เบื้องหลังผลงาน",
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
      { value: 4, label: "โปรเจกต์", note: "ผลงานด้านเว็บ โมบาย และเทคโนโลยี Interactive ที่ทำเสร็จแล้ว", symbol: "PR" },
      { value: 1, label: "รางวัลการแข่งขัน", note: "รางวัลอันดับ 3 จากการแข่งขัน SWU Metaverse", symbol: "AW" },
      { value: 4, label: "กลุ่มเทคโนโลยี", note: "ภาษา เฟรมเวิร์ก เครื่องมือข้อมูล และเทคโนโลยีสร้างสรรค์", symbol: "TS" },
      { value: 2, label: "เส้นทางปัจจุบัน", note: "วิศวกรรมคอมพิวเตอร์และการพัฒนาเซิร์ฟเวอร์ FiveM", symbol: "NW" },
    ] satisfies AchievementStat[],
    portfolioIndex: "02 / พอร์ตโฟลิโอ",
    portfolioTitle: "ผลงาน หลักฐาน และเครื่องมือเบื้องหลัง",
    portfolioIntro: "สำรวจโปรเจกต์และเทคโนโลยีที่ผมใช้ ส่วนใบรับรองจะแสดงเมื่อมีการเพิ่มข้อมูลจริง",
    tabProjects: "โปรเจกต์",
    tabCertificates: "ใบรับรอง",
    tabStack: "เทคโนโลยี",
    certificatesEmpty: "ยังไม่ได้เพิ่มข้อมูลใบรับรอง",
    certificatesEmptyDetail: "พื้นที่นี้พร้อมสำหรับภาพใบรับรอง ชื่อองค์กร วันที่ และลิงก์ที่ตรวจสอบได้",
    skillsIndex: "03 / เครื่องมือ",
    skillsTitle: "เครื่องมือที่ผมใช้เปลี่ยนไอเดียให้ทำงานได้จริง",
    experienceIndex: "03 / เส้นทาง",
    experience: [
      { period: "2025 — ปัจจุบัน", title: "การพัฒนาเซิร์ฟเวอร์ FiveM", detail: "พัฒนาและดูแลเซิร์ฟเวอร์ ตั้งแต่เขียนสคริปต์ Lua สร้าง Web UI แก้ไขข้อผิดพลาด และปรับปรุงประสิทธิภาพระบบ" },
      { period: "2024 — ปัจจุบัน", title: "วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยศรีนครินทรวิโรฒ", detail: "นักศึกษาชั้นปีที่ 2 ที่กำลังสร้างพื้นฐานด้าน Frontend, Backend และการพัฒนาฐานข้อมูล" },
    ],
    nowIndex: "04 / ช่วงนี้",
    nowTitle: "สิ่งที่ผมกำลังสำรวจ",
    nowIntro: "ภาพรวมของเรื่องที่ผมกำลังให้ความสนใจ เรียนรู้ และลงมือทำในช่วงนี้",
    nowItems: [
      { label: "กำลังสร้าง", title: "โปรเจกต์ซอฟต์แวร์ส่วนตัว", detail: "นำไอเดียเล็ก ๆ ที่ใช้งานได้จริงมาพัฒนาเป็นประสบการณ์บนเว็บและโมบายให้สมบูรณ์" },
      { label: "กำลังเรียนรู้", title: "TypeScript และสถาปัตยกรรม Backend", detail: "พัฒนาวิธีออกแบบแอปพลิเคชันให้ดูแลได้ง่าย เชื่อถือได้ และเชื่อมต่อแต่ละส่วนอย่างเป็นระบบ" },
      { label: "กำลังสำรวจ", title: "ประสบการณ์ Interactive 3D", detail: "ผสมผสาน Unity, Blender และการเขียนโค้ดเพื่อสร้างพื้นที่ที่ผู้ใช้มีส่วนร่วมได้" },
    ],
    contactIndex: "05 / ติดต่อ",
    contactTitle: "มาพูดคุยกัน",
    contactIntro: "สนใจผลงาน อยากแลกเปลี่ยนไอเดีย หรือสร้างอะไรบางอย่างร่วมกัน ติดต่อผมได้เสมอ",
    phoneLabel: "โทรศัพท์",
    githubLabel: "GitHub",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
  const [profileMomentIndex, setProfileMomentIndex] = useState(0);
  const [isProfileCarouselPaused, setIsProfileCarouselPaused] = useState(false);
  const [activePortfolioTab, setActivePortfolioTab] = useState<PortfolioTab>("projects");
  const [heroRoleIndex, setHeroRoleIndex] = useState(0);
  const copy = content[language];
  const localizedProjects = projects[language];
  const selectedProject = localizedProjects.find((project) => project.title === selectedProjectTitle) ?? null;
  const closeSelectedProject = useCallback(() => setSelectedProjectTitle(null), []);
  const visibleProfileMoments = Array.from(
    { length: 3 },
    (_, offset) => ({
      image: profileMoments[(profileMomentIndex + offset) % profileMoments.length],
      number: ((profileMomentIndex + offset) % profileMoments.length) + 1,
    }),
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setHeroRoleIndex((current) => (current + 1) % copy.heroRoles.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [copy.heroRoles.length, language]);

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
    if (isProfileCarouselPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setProfileMomentIndex((current) => (current + 1) % profileMoments.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isProfileCarouselPaused]);

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
  }, []);

  return (
    <main id="main-content" className="Home">
      <section className="Hero" id="home">
        <div className="Hero-content">
          <div className="Hero-copy">
            <p className="Eyebrow"><span /> {copy.available}</p>
            <h1>{copy.heroTitle}</h1>
            <p className="Hero-role"><span aria-hidden="true">~/focus</span><strong key={`${language}-${heroRoleIndex}`}>{copy.heroRoles[heroRoleIndex]}</strong></p>
            <p className="Hero-intro">{copy.heroIntroStart} <strong>Thirawat Duangta</strong>, {copy.heroIntroEnd}</p>
            <div className="Hero-skill-tags" aria-label={language === "th" ? "เทคโนโลยีที่สนใจ" : "Featured technologies"}>
              {copy.heroSkills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
            <div className="Hero-actions">
              <a href="#portfolio" className="Button Button-primary">{copy.explore}</a>
              <a href="#contact" className="Button Button-secondary">{copy.contactMe}</a>
              <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="Text-link">{copy.download} <span aria-hidden="true">↘</span></a>
            </div>
            <div className="Hero-socials">
              <a href="https://github.com/err0r4o4-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GH <span aria-hidden="true">↗</span></a>
              <a href="mailto:title.thirawat.dev@gmail.com" aria-label="Email">EM <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <aside
            className="Hero-profile"
            aria-label="Profile summary"
            onMouseEnter={() => setIsProfileCarouselPaused(true)}
            onMouseLeave={() => setIsProfileCarouselPaused(false)}
            onFocusCapture={() => setIsProfileCarouselPaused(true)}
            onBlurCapture={() => setIsProfileCarouselPaused(false)}
          >
            <div className="Hero-portrait">
              <button
                className="Hero-photo-stage"
                type="button"
                onClick={() => setProfileMomentIndex((current) => (current + 1) % profileMoments.length)}
                aria-label={copy.nextPhoto}
              >
                <img
                  className="Hero-photo-main"
                  key={`main-${profileMomentIndex}`}
                  src={visibleProfileMoments[0].image}
                  alt={`${copy.momentAlt} ${visibleProfileMoments[0].number}`}
                />
                <span className="Hero-photo-previews" aria-hidden="true">
                  {visibleProfileMoments.slice(1).map((moment) => (
                    <img key={`${profileMomentIndex}-${moment.number}`} src={moment.image} alt="" />
                  ))}
                </span>
                <span className="Hero-photo-count" aria-hidden="true">
                  0{visibleProfileMoments[0].number} / 0{profileMoments.length}
                </span>
                <span className="Hero-photo-next" aria-hidden="true">→</span>
              </button>
              <span className="Hero-portrait-code" aria-hidden="true">&lt;/&gt;</span>
            </div>
            <div className="Hero-profile-copy"><span>{copy.location}</span><strong>{copy.focus}</strong></div>
            <div className="Hero-availability"><span aria-hidden="true">●</span><strong>{copy.status}</strong></div>
          </aside>
        </div>
      </section>

      <section className="Intro Section" id="about">
        <div className="Section-heading-centered" data-reveal>
          <div className="Section-index">{copy.profileIndex}</div>
          <h2>{copy.profileTitle}</h2>
          <p>{copy.profileSubtitle}</p>
        </div>
        <div className="Intro-grid">
          <div className="Intro-visual" data-reveal>
            <div className="Intro-image-frame">
              <img src={profileMomentTwo} alt={copy.momentAlt} loading="lazy" />
              <span aria-hidden="true">THIRAWAT / 2026</span>
            </div>
          </div>
          <div className="Intro-copy" data-reveal>
            <p>{copy.profileOne}</p>
            <p>{copy.profileTwo}</p>
            <div className="Intro-actions">
              <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="Button Button-primary">{copy.download}</a>
              <a href="#portfolio" className="Text-link">{copy.explore} <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <AchievementStats stats={copy.stats} ariaLabel={copy.statsLabel} />
      </section>

      <section className="Portfolio Section" id="portfolio">
        <div className="Section-heading-centered" data-reveal>
          <div className="Section-index">{copy.portfolioIndex}</div>
          <h2>{copy.portfolioTitle}</h2>
          <p>{copy.portfolioIntro}</p>
        </div>
        <div className="Portfolio-tabs" role="tablist" aria-label={copy.portfolioTitle}>
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
                <article key={project.title} className="Project-card">
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

      <section className="Experience Section" id="experience">
        <div className="Section-index">{copy.experienceIndex}</div>
        <div className="Experience-list">
          {copy.experience.map((item) => (
            <article className="Experience-row" key={item.title} data-reveal><span>{item.period}</span><h3>{item.title}</h3><p>{item.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="Now Section" id="now">
        <div className="Section-heading" data-reveal>
          <div><div className="Section-index">{copy.nowIndex}</div><h2>{copy.nowTitle}</h2></div>
          <p>{copy.nowIntro}</p>
        </div>
        <div className="Now-list">
          {copy.nowItems.map((item, index) => (
            <article className="Now-row" key={item.title} data-reveal>
              <span>0{index + 1}</span>
              <div><small>{item.label}</small><h3>{item.title}</h3></div>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="Contact Section" id="contact">
        <div className="Contact-panel" data-reveal>
          <div className="Contact-heading">
            <p className="Section-index">{copy.contactIndex}</p>
            <h2>{copy.contactTitle}</h2>
            <p>{copy.contactIntro}</p>
          </div>
          <div className="Contact-details">
            <a className="Contact-email" href="mailto:title.thirawat.dev@gmail.com">
              <span className="Contact-email-arrow" aria-hidden="true">→</span>
              <strong>title.thirawat.dev@gmail.com</strong>
            </a>
            <div className="Contact-row">
              <span>{copy.phoneLabel}</span>
              <a href="tel:+66615071665">+66 61 507 1665</a>
            </div>
            <div className="Contact-row">
              <span>{copy.githubLabel}</span>
              <a href="https://github.com/err0r4o4-dev" target="_blank" rel="noopener noreferrer">err0r4o4-dev ↗</a>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeSelectedProject} />}
    </main>
  );
}
