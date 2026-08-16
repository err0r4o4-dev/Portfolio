import { Globe2 } from "lucide-react";
import type { Language } from "../../language";
import { connectCopy } from "./connectData";

type StatusStripProps = {
  language: Language;
};

export default function StatusStrip({ language }: StatusStripProps) {
  const copy = connectCopy[language];

  return (
    <aside className="flex min-h-18 min-w-0 items-center justify-center gap-8 rounded-panel border border-line-strong bg-panel/92 px-6 py-4 text-sm text-[#aebed1] shadow-panel transition-[border-color,box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/50 hover:shadow-panel-hover motion-reduce:transition-none motion-reduce:hover:transform-none max-sm:min-h-26 max-sm:flex-col max-sm:gap-3 max-sm:rounded-xl max-sm:text-center" aria-label={`${copy.basedIn}. ${copy.remote}`} data-reveal>
      <span className="inline-flex items-center gap-3"><i className="status-dot" aria-hidden="true" />{copy.basedIn}</span>
      <span className="h-7 w-px bg-line-strong max-sm:h-px max-sm:w-[min(12rem,70%)]" aria-hidden="true" />
      <span className="inline-flex items-center gap-3 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-[#7eb8ef] [&_svg]:[stroke-width:1.7]"><Globe2 aria-hidden="true" />{copy.remote}</span>
    </aside>
  );
}
