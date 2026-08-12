import type { Language } from "../../language";
import "../../styles/ConnectSection.css";
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
    <section className="Contact Connect Section" id="contact">
      <header className="Connect-heading Section-heading-centered" data-reveal>
        <h2>{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>

      <div className="Connect-layout">
        <div className="Connect-grid Connect-grid-top">
          <ProfileCard language={language} />
          <SocialLinksCard language={language} />
        </div>
        <StatusStrip language={language} />
      </div>
    </section>
  );
}
