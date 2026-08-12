import { Download, ExternalLink, FileText, GitBranch, Zap } from "lucide-react";
import type { Language } from "../../language";
import { connectCopy, portfolioLinks } from "./connectData";

type ActionCardProps = {
  language: Language;
};

export default function ActionCard({ language }: ActionCardProps) {
  const copy = connectCopy[language];

  return (
    <article className="Connect-card Connect-action-card" data-reveal>
      <h3 className="Connect-card-title"><Zap aria-hidden="true" />{copy.actionTitle}</h3>
      <p>{copy.actionBody}</p>
      <div className="Connect-actions">
        <a className="Connect-action Connect-action-primary" href={portfolioLinks.github} target="_blank" rel="noopener noreferrer">
          <GitBranch aria-hidden="true" />
          <span>{copy.viewGithub}</span>
          <ExternalLink aria-hidden="true" />
        </a>
        <a className="Connect-action Connect-action-secondary" href={portfolioLinks.resume} download>
          <FileText aria-hidden="true" />
          <span>{copy.downloadResume}</span>
          <Download aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
