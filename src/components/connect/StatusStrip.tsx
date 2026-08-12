import { Globe2 } from "lucide-react";
import type { Language } from "../../language";
import { connectCopy } from "./connectData";

type StatusStripProps = {
  language: Language;
};

export default function StatusStrip({ language }: StatusStripProps) {
  const copy = connectCopy[language];

  return (
    <aside className="Connect-card Connect-status-strip" aria-label={`${copy.basedIn}. ${copy.remote}`} data-reveal>
      <span><i aria-hidden="true" />{copy.basedIn}</span>
      <span className="Connect-strip-divider" aria-hidden="true" />
      <span><Globe2 aria-hidden="true" />{copy.remote}</span>
    </aside>
  );
}
