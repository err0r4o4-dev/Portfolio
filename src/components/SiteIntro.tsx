import { useEffect, useState } from "react";
import "../styles/SiteIntro.css";

interface SiteIntroProps {
  onComplete: () => void;
}

const INTRO_EXIT_DELAY = 2200;
const INTRO_COMPLETE_DELAY = 2800;

export default function SiteIntro({ onComplete }: SiteIntroProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const exitTimer = window.setTimeout(() => setIsLeaving(true), INTRO_EXIT_DELAY);
    const completeTimer = window.setTimeout(onComplete, INTRO_COMPLETE_DELAY);

    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <div className={"SiteIntro" + (isLeaving ? " is-leaving" : "")} aria-label="Opening Thirawat's portfolio">
      <span className="SiteIntro-grid" aria-hidden="true" />
      <main className="SiteIntro-content">
        <div className="SiteIntro-mark" aria-hidden="true">
          <span>T</span>D
          <i />
        </div>

        <p className="SiteIntro-name">Thirawat Duangta</p>
        <h1>
          <span>Welcome to my</span>
          <span>digital archive<i aria-hidden="true">.</i></span>
        </h1>

        <div className="SiteIntro-progress" aria-hidden="true">
          <span>Loading portfolio</span>
          <div><i /></div>
        </div>
      </main>
      <p className="SiteIntro-counter" aria-hidden="true"><span>01</span> / 01</p>
    </div>
  );
}
