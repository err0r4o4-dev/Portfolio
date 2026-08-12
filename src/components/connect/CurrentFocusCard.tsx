import { Target } from "lucide-react";
import type { Language } from "../../language";
import { connectCopy, focusItems, getLocalizedText } from "./connectData";

type CurrentFocusCardProps = {
  language: Language;
};

export default function CurrentFocusCard({ language }: CurrentFocusCardProps) {
  return (
    <article className="Connect-card Connect-focus-card" data-reveal>
      <h3 className="Connect-card-title"><Target aria-hidden="true" />{connectCopy[language].focusTitle}</h3>
      <ul className="Connect-focus-list">
        {focusItems.map((item) => {
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
