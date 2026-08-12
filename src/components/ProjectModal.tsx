import { useEffect, useRef } from "react";
import { useLanguage } from "../language";
import ProjectCover from "./ProjectCover";
import "../styles/ProjectModal.css";

export interface Project {
  title: string;
  subtitle: string;
  coverCode: string;
  coverNumber: string;
  coverImage?: string;
  description: string;
  techStack: string[];
  features?: string[];
  apkUrl?: string;
  webDemoUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { language } = useLanguage();
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const labels = language === "th"
    ? {
        close: "ปิดรายละเอียดผลงาน",
        archive: "รายละเอียดจากคลังผลงาน",
        overview: "ภาพรวม",
        contributions: "สิ่งที่รับผิดชอบ",
        stack: "เทคโนโลยี",
        download: "ดาวน์โหลด APK",
        demo: "ดูเว็บไซต์",
        source: "ดูซอร์สโค้ด",
        request: "สอบถามรายละเอียดโปรเจกต์",
      }
    : {
        close: "Close project details",
        archive: "Archive case details",
        overview: "Overview",
        contributions: "Key contributions",
        stack: "Technology",
        download: "Download APK",
        demo: "View website",
        source: "Source code",
        request: "Ask about this project",
      };

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const animationFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const hasActions = project.apkUrl || project.webDemoUrl || project.githubUrl;

  return (
    <div className="ProjectModal-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        className="ProjectModal-container"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
      >
        <header className="ProjectModal-header">
          <span>{project.coverNumber} / {labels.archive}</span>
          <button ref={closeButtonRef} className="ProjectModal-close" type="button" onClick={onClose} aria-label={labels.close}>
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="ProjectModal-content">
          <div className="ProjectModal-preview">
            <ProjectCover
              title={project.title}
              subtitle={project.subtitle}
              code={project.coverCode}
              number={project.coverNumber}
              imageUrl={project.coverImage}
              isCompact
            />
          </div>

          <article className="ProjectModal-details">
            <p className="ProjectModal-subtitle">{project.subtitle}</p>
            <h2 className="ProjectModal-title" id="project-modal-title">{project.title}</h2>

            <div className="ProjectModal-section">
              <h3>{labels.overview}</h3>
              <p>{project.description}</p>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="ProjectModal-section">
                <h3>{labels.contributions}</h3>
                <ol className="ProjectModal-features-list">
                  {project.features.map((feature, index) => (
                    <li key={feature}>
                      <span>0{index + 1}</span>
                      <p>{feature}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="ProjectModal-section ProjectModal-stack-section">
              <h3>{labels.stack}</h3>
              <div className="ProjectModal-tags">
                {project.techStack.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </div>

            {hasActions && (
              <div className="ProjectModal-actions">
                {project.apkUrl && <a href={project.apkUrl} download>{labels.download} <span aria-hidden="true">↓</span></a>}
                {project.webDemoUrl && <a href={project.webDemoUrl} target="_blank" rel="noopener noreferrer">{labels.demo} <span aria-hidden="true">↗</span></a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">{labels.source} <span aria-hidden="true">↗</span></a>}
              </div>
            )}
            {!hasActions && (
              <div className="ProjectModal-actions">
                <a href={`mailto:title.thirawat.dev@gmail.com?subject=${encodeURIComponent(`Portfolio project: ${project.title}`)}`}>
                  {labels.request} <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </article>
        </div>
      </section>
    </div>
  );
}
