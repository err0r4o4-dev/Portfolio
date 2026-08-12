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
  const [hasEntered, setHasEntered] = useState(shouldSkipAnimation);
  const [progress, setProgress] = useState(shouldSkipAnimation ? 1 : 0);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;

    if (shouldSkipAnimation) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setHasEntered(true);
      observer.disconnect();

      const startedAt = performance.now();
      const duration = 850;
      const animate = (now: number) => {
        const elapsed = Math.min((now - startedAt) / duration, 1);
        setProgress(1 - Math.pow(1 - elapsed, 3));
        if (elapsed < 1) window.requestAnimationFrame(animate);
      };
      window.requestAnimationFrame(animate);
    }, { threshold: .25 });

    observer.observe(region);
    return () => observer.disconnect();
  }, [shouldSkipAnimation]);

  return (
    <div className={`Achievement-grid${hasEntered ? " is-visible" : ""}`} ref={regionRef} aria-label={ariaLabel}>
      {stats.map((stat, index) => (
        <article className="Achievement-card" key={stat.label}>
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
