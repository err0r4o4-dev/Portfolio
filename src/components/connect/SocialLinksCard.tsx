import { ExternalLink, Globe2 } from "lucide-react";
import type { Language } from "../../language";
import { connectCopy, getLocalizedText, socialLinks } from "./connectData";

type SocialLinksCardProps = {
  language: Language;
};

export default function SocialLinksCard({ language }: SocialLinksCardProps) {
  const copy = connectCopy[language];

  return (
    <article className="Connect-card Connect-social-card" data-reveal>
      <h3 className="Connect-card-title"><Globe2 aria-hidden="true" />{copy.socialTitle}</h3>
      <nav className="Connect-social-list" aria-label={copy.socialTitle}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          const content = (
            <>
              <span className="Connect-social-icon" aria-hidden="true"><Icon /></span>
              <span className="Connect-social-copy">
                <strong>{getLocalizedText(link.label, language)}</strong>
                <small>{getLocalizedText(link.detail, language)}</small>
              </span>
              <ExternalLink className="Connect-external-icon" aria-hidden="true" />
            </>
          );

          return link.href ? (
            <a
              className="Connect-social-link"
              href={link.href}
              key={link.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          ) : (
            <div
              className="Connect-social-link is-unavailable"
              aria-disabled="true"
              title={copy.socialUnavailable}
              key={link.id}
            >
              {content}
            </div>
          );
        })}
      </nav>
    </article>
  );
}
