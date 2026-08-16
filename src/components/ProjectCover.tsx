import "../styles/ProjectCover.css";

interface ProjectCoverProps {
  title: string;
  subtitle: string;
  code: string;
  number: string;
  imageUrl?: string;
  isCompact?: boolean;
}

export default function ProjectCover({ title, subtitle, code, number, imageUrl, isCompact = false }: ProjectCoverProps) {
  return (
    <div className={`ProjectCover${isCompact ? " ProjectCover-compact" : ""}`} aria-hidden="true">
      <span className="ProjectCover-grid" />
      <span className="ProjectCover-orbit" />
      <span className="ProjectCover-number">{number}</span>
      <span className="ProjectCover-code">{code}</span>
      <span className="ProjectCover-rule" />
      {imageUrl && <img className="ProjectCover-image" src={imageUrl} alt="" />}
      <div className="ProjectCover-copy">
        <small>{subtitle}</small>
        <strong>{title}</strong>
      </div>
      <span className="ProjectCover-note">THIRAWAT / ARCHIVE</span>
    </div>
  );
}
