import { useEffect, useRef } from "react";
import { useLanguage } from "../language";
import ProjectCover from "./ProjectCover";

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
  const sectionClass = "mt-14 grid grid-cols-[8.5rem_1fr] gap-[clamp(1.5rem,4vw,3rem)] border-t border-line pt-6 max-[860px]:grid-cols-1 max-[860px]:gap-4";
  const actionClass = "inline-flex min-w-44 items-center justify-between gap-8 border border-accent/45 px-4 py-4 font-mono text-xs font-semibold text-ink transition-[background,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-[#06111e] motion-reduce:transition-none motion-reduce:hover:transform-none max-[520px]:w-full";

  return (
    <div className="fixed inset-0 z-100 grid place-items-center bg-[#020811]/90 p-[clamp(1rem,3vw,2.5rem)] backdrop-blur-[14px] animate-[modal-fade-in_.25s_ease_both] motion-reduce:animate-none max-[860px]:p-0" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        className="modal-frame modal-scrollbar relative max-h-[calc(100dvh_-_clamp(2rem,6vw,5rem))] w-[min(100%,74rem)] overflow-y-auto border border-accent/35 bg-[#081422] shadow-[0_2.5rem_7rem_rgba(0,44,96,.3)] animate-[modal-enter_.45s_cubic-bezier(.16,1,.3,1)_both] motion-reduce:animate-none max-[860px]:min-h-dvh max-[860px]:w-full max-[860px]:max-h-dvh max-[860px]:border-x-0"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
      >
        <header className="sticky top-0 z-10 flex min-h-18 items-center justify-between border-b border-line bg-[#081422]/95 py-0 pl-8 pr-5 backdrop-blur-xl max-[520px]:pl-4">
          <span className="font-mono text-[.68rem] font-medium uppercase tracking-[.1em] text-ink-muted max-[520px]:max-w-[65%]">{project.coverNumber} / {labels.archive}</span>
          <button ref={closeButtonRef} className="grid size-11 cursor-pointer place-items-center border border-line bg-transparent p-0 text-2xl text-ink transition-[color,border-color,transform] duration-200 hover:rotate-6 hover:border-accent hover:text-accent motion-reduce:transition-none motion-reduce:hover:transform-none" type="button" onClick={onClose} aria-label={labels.close}>
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="grid min-h-152 grid-cols-[minmax(20rem,.8fr)_minmax(0,1.2fr)] max-[860px]:grid-cols-1">
          <div className="sticky top-18 h-[min(calc(100dvh-9rem),42rem)] min-h-128 self-start border-r border-line max-[860px]:relative max-[860px]:top-auto max-[860px]:h-[min(72vw,28rem)] max-[860px]:min-h-80 max-[860px]:border-b max-[860px]:border-r-0">
            <ProjectCover
              title={project.title}
              subtitle={project.subtitle}
              code={project.coverCode}
              number={project.coverNumber}
              imageUrl={project.coverImage}
              isCompact
            />
          </div>

          <article className="p-[clamp(2rem,5vw,4.5rem)] max-[520px]:px-4 max-[520px]:pb-16 max-[520px]:pt-10">
            <p className="mb-5 font-mono text-[.7rem] font-semibold uppercase tracking-[.1em] text-accent">{project.subtitle}</p>
            <h2 className="max-w-[11ch] text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.86] tracking-[-.07em] text-balance max-[520px]:text-[clamp(2.8rem,15vw,4.5rem)]" id="project-modal-title">{project.title}</h2>

            <div className={sectionClass}>
              <h3 className="font-mono text-[.68rem] font-medium uppercase leading-normal tracking-[.08em] text-accent">{labels.overview}</h3>
              <p className="max-w-160 text-ink-muted">{project.description}</p>
            </div>

            {project.features && project.features.length > 0 && (
              <div className={sectionClass}>
                <h3 className="font-mono text-[.68rem] font-medium uppercase leading-normal tracking-[.08em] text-accent">{labels.contributions}</h3>
                <ol className="m-0 grid list-none p-0">
                  {project.features.map((feature, index) => (
                    <li className="grid grid-cols-[2.25rem_1fr] gap-4 pb-4 text-ink-muted [&+li]:border-t [&+li]:border-line [&+li]:pt-4" key={feature}>
                      <span className="pt-1.5 font-mono text-[.64rem] font-medium text-accent">0{index + 1}</span>
                      <p>{feature}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className={sectionClass}>
              <h3 className="font-mono text-[.68rem] font-medium uppercase leading-normal tracking-[.08em] text-accent">{labels.stack}</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => <span className="border border-line px-3 py-2 font-mono text-[.68rem] font-medium text-ink-muted" key={tech}>{tech}</span>)}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 max-[520px]:flex-col">
              {hasActions ? (
                <>
                  {project.apkUrl && <a className={actionClass} href={project.apkUrl} download>{labels.download} <span aria-hidden="true">↓</span></a>}
                  {project.webDemoUrl && <a className={actionClass} href={project.webDemoUrl} target="_blank" rel="noopener noreferrer">{labels.demo} <span aria-hidden="true">↗</span></a>}
                  {project.githubUrl && <a className={actionClass} href={project.githubUrl} target="_blank" rel="noopener noreferrer">{labels.source} <span aria-hidden="true">↗</span></a>}
                </>
              ) : (
                <a className={actionClass} href={`mailto:title.thirawat.dev@gmail.com?subject=${encodeURIComponent(`Portfolio project: ${project.title}`)}`}>
                  {labels.request} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
