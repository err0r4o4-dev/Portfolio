import { useState } from "react";
import { useLanguage } from "../language";
import ProjectModal, { type Project } from "../components/ProjectModal";
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
    available: "Available for an internship",
    heroTitle: "Building thoughtful software, from interface to infrastructure.",
    heroIntroStart: "I’m",
    heroIntroEnd: "a Computer Engineering student focused on full-stack and mobile development. I turn practical problems into clear, usable products.",
    explore: "Explore my work",
    download: "Download résumé",
    location: "Based in Thailand",
    focus: "Frontend · Backend · Mobile",
    status: "Open to internship opportunities",
    profileIndex: "01 / Profile",
    profileTitle: "I care about how a product works—and how it feels to use.",
    profileOne: "I’m seeking an internship where I can contribute to real software while learning from an experienced team.",
    profileTwo: "My work spans web, mobile, databases and interactive 3D. I enjoy analysing a problem, proposing a direct solution and carrying it through implementation.",
    workIndex: "02 / Selected work",
    workTitle: "Projects with a clear purpose.",
    workIntro: "Coursework and independent builds across health, hospitality and immersive technology.",
    viewProject: "View project details",
    viewCase: "View case details",
    skillsIndex: "03 / Capabilities",
    skillsTitle: "A broad foundation, applied with focus.",
    experienceIndex: "04 / Experience & education",
    experience: [
      { period: "2025 — Present", title: "FiveM server development", detail: "Developing and maintaining a custom server across Lua scripting, web-based interfaces, debugging and performance optimisation." },
      { period: "2024 — Present", title: "Computer Engineering, Srinakharinwirot University", detail: "Second-year student building a strong foundation across frontend, backend and database development." },
    ],
    contactLabel: "Let’s build something useful",
    contactTitle: "Have an internship or project in mind?",
    timezone: "Thailand · ICT (UTC+7)",
  },
  th: {
    available: "พร้อมสำหรับโอกาสฝึกงาน",
    heroTitle: "พัฒนาซอฟต์แวร์ที่ใส่ใจ ตั้งแต่หน้าจอจนถึงระบบเบื้องหลัง",
    heroIntroStart: "ผมคือ",
    heroIntroEnd: "นักศึกษาวิศวกรรมคอมพิวเตอร์ที่สนใจการพัฒนา Full-stack และ Mobile ผมเปลี่ยนปัญหาจริงให้เป็นผลิตภัณฑ์ที่ชัดเจนและใช้งานง่าย",
    explore: "ดูผลงานของฉัน",
    download: "ดาวน์โหลดเรซูเม่",
    location: "อยู่ในประเทศไทย",
    focus: "Frontend · Backend · Mobile",
    status: "กำลังมองหาโอกาสฝึกงาน",
    profileIndex: "01 / เกี่ยวกับฉัน",
    profileTitle: "ผมใส่ใจทั้งการทำงานของผลิตภัณฑ์ และความรู้สึกของผู้ใช้",
    profileOne: "ผมกำลังมองหาโอกาสฝึกงานที่ได้ร่วมพัฒนาซอฟต์แวร์จริง พร้อมเรียนรู้จากทีมที่มีประสบการณ์",
    profileTwo: "ผมมีประสบการณ์ทั้งเว็บ โมบาย ฐานข้อมูล และงาน 3D แบบ Interactive ชอบวิเคราะห์ปัญหา เสนอแนวทางที่ตรงจุด และพัฒนาให้ใช้งานได้จริง",
    workIndex: "02 / ผลงานที่คัดเลือก",
    workTitle: "ทุกโปรเจกต์เริ่มจากเป้าหมายที่ชัดเจน",
    workIntro: "ผลงานจากการเรียนและโปรเจกต์ส่วนตัว ครอบคลุมด้านสุขภาพ โรงแรม และเทคโนโลยีโลกเสมือน",
    viewProject: "ดูรายละเอียด",
    viewCase: "ดูรายละเอียดโปรเจกต์",
    skillsIndex: "03 / ความสามารถ",
    skillsTitle: "พื้นฐานที่หลากหลาย พร้อมนำมาใช้แก้ปัญหาอย่างตรงจุด",
    experienceIndex: "04 / ประสบการณ์และการศึกษา",
    experience: [
      { period: "2025 — ปัจจุบัน", title: "การพัฒนาเซิร์ฟเวอร์ FiveM", detail: "พัฒนาและดูแลเซิร์ฟเวอร์ ตั้งแต่เขียนสคริปต์ Lua สร้าง Web UI แก้ไขข้อผิดพลาด และปรับปรุงประสิทธิภาพระบบ" },
      { period: "2024 — ปัจจุบัน", title: "วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยศรีนครินทรวิโรฒ", detail: "นักศึกษาชั้นปีที่ 2 ที่กำลังสร้างพื้นฐานด้าน Frontend, Backend และการพัฒนาฐานข้อมูล" },
    ],
    contactLabel: "มาสร้างสิ่งที่มีประโยชน์ร่วมกัน",
    contactTitle: "มีตำแหน่งฝึกงานหรือโปรเจกต์ที่เหมาะกับผมไหม?",
    timezone: "ประเทศไทย · ICT (UTC+7)",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
  const copy = content[language];
  const localizedProjects = projects[language];
  const selectedProject = localizedProjects.find((project) => project.title === selectedProjectTitle) ?? null;

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
            <p className="Hero-monogram" aria-hidden="true">TD</p>
            <div className="Hero-profile-copy"><span>{copy.location}</span><strong>{copy.focus}</strong></div>
            <div className="Hero-availability"><span aria-hidden="true">●</span><strong>{copy.status}</strong></div>
          </aside>
        </div>
      </section>

      <section className="Intro Section" id="about">
        <div className="Section-index">{copy.profileIndex}</div>
        <div className="Intro-grid">
          <h2>{copy.profileTitle}</h2>
          <div className="Intro-copy"><p>{copy.profileOne}</p><p>{copy.profileTwo}</p></div>
        </div>
      </section>

      <section className="Projects Section" id="projects">
        <div className="Section-heading">
          <div><div className="Section-index">{copy.workIndex}</div><h2>{copy.workTitle}</h2></div>
          <p>{copy.workIntro}</p>
        </div>
        <div className="Project-list">
          {localizedProjects.map((project, index) => (
            <article key={project.title} className="Project-card">
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
        <div className="Section-heading"><div><div className="Section-index">{copy.skillsIndex}</div><h2>{copy.skillsTitle}</h2></div></div>
        <div className="Skill-list">
          {skillGroups[language].map((group, index) => (
            <article className="Skill-row" key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><p>{group.items.join(" · ")}</p></article>
          ))}
        </div>
      </section>

      <section className="Experience Section" id="experience">
        <div className="Section-index">{copy.experienceIndex}</div>
        <div className="Experience-list">
          {copy.experience.map((item) => (
            <article className="Experience-row" key={item.title}><span>{item.period}</span><h3>{item.title}</h3><p>{item.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="Contact Section" id="contact">
        <div className="Contact-panel">
          <p className="Eyebrow"><span /> {copy.contactLabel}</p>
          <h2>{copy.contactTitle}</h2>
          <a className="Contact-email" href="mailto:title.thirawat.dev@gmail.com">title.thirawat.dev@gmail.com <span aria-hidden="true">↗</span></a>
          <div className="Contact-meta">
            <a href="tel:+66615071665">+66 61 507 1665</a>
            <a href="https://github.com/err0r4o4-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span>{copy.timezone}</span>
          </div>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProjectTitle(null)} />}
    </main>
  );
}
