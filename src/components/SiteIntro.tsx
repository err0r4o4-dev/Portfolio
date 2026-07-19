import { useEffect, useState } from "react";
import "../styles/SiteIntro.css";

interface SiteIntroProps {
  onComplete: () => void;
}

const INTRO_EXIT_DELAY = 2300;
const INTRO_COMPLETE_DELAY = 3200;

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
      <main className="SiteIntro-content">
        <div className="SiteIntro-icons" aria-hidden="true">
          <span>
            <svg viewBox="0 0 24 24">
              <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4l-4 16" />
            </svg>
          </span>
          <span>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" />
            </svg>
          </span>
          <span>
            <svg viewBox="0 0 24 24">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 3 5 5 0 0 0 19.2 1S18 .6 15 2.5a13.4 13.4 0 0 0-7 0C5 .6 3.8 1 3.8 1a5 5 0 0 0-.1 2.5 5.4 5.4 0 0 0-1.5 4c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
              <path d="M8 18c-4.5 2-5-2-7-2" />
            </svg>
          </span>
        </div>

        <h1>
          <span>Welcome to my</span>
          <span className="SiteIntro-title-accent">Portfolio Website</span>
        </h1>

        <p className="SiteIntro-address">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21M12 3c-2.5 2.6-3.8 5.6-3.8 9s1.3 6.4 3.8 9" />
          </svg>
          github.com/err0r4o4-dev
        </p>
      </main>
    </div>
  );
}
