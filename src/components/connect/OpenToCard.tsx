import { BriefcaseBusiness } from "lucide-react";
import type { Language } from "../../language";
import { connectCopy, getLocalizedText, openToItems } from "./connectData";

type OpenToCardProps = {
  language: Language;
};

export default function OpenToCard({ language }: OpenToCardProps) {
  return (
    <article className="Connect-card Connect-open-card" data-reveal>
      <h3 className="Connect-card-title"><BriefcaseBusiness aria-hidden="true" />{connectCopy[language].openToTitle}</h3>
      <ul className="Connect-open-grid">
        {openToItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <Icon aria-hidden="true" />
              <span>{getLocalizedText(item.label, language)}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
