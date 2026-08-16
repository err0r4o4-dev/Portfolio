import type { Language } from "../../language";
import { connectCopy } from "./connectData";
import ProfileCard from "./ProfileCard";
import SocialLinksCard from "./SocialLinksCard";
import StatusStrip from "./StatusStrip";

type ConnectSectionProps = {
  language: Language;
};

export default function ConnectSection({ language }: ConnectSectionProps) {
  const copy = connectCopy[language];

  return (
    <section className="Contact site-container section-shell" id="contact">
      <header className="Section-heading-centered mx-auto mb-[clamp(2.75rem,4.5vw,4rem)] grid max-w-3xl justify-items-center text-center" data-reveal>
        <h2 className="title-gradient text-[clamp(2.75rem,12vw,4.5rem)] font-semibold leading-[.94] tracking-[-.065em] text-balance">{copy.title}</h2>
        <p className="mt-5 max-w-2xl text-[clamp(.92rem,1.35vw,1.16rem)] leading-[1.75] text-ink-soft text-pretty">{copy.intro}</p>
      </header>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <ProfileCard language={language} />
          <SocialLinksCard language={language} />
        </div>
        <StatusStrip language={language} />
      </div>
    </section>
  );
}
