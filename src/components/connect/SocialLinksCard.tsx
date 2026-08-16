import { ExternalLink, Globe2 } from "lucide-react";
import type { Language } from "../../language";
import { connectCopy, getLocalizedText, socialLinks } from "./connectData";

type SocialLinksCardProps = {
  language: Language;
};

const cardClass = "group min-w-0 rounded-panel border border-line-strong bg-panel/92 p-[clamp(1.4rem,2.5vw,1.85rem)] shadow-panel transition-[border-color,box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/50 hover:shadow-panel-hover motion-reduce:transition-none motion-reduce:hover:transform-none max-sm:rounded-xl";

export default function SocialLinksCard({ language }: SocialLinksCardProps) {
  const copy = connectCopy[language];

  return (
    <article className={cardClass} data-reveal>
      <h3 className="flex items-center gap-3 text-[clamp(1.05rem,1.5vw,1.28rem)] font-semibold leading-snug tracking-[-.025em] text-ink [&_svg]:h-6 [&_svg]:w-6 [&_svg]:shrink-0 [&_svg]:text-accent [&_svg]:[stroke-width:1.8]"><Globe2 aria-hidden="true" />{copy.socialTitle}</h3>
      <nav className="mt-4 grid gap-2" aria-label={copy.socialTitle}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          const isExternal = link.href.startsWith("http");

          return (
            <a
              className="group/link grid min-h-15 grid-cols-[2.4rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-line bg-panel-elevated/70 px-3 py-2 transition-[border-color,background,transform] duration-250 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:bg-[#0c243e] motion-reduce:transition-none motion-reduce:hover:transform-none"
              href={link.href}
              key={link.id}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              <span className="grid size-9 place-items-center text-[#dcecff] [&_svg]:size-6 [&_svg]:[stroke-width:1.8]" aria-hidden="true"><Icon /></span>
              <span className="grid min-w-0 gap-px">
                <strong className="text-sm font-semibold leading-snug text-ink">{getLocalizedText(link.label, language)}</strong>
                <small className="overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-snug text-[#9fb1c7]">{getLocalizedText(link.detail, language)}</small>
              </span>
              <ExternalLink className="size-4 text-accent transition-transform duration-250 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/link:transform-none" aria-hidden="true" />
            </a>
          );
        })}
      </nav>
    </article>
  );
}
