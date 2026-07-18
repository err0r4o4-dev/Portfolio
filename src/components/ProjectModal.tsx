import "../styles/ProjectModal.css";

export interface Project {
  title: string;
  subtitle: string;
  image: string;
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
  // Generate absolute URL for APK download to encode in QR code
  const apkDownloadUrl = project.apkUrl
    ? `${window.location.origin}${project.apkUrl}`
    : "";

  const qrCodeApiUrl = apkDownloadUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        apkDownloadUrl
      )}`
    : "";

  return (
    <div className="ProjectModal-overlay" onClick={onClose}>
      <div className="ProjectModal-container" onClick={(e) => e.stopPropagation()}>
        <button className="ProjectModal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="ProjectModal-content">
          {/* Left Column: Phone Mockup / Live Preview */}
          <div className="ProjectModal-preview">
            <div className="PhoneMockup">
              <div className="PhoneMockup-speaker"></div>
              <div className="PhoneMockup-camera"></div>
              <div className="PhoneMockup-screen">
                <img src={project.image} alt={project.title} className="PhoneMockup-screenshot" />
              </div>
              <div className="PhoneMockup-home-button"></div>
            </div>
            <div className="ProjectModal-glow"></div>
          </div>

          {/* Right Column: Project Details */}
          <div className="ProjectModal-details">
            <span className="ProjectModal-subtitle">{project.subtitle}</span>
            <h2 className="ProjectModal-title">{project.title}</h2>

            <div className="ProjectModal-tags">
              {project.techStack.map((tech) => (
                <span key={tech} className="ProjectModal-tag">
                  {tech}
                </span>
              ))}
            </div>

            <p className="ProjectModal-desc">{project.description}</p>

            {project.features && project.features.length > 0 && (
              <div className="ProjectModal-features-section">
                <h3>คุณสมบัติเด่น (Features)</h3>
                <ul className="ProjectModal-features-list">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="ProjectModal-feature-item">
                      <span className="ProjectModal-feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="ProjectModal-actions-container">
              {/* Action Buttons */}
              <div className="ProjectModal-buttons">
                {project.apkUrl && (
                  <a
                    href={project.apkUrl}
                    download
                    className="ProjectModal-btn ProjectModal-btn-primary"
                  >
                    <svg
                      className="ProjectModal-btn-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download APK
                  </a>
                )}

                {project.webDemoUrl && (
                  <a
                    href={project.webDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ProjectModal-btn ProjectModal-btn-secondary"
                  >
                    <svg
                      className="ProjectModal-btn-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Demo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ProjectModal-btn ProjectModal-btn-github"
                  >
                    <svg
                      className="ProjectModal-btn-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source Code
                  </a>
                )}
              </div>

              {/* QR Code Section for Mobile App Downloads */}
              {project.apkUrl && qrCodeApiUrl && (
                <div className="ProjectModal-qr-section">
                  <div className="ProjectModal-qr-wrapper">
                    <img
                      src={qrCodeApiUrl}
                      alt="Scan to download APK"
                      className="ProjectModal-qr-image"
                    />
                  </div>
                  <div className="ProjectModal-qr-info">
                    <strong>Scan to Download</strong>
                    <span>สแกน QR Code ด้วยมือถือเพื่อดาวน์โหลดไฟล์ติดตั้ง (.apk) ลงเครื่องได้ทันที</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
