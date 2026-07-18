import { useEffect, useState } from "react";
import { useLanguage } from "../language";
import ProjectModal, { type Project } from "../components/ProjectModal";
import profilePortrait from "../assets/thirawat-portrait.jpg";
import "../styles/Home.css";

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
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85",
      description: "An Android application that presents sugar-content information in fruit, helping people with diabetes and anyone who wants to manage their sugar intake.",
      techStack: ["Java", "XML", "Android Studio", "UX/UI"],
      features: ["Designed and implemented the user experience and interface", "Developed the application across the full stack", "Focused the product on clear, accessible nutrition information"],
      apkUrl: "/downloads/sugar-fruits.apk",
    },
    {
      title: "BrainFit",
      subtitle: "Mobile application",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=85",
      description: "A mobile application created to help reduce the risk of Alzheimer's disease through accessible cognitive activities and a simple mobile experience.",
      techStack: ["React Native", "JSX", "Google Sheets API", "UX/UI"],
      features: ["Developed the application with React Native", "Built the backend and supported frontend layout implementation", "Designed the data structure and integrated Google Sheets API"],
    },
    {
      title: "Grande Galaxy Hotel",
      subtitle: "Full-stack web application",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      description: "A complete hotel booking experience covering room search, reservations, online payments, room availability and an operational management dashboard.",
      techStack: ["Full-stack", "MariaDB", "Database design", "UX/UI"],
      features: ["Contributed to the UX/UI design", "Developed the complete full-stack application", "Designed and implemented the MariaDB database schema"],
    },
    {
      title: "SWU Metaverse",
      subtitle: "Competition project · 3rd place",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1200&q=85",
      description: "A virtual Srinakharinwirot University environment developed for the SWU Metaverse Competition, earning 3rd place and an invitation to join Metaverse training workshops.",
      techStack: ["Unity", "C#", "Blender", "3D optimisation"],
      features: ["Developed the player system in Unity with C#", "Modelled university buildings in Blender", "Imported and optimised 3D assets for the Metaverse environment"],
    },
  ],
  th: [
    {
      title: "SugarFulit",
      subtitle: "แอปพลิเคชัน Android",
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85",
      description: "แอปพลิเคชันที่ให้ข้อมูลปริมาณน้ำตาลในผลไม้ เพื่อช่วยผู้ป่วยเบาหวานและผู้ที่ต้องการควบคุมปริมาณน้ำตาลในแต่ละวัน",
      techStack: ["Java", "XML", "Android Studio", "UX/UI"],
      features: ["ออกแบบและพัฒนา UX/UI", "รับผิดชอบการพัฒนาแอปพลิเคชันแบบ Full-stack", "ออกแบบการนำเสนอข้อมูลโภชนาการให้ชัดเจนและเข้าถึงง่าย"],
      apkUrl: "/downloads/sugar-fruits.apk",
    },
    {
      title: "BrainFit",
      subtitle: "โมบายแอปพลิเคชัน",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=85",
      description: "แอปพลิเคชันมือถือที่พัฒนาขึ้นเพื่อช่วยลดความเสี่ยงของโรคอัลไซเมอร์ ผ่านกิจกรรมฝึกสมองที่เข้าถึงง่ายและประสบการณ์ใช้งานที่ไม่ซับซ้อน",
      techStack: ["React Native", "JSX", "Google Sheets API", "UX/UI"],
      features: ["พัฒนาแอปพลิเคชันด้วย React Native", "พัฒนาระบบ Backend และสนับสนุนการวาง Layout ฝั่ง Frontend", "ออกแบบโครงสร้างข้อมูลและเชื่อมต่อ Google Sheets API"],
    },
    {
      title: "Grande Galaxy Hotel",
      subtitle: "เว็บแอปพลิเคชัน Full-stack",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      description: "ระบบจองโรงแรมที่ครอบคลุมการค้นหาห้อง การจอง ชำระเงิน ตรวจสอบห้องว่าง และแดชบอร์ดสำหรับบริหารจัดการโรงแรม",
      techStack: ["Full-stack", "MariaDB", "Database design", "UX/UI"],
      features: ["มีส่วนร่วมในการออกแบบ UX/UI", "รับผิดชอบการพัฒนาเว็บแบบ Full-stack ทั้งระบบ", "ออกแบบและพัฒนาโครงสร้างฐานข้อมูล MariaDB"],
    },
    {
      title: "SWU Metaverse",
      subtitle: "ผลงานประกวด · รางวัลอันดับ 3",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1200&q=85",
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
    download: "Download CV",
    location: "Based in Thailand",
    focus: "Frontend · Backend · Mobile",
    status: "Learning, building, documenting",
    profileIndex: "01 / Profile",
    profileTitle: "This is where I keep the story behind what I make.",
    profileOne: "I study Computer Engineering at Srinakharinwirot University and spend my time exploring how software can make everyday ideas useful and tangible.",
    profileTwo: "My work spans web, mobile, databases and interactive 3D. I use this space to document finished projects, experiments, lessons and the direction I’m growing toward.",
    workIndex: "02 / Archive",
    workTitle: "Selected things I’ve made.",
    workIntro: "Coursework, independent builds and competition work across health, hospitality and immersive technology.",
    viewProject: "View project details",
    viewCase: "View case details",
    skillsIndex: "03 / Toolkit",
    skillsTitle: "Tools I use to turn ideas into working things.",
    experienceIndex: "04 / Journey",
    experience: [
      { period: "2025 — Present", title: "FiveM server development", detail: "Developing and maintaining a custom server across Lua scripting, web-based interfaces, debugging and performance optimisation." },
      { period: "2024 — Present", title: "Computer Engineering, Srinakharinwirot University", detail: "Second-year student building a strong foundation across frontend, backend and database development." },
    ],
    nowIndex: "05 / Now",
    nowTitle: "What I’m exploring right now.",
    nowIntro: "A living snapshot of the subjects and practices currently holding my attention.",
    nowItems: [
      { label: "Building", title: "Personal software projects", detail: "Turning small, practical ideas into complete web and mobile experiences." },
      { label: "Learning", title: "TypeScript & backend architecture", detail: "Improving how I structure reliable applications and connect their moving parts." },
      { label: "Exploring", title: "Interactive 3D experiences", detail: "Combining Unity, Blender and code to create spaces people can move through." },
    ],
    contactIndex: "06 / Contact",
    contactTitle: "Let’s connect.",
    contactIntro: "Interested in my work, want to exchange ideas, or build something together? Feel free to reach out.",
    phoneLabel: "Phone",
    githubLabel: "GitHub",
    locationLabel: "Location",
    timezone: "Thailand · ICT (UTC+7)",
  },
  th: {
    available: "คลังข้อมูลส่วนตัว · 2026",
    heroTitle: "สิ่งที่ผมสร้าง เรียนรู้ และให้ความสนใจ",
    heroIntroStart: "ผมคือ",
    heroIntroEnd: "นักศึกษาวิศวกรรมคอมพิวเตอร์ที่บันทึกผลงานด้านซอฟต์แวร์ โมบาย โลกเสมือน และสิ่งใหม่ที่ได้เรียนรู้ระหว่างทาง",
    explore: "สำรวจคลังผลงาน",
    download: "ดาวน์โหลด CV",
    location: "อยู่ในประเทศไทย",
    focus: "Frontend · Backend · Mobile",
    status: "กำลังเรียนรู้ สร้าง และบันทึก",
    profileIndex: "01 / เกี่ยวกับฉัน",
    profileTitle: "พื้นที่รวบรวมเรื่องราวเบื้องหลังสิ่งที่ผมสร้าง",
    profileOne: "ผมศึกษาวิศวกรรมคอมพิวเตอร์ที่มหาวิทยาลัยศรีนครินทรวิโรฒ และสนใจการเปลี่ยนไอเดียในชีวิตประจำวันให้เป็นซอฟต์แวร์ที่ใช้งานได้จริง",
    profileTwo: "ผลงานของผมครอบคลุมเว็บ โมบาย ฐานข้อมูล และงาน 3D แบบ Interactive พื้นที่นี้ใช้บันทึกโปรเจกต์ การทดลอง บทเรียน และทิศทางที่กำลังพัฒนาตัวเอง",
    workIndex: "02 / คลังผลงาน",
    workTitle: "สิ่งที่ผมเคยสร้าง",
    workIntro: "ผลงานจากการเรียน โปรเจกต์ส่วนตัว และการแข่งขัน ครอบคลุมด้านสุขภาพ โรงแรม และเทคโนโลยีโลกเสมือน",
    viewProject: "ดูรายละเอียด",
    viewCase: "ดูรายละเอียดโปรเจกต์",
    skillsIndex: "03 / เครื่องมือ",
    skillsTitle: "เครื่องมือที่ผมใช้เปลี่ยนไอเดียให้ทำงานได้จริง",
    experienceIndex: "04 / เส้นทาง",
    experience: [
      { period: "2025 — ปัจจุบัน", title: "การพัฒนาเซิร์ฟเวอร์ FiveM", detail: "พัฒนาและดูแลเซิร์ฟเวอร์ ตั้งแต่เขียนสคริปต์ Lua สร้าง Web UI แก้ไขข้อผิดพลาด และปรับปรุงประสิทธิภาพระบบ" },
      { period: "2024 — ปัจจุบัน", title: "วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยศรีนครินทรวิโรฒ", detail: "นักศึกษาชั้นปีที่ 2 ที่กำลังสร้างพื้นฐานด้าน Frontend, Backend และการพัฒนาฐานข้อมูล" },
    ],
    nowIndex: "05 / ช่วงนี้",
    nowTitle: "สิ่งที่ผมกำลังสำรวจ",
    nowIntro: "ภาพรวมของเรื่องที่ผมกำลังให้ความสนใจ เรียนรู้ และลงมือทำในช่วงนี้",
    nowItems: [
      { label: "กำลังสร้าง", title: "โปรเจกต์ซอฟต์แวร์ส่วนตัว", detail: "นำไอเดียเล็ก ๆ ที่ใช้งานได้จริงมาพัฒนาเป็นประสบการณ์บนเว็บและโมบายให้สมบูรณ์" },
      { label: "กำลังเรียนรู้", title: "TypeScript และสถาปัตยกรรม Backend", detail: "พัฒนาวิธีออกแบบแอปพลิเคชันให้ดูแลได้ง่าย เชื่อถือได้ และเชื่อมต่อแต่ละส่วนอย่างเป็นระบบ" },
      { label: "กำลังสำรวจ", title: "ประสบการณ์ Interactive 3D", detail: "ผสมผสาน Unity, Blender และการเขียนโค้ดเพื่อสร้างพื้นที่ที่ผู้ใช้มีส่วนร่วมได้" },
    ],
    contactIndex: "06 / ติดต่อ",
    contactTitle: "มาพูดคุยกัน",
    contactIntro: "สนใจผลงาน อยากแลกเปลี่ยนไอเดีย หรือสร้างอะไรบางอย่างร่วมกัน ติดต่อผมได้เสมอ",
    phoneLabel: "โทรศัพท์",
    githubLabel: "GitHub",
    locationLabel: "สถานที่",
    timezone: "ประเทศไทย · ICT (UTC+7)",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
  const copy = content[language];
  const localizedProjects = projects[language];
  const selectedProject = localizedProjects.find((project) => project.title === selectedProjectTitle) ?? null;

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
            <p className="Hero-intro">{copy.heroIntroStart} <strong>Thirawat Duangta</strong>, {copy.heroIntroEnd}</p>
            <div className="Hero-actions">
              <a href="#projects" className="Button Button-primary">{copy.explore}</a>
              <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="Text-link">{copy.download} <span aria-hidden="true">↘</span></a>
            </div>
          </div>
          <aside className="Hero-profile" aria-label="Profile summary">
            <div className="Hero-portrait">
              <img
                src={profilePortrait}
                alt={language === "th" ? "ภาพถ่ายของธีรวัฒน์ ดวงตา" : "Portrait of Thirawat Duangta"}
              />
              <span className="Hero-portrait-code" aria-hidden="true">&lt;/&gt;</span>
            </div>
            <div className="Hero-profile-copy"><span>{copy.location}</span><strong>{copy.focus}</strong></div>
            <div className="Hero-availability"><span aria-hidden="true">●</span><strong>{copy.status}</strong></div>
          </aside>
        </div>
      </section>

      <section className="Intro Section" id="about">
        <div className="Section-index">{copy.profileIndex}</div>
        <div className="Intro-grid" data-reveal>
          <h2>{copy.profileTitle}</h2>
          <div className="Intro-copy"><p>{copy.profileOne}</p><p>{copy.profileTwo}</p></div>
        </div>
      </section>

      <section className="Projects Section" id="projects">
        <div className="Section-heading" data-reveal>
          <div><div className="Section-index">{copy.workIndex}</div><h2>{copy.workTitle}</h2></div>
          <p>{copy.workIntro}</p>
        </div>
        <div className="Project-list">
          {localizedProjects.map((project, index) => (
            <article key={project.title} className="Project-card" data-reveal>
              <button className="Project-visual" onClick={() => setSelectedProjectTitle(project.title)} aria-label={`${copy.viewProject}: ${project.title}`}>
                <img src={project.image} alt="" />
                <span className="Project-number">0{index + 1}</span>
                <span className="Project-open" aria-hidden="true">↗</span>
              </button>
              <div className="Project-copy">
                <span className="Project-type">{project.subtitle}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="Project-tags">{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div>
                <button className="Text-link Project-detail" onClick={() => setSelectedProjectTitle(project.title)}>{copy.viewCase} <span aria-hidden="true">→</span></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="Skills Section" id="skills">
        <div className="Section-heading" data-reveal><div><div className="Section-index">{copy.skillsIndex}</div><h2>{copy.skillsTitle}</h2></div></div>
        <div className="Skill-list">
          {skillGroups[language].map((group, index) => (
            <article className="Skill-row" key={group.title} data-reveal><span>0{index + 1}</span><h3>{group.title}</h3><p>{group.items.join(" · ")}</p></article>
          ))}
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
            <div className="Contact-row">
              <span>{copy.locationLabel}</span>
              <strong>{copy.timezone}</strong>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProjectTitle(null)} />}
    </main>
  );
}
