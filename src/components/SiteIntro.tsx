import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import "../styles/SiteIntro.css";

interface SiteIntroProps {
  onComplete: () => void;
}

const WELCOME_TEXT = "WELCOME TO MY";
const PORTFOLIO_TEXT = "PORTFOLIO WEBSITE";
const LOADING_TEXT = "THIRAWAT.DEV";
const INTRO_EXIT_DELAY = 5500;
const INTRO_COMPLETE_DELAY = 6400;

const renderCharacters = (text: string, keyPrefix: string, stepMilliseconds: number) => (
  Array.from(text).map((character, index) => (
    <span
      className="SiteIntro-character"
      key={keyPrefix + index}
      style={{ "--character-delay": index * stepMilliseconds + "ms" } as CSSProperties}
    >
      {character === " " ? " " : character}
    </span>
  ))
);

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
      <div className="SiteIntro-backdrop" aria-hidden="true">
        <span className="SiteIntro-orbits" />
        <span className="SiteIntro-dots SiteIntro-dots-left" />
        <span className="SiteIntro-dots SiteIntro-dots-right" />
      </div>

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

        <h1 aria-label="Welcome to my Portfolio Website">
          <span className="SiteIntro-line SiteIntro-welcome" aria-hidden="true">
            {renderCharacters(WELCOME_TEXT, "welcome-", 42)}
          </span>
          <span className="SiteIntro-line SiteIntro-title-accent" aria-hidden="true">
            {renderCharacters(PORTFOLIO_TEXT, "portfolio-", 38)}
          </span>
        </h1>

        <p className="SiteIntro-loading" aria-label="Loading Thirawat dot dev">
          <span aria-hidden="true">{renderCharacters(LOADING_TEXT, "loading-", 85)}</span>
          <i aria-hidden="true" />
        </p>
      </main>
    </div>
  );
}
