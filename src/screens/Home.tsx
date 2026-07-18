import { useState } from "react";
import "../styles/Home.css";
import ProjectModal, { type Project } from "../components/ProjectModal";

const skillGroups = [
  { title: "Languages", items: ["JavaScript", "Java", "Python", "C#", "C", "Lua", "Dart", "HTML / CSS", "XML"] },
  { title: "Frameworks", items: ["React", "React Native", "Next.js", "Express.js", "Flutter", "Bootstrap"] },
  { title: "Data & tools", items: ["MySQL", "MariaDB", "GitHub", "Android Studio", "Figma"] },
  { title: "Creative tech", items: ["Unity", "Blender", "UX/UI design", "3D modelling"] },
];

const projects: Project[] = [
  {
    title: "SugarFulit",
    subtitle: "Android application",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85",
    description: "An Android application that presents sugar-content information in fruit, helping people with diabetes and anyone who wants to manage their sugar intake.",
    techStack: ["Java", "XML", "Android Studio", "UX/UI"],
    features: [
      "Designed and implemented the user experience and interface",
      "Developed the application across the full stack",
      "Focused the product on clear, accessible nutrition information",
    ],
    apkUrl: "/downloads/sugar-fruits.apk",
  },
  {
    title: "BrainFit",
    subtitle: "Mobile application",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=85",
    description: "A mobile application created to help reduce the risk of Alzheimer's disease through accessible cognitive activities and a simple mobile experience.",
    techStack: ["React Native", "JSX", "Google Sheets API", "UX/UI"],
    features: [
      "Developed the application with React Native",
      "Built the backend and supported frontend layout implementation",
      "Designed the data structure and integrated Google Sheets API",
    ],
  },
  {
    title: "Grande Galaxy Hotel",
    subtitle: "Full-stack web application",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    description: "A complete hotel booking experience covering room search, reservations, online payments, room availability and an operational management dashboard.",
    techStack: ["Full-stack", "MariaDB", "Database design", "UX/UI"],
    features: [
      "Contributed to the UX/UI design",
      "Developed the complete full-stack application",
      "Designed and implemented the MariaDB database schema",
    ],
  },
  {
    title: "SWU Metaverse",
    subtitle: "Competition project · 3rd place",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1200&q=85",
    description: "A virtual Srinakharinwirot University environment developed for the SWU Metaverse Competition, earning 3rd place and an invitation to join Metaverse training workshops.",
    techStack: ["Unity", "C#", "Blender", "3D optimisation"],
    features: [
      "Developed the player system in Unity with C#",
      "Modelled university buildings in Blender",
      "Imported and optimised 3D assets for the Metaverse environment",
    ],
  },
];

const experience = [
  {
    period: "2025 — Present",
    title: "FiveM server development",
    detail: "Developing and maintaining a custom server across Lua scripting, web-based interfaces, debugging and performance optimisation.",
  },
  {
    period: "2024 — Present",
    title: "Computer Engineering, Srinakharinwirot University",
    detail: "Second-year student building a strong foundation across frontend, backend and database development. Current GPAX: 3.83 / 4.00.",
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main id="main-content" className="Home">
      <section className="Hero" id="home">
        <div className="Hero-content">
          <div className="Hero-copy">
            <p className="Eyebrow"><span /> Available for an internship</p>
            <h1>Building thoughtful software, from interface to infrastructure.</h1>
            <p className="Hero-intro">
              I’m <strong>Thirawat Duangta</strong>, a Computer Engineering student focused on full-stack and mobile development. I turn practical problems into clear, usable products.
            </p>
            <div className="Hero-actions">
              <a href="#projects" className="Button Button-primary">Explore my work</a>
              <a href="/downloads/Thirawat-Duangta-CV.pdf" download className="Text-link">Download résumé <span aria-hidden="true">↘</span></a>
            </div>
          </div>

          <aside className="Hero-profile" aria-label="Profile summary">
            <p className="Hero-monogram" aria-hidden="true">TD</p>
            <div className="Hero-profile-copy">
              <span>Based in Thailand</span>
              <strong>Frontend · Backend · Mobile</strong>
            </div>
            <div className="Hero-stat">
              <strong>3.83</strong>
              <span>GPAX / 4.00</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="Intro Section" id="about">
        <div className="Section-index">01 / Profile</div>
        <div className="Intro-grid">
          <h2>I care about how a product works—and how it feels to use.</h2>
          <div className="Intro-copy">
            <p>I’m seeking an internship where I can contribute to real software while learning from an experienced team.</p>
            <p>My work spans web, mobile, databases and interactive 3D. I enjoy analysing a problem, proposing a direct solution and carrying it through implementation.</p>
          </div>
        </div>
      </section>

      <section className="Projects Section" id="projects">
        <div className="Section-heading">
          <div>
            <div className="Section-index">02 / Selected work</div>
            <h2>Projects with a clear purpose.</h2>
          </div>
          <p>Coursework and independent builds across health, hospitality and immersive technology.</p>
        </div>

        <div className="Project-list">
          {projects.map((project, index) => (
            <article key={project.title} className="Project-card">
              <button className="Project-visual" onClick={() => setSelectedProject(project)} aria-label={`View ${project.title} details`}>
                <img src={project.image} alt="" />
                <span className="Project-number">0{index + 1}</span>
                <span className="Project-open" aria-hidden="true">↗</span>
              </button>
              <div className="Project-copy">
                <span className="Project-type">{project.subtitle}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="Project-tags">
                  {project.techStack.map((tech) => <span key={tech}>{tech}</span>)}
                </div>
                <button className="Text-link Project-detail" onClick={() => setSelectedProject(project)}>View case details <span aria-hidden="true">→</span></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="Skills Section" id="skills">
        <div className="Section-heading">
          <div>
            <div className="Section-index">03 / Capabilities</div>
            <h2>A broad foundation, applied with focus.</h2>
          </div>
        </div>
        <div className="Skill-list">
          {skillGroups.map((group, index) => (
            <article className="Skill-row" key={group.title}>
              <span>0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="Experience Section" id="experience">
        <div className="Section-index">04 / Experience & education</div>
        <div className="Experience-list">
          {experience.map((item) => (
            <article className="Experience-row" key={item.title}>
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="Contact Section" id="contact">
        <div className="Contact-panel">
          <p className="Eyebrow"><span /> Let’s build something useful</p>
          <h2>Have an internship or project in mind?</h2>
          <a className="Contact-email" href="mailto:title.thirawat.dev@gmail.com">title.thirawat.dev@gmail.com <span aria-hidden="true">↗</span></a>
          <div className="Contact-meta">
            <a href="tel:+66615071665">+66 61 507 1665</a>
            <a href="https://github.com/err0r4o4-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span>Thailand · ICT (UTC+7)</span>
          </div>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
