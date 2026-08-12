import { MapPin } from "lucide-react";
import type { Language } from "../../language";
import logo from "../../assets/thirawat-logo.png";
import { connectCopy } from "./connectData";

type ProfileCardProps = {
  language: Language;
};

export default function ProfileCard({ language }: ProfileCardProps) {
  const copy = connectCopy[language];

  return (
    <article className="Connect-card Connect-profile-card" data-reveal>
      <div className="Connect-profile-logo">
        <img src={logo} alt={copy.profileLogoAlt} />
      </div>
      <div className="Connect-profile-copy">
        <div>
          <h3>{copy.profileName}</h3>
          <p className="Connect-profile-role">{copy.profileRole}</p>
        </div>
        <p className="Connect-profile-location">
          <MapPin aria-hidden="true" />
          <span>{copy.location}</span>
        </p>
        <div className="Connect-profile-status">
          <span className="Connect-availability"><i aria-hidden="true" />{copy.available}</span>
          <span className="Connect-status-divider" aria-hidden="true" />
          <p>{copy.availabilityNote}</p>
        </div>
      </div>
    </article>
  );
}
