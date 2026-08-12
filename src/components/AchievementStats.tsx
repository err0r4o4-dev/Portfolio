import { useEffect, useRef, useState } from "react";
import "../styles/AchievementStats.css";

export interface AchievementStat {
  value: number;
  suffix?: string;
  label: string;
  note: string;
  symbol: string;
}

interface AchievementStatsProps {
  stats: AchievementStat[];
  ariaLabel: string;
}

export default function AchievementStats({ stats, ariaLabel }: AchievementStatsProps) {
  const regionRef = useRef<HTMLDivElement>(null);
  const shouldSkipAnimation = typeof window !== "undefined" && (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)
  );
  const [isVisible, setIsVisible] = useState(shouldSkipAnimation);
  const [isRevealFromTop, setIsRevealFromTop] = useState(false);
  const [progress, setProgress] = useState(shouldSkipAnimation ? 1 : 0);

  useEffect(() => {
    if (!isVisible || !isRevealFromTop) return;

    const animationFrameId = window.requestAnimationFrame(() => setIsRevealFromTop(false));
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isRevealFromTop, isVisible]);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;

    if (shouldSkipAnimation) return;

    let hasCounted = false;
    let animationFrameId = 0;

    const observer = new IntersectionObserver(([entry]) => {
      setIsRevealFromTop(entry.boundingClientRect.top < window.innerHeight / 2);
      setIsVisible(entry.isIntersecting);

      if (!entry.isIntersecting || hasCounted) return;
      hasCounted = true;

      const startedAt = performance.now();
      const duration = 850;
      const animate = (now: number) => {
        const elapsed = Math.min((now - startedAt) / duration, 1);
        setProgress(1 - Math.pow(1 - elapsed, 3));
        if (elapsed < 1) animationFrameId = window.requestAnimationFrame(animate);
      };
      animationFrameId = window.requestAnimationFrame(animate);
    }, { threshold: .18, rootMargin: "0px 0px -8% 0px" });

    observer.observe(region);
    return () => {
      observer.disconnect();
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [shouldSkipAnimation]);

  return (
    <div className={`Achievement-grid${isRevealFromTop ? " is-reveal-from-top" : ""}${isVisible ? " is-visible" : ""}`} ref={regionRef} role="list" aria-label={ariaLabel}>
      {stats.map((stat, index) => (
        <article className="Achievement-card" role="listitem" key={stat.label}>
          <span className="Achievement-symbol" aria-hidden="true">{stat.symbol}</span>
          <strong>{Math.round(stat.value * progress).toString().padStart(2, "0")}{stat.suffix}</strong>
          <h3>{stat.label}</h3>
          <p>{stat.note}</p>
          <span className="Achievement-index" aria-hidden="true">0{index + 1} ↗</span>
        </article>
      ))}
    </div>
  );
}
