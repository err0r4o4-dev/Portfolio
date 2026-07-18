import { useState } from "react";
import "../styles/Home.css";
import ProjectModal, { type Project } from "../components/ProjectModal";

const skillCards = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Spring Boot", "PostgreSQL"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Flutter", "Android Kotlin"],
  },
  {
    title: "Tools",
    items: ["Git", "Postman", "Figma", "Docker"],
  },
];

const projectCards: Project[] = [
  {
    title: "Grande Galaxy Hotel",
    subtitle: "Full-Stack Web App",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    description: "ระบบจองห้องพักโรงแรมแบบครบวงจร มีระบบชำระเงิน ตรวจสอบสถานะห้องพักแบบ Real-time และแดชบอร์ดจัดการจองสำหรับผู้ดูแลระบบ",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    features: [
      "ระบบจองห้องพักและชำระเงินออนไลน์สมบูรณ์แบบ",
      "ระบบส่งอีเมลแจ้งยืนยันการจองอัตโนมัติ",
      "แดชบอร์ดสรุปยอดขายและอัตราการเข้าพักสำหรับ Admin",
      "การดีไซน์แบบ Responsive รองรับการจองผ่านมือถือ"
    ],
    webDemoUrl: "https://example.com/grande-galaxy",
    githubUrl: "https://github.com/example/grande-galaxy-hotel"
  },
  {
    title: "Sugar Fruits",
    subtitle: "Android App",
    image: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=800&q=80",
    description: "แอปพลิเคชันมือถือสำหรับสั่งซื้อผลไม้ออร์แกนิกเดลิเวอรี่ พร้อมระบบตรวจสอบความสดใหม่และจำแนกประเภทผลไม้ด้วยกล้อง AI",
    techStack: ["Kotlin", "Jetpack Compose", "TensorFlow Lite", "Firebase"],
    features: [
      "สแกนและวิเคราะห์ความสุกของผลไม้แบบเรียลไทม์ด้วย AI",
      "ระบบชำระเงินผ่าน Mobile Banking และ QR Code",
      "ติดตามพิกัดของไรเดอร์ผู้จัดส่งแบบ Real-time บนแผนที่",
      "ระบบสะสมแต้มสมาชิกเพื่อแลกส่วนลดพิเศษ"
    ],
    apkUrl: "/downloads/sugar-fruits.apk",
    githubUrl: "https://github.com/example/sugar-fruits-android"
  },
  {
    title: "BrainFit",
    subtitle: "React Native App",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    description: "แอปพลิเคชันฝึกสมองและพัฒนาความจำสำหรับผู้สูงอายุ มีมินิเกมด่านต่างๆ ระบบบันทึกคะแนนรายวัน และแบบประเมินสุขภาพสมอง",
    techStack: ["React Native", "Expo", "Redux Toolkit", "SQLite", "Node.js"],
    features: [
      "มินิเกมฝึกความจำ ตรรกะ และการคิดคำนวณมากกว่า 10 เกม",
      "ระบบบันทึกสถิติและคะแนนสะสมรายวันเพื่อดูพัฒนาการ",
      "ฟังก์ชันตั้งเวลาเตือนทำกิจกรรมฝึกสมองตามกำหนด",
      "รองรับการใช้งานออฟไลน์ บันทึกข้อมูลลงฐานข้อมูลในเครื่อง"
    ],
    apkUrl: "/downloads/brainfit-app.apk",
    githubUrl: "https://github.com/example/brainfit-app"
  },
  {
    title: "News24",
    subtitle: "Flutter App",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "แอปพลิเคชันข่าวสารอัจฉริยะที่รวบรวมเนื้อหาจากสำนักข่าวชั้นนำทั่วโลก พร้อมระบบสรุปประเด็นข่าวที่สำคัญด้วย AI สั้นกระชับเข้าใจง่าย",
    techStack: ["Flutter", "Dart", "OpenAI API", "SQLite", "Bloc Pattern"],
    features: [
      "ระบบย่อยข่าว/สรุปข่าวอัตโนมัติด้วย AI ภายใน 3 บรรทัด",
      "บุ๊กมาร์กข่าวสารไว้อ่านออฟไลน์ได้โดยไม่ต้องเชื่อมต่อเน็ต",
      "ระบบกรองและนำเสนอข่าวสารแนะนำตามความสนใจของผู้ใช้",
      "ระบบแจ้งเตือนแบบ Push Notification ทันทีที่มีข่าวด่วน"
    ],
    apkUrl: "/downloads/news24-app.apk",
    webDemoUrl: "https://example.com/news24-web",
    githubUrl: "https://github.com/example/news24-flutter"
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="Home">
      <section className="Hero" id="home">
        <div className="Hero-content">
          <div>
            <p className="Hero-label">About Me</p>
            <h1 className="Hero-title">I’m a passionate developer building web and mobile applications.</h1>
            <p className="Hero-text">
              I specialize in React, Node.js, and Flutter. Always eager to learn new technologies and solve challenging problems.
            </p>
            <div className="Hero-actions">
              <a href="#projects" className="Hero-btn Hero-btn-primary">View Projects</a>
              <a href="#contact" className="Hero-btn Hero-btn-outline">Contact Me</a>
            </div>
          </div>
        </div>
      </section>

      <section className="About" id="about">
        <div className="About-card">
          <div className="About-image" />
          <div className="About-text">
            <h2>About Me</h2>
            <p className="About-description">
              I’m a passionate developer with experience building web and mobile applications.
              I specialize in React, Node.js, and Flutter.
            </p>
            <p>
              Always eager to learn new technologies and solve challenging problems.
            </p>
          </div>
        </div>
      </section>

      <section className="Skills" id="skills">
        <div className="Section-header">
          <h2>Skills</h2>
          <p>Strong skill set across frontend, backend, mobile, and developer tools.</p>
        </div>

        <div className="Skill-grid">
          {skillCards.map((card) => (
            <div key={card.title} className="Skill-card">
              <h3>{card.title}</h3>
              <div className="Skill-items">
                {card.items.map((item) => (
                  <span key={item} className="Skill-item">{item}</span>
                ))}
              </div>
              <a href="#projects" className="Skill-demo">Live Demo</a>
            </div>
          ))}
        </div>
      </section>

      <section className="Projects" id="projects">
        <div className="Section-header">
          <h2>My Projects</h2>
          <p>Selected projects showcasing web and mobile experiences with modern design.</p>
        </div>

        <div className="Project-grid">
          {projectCards.map((project) => (
            <article 
              key={project.title} 
              className="Project-card"
              onClick={() => setSelectedProject(project)}
              style={{ cursor: "pointer" }}
            >
              <div className="Project-image-container">
                <img src={project.image} alt={project.title} />
                <div className="Project-card-overlay">
                  <span className="Project-card-overlay-btn">ดูรายละเอียดผลงาน</span>
                </div>
              </div>
              <div className="Project-copy">
                <span>{project.subtitle}</span>
                <h3>{project.title}</h3>
                <p className="Project-card-short-desc">
                  {project.description.slice(0, 75)}...
                </p>
                <div className="Project-actions" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setSelectedProject(project)} 
                    className="Project-btn"
                  >
                    View Details
                  </button>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="Project-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="Contact" id="contact">
        <div className="Contact-panel">
          <h2>Contact</h2>
          <p>Ready to work together? Send me a message and I will respond as soon as possible.</p>
          <div className="Contact-info">
            <div>
              <span>Email</span>
              <strong>youname@email.com</strong>
            </div>
            <div>
              <span>GitHub</span>
              <strong>github.com/yourname</strong>
            </div>
            <div>
              <span>LinkedIn</span>
              <strong>linkedin.com/in/yourprofile</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Render interactive project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}
