import { useEffect, useRef, useState } from "react";

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

const revealDelays = ["delay-0", "delay-75", "delay-150"];

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
    if (!region || shouldSkipAnimation) return;

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
    <div className="mt-14 grid grid-cols-1 gap-3 min-[701px]:grid-cols-2 min-[1001px]:mt-20 min-[1001px]:grid-cols-3" ref={regionRef} role="list" aria-label={ariaLabel}>
      {stats.map((stat, index) => (
        <article
          className={`achievement-card-art relative min-h-60 overflow-hidden rounded-xl border border-[#4e8ecd]/20 bg-[linear-gradient(145deg,#071728,#020812_58%)] p-6 shadow-[inset_0_1px_rgba(237,245,255,.035),0_1.5rem_3.8rem_rgba(0,4,12,.28)] transition-[opacity,transform,border-color,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 hover:border-[#459dee]/40 hover:shadow-[inset_0_1px_rgba(237,245,255,.05),0_1.8rem_4.5rem_rgba(0,14,38,.34),0_0_2rem_rgba(35,143,242,.06)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${index === 2 ? "min-[701px]:max-[1000px]:col-span-full min-[701px]:max-[1000px]:w-[calc(50%-.4rem)] min-[701px]:max-[1000px]:justify-self-center" : ""} ${isVisible ? `translate-y-0 opacity-100 ${revealDelays[index] ?? ""}` : `${isRevealFromTop ? "-translate-y-6" : "translate-y-6"} opacity-0`}`}
          role="listitem"
          key={stat.label}
        >
          <span className="mb-8 grid size-10 place-items-center rounded-lg border border-[#4e8ecd]/25 bg-[#061525] font-mono text-[.68rem] font-medium text-[#65aff8]" aria-hidden="true">{stat.symbol}</span>
          <strong className="block text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-none tracking-[-.06em] text-[#edf5ff] tabular-nums">{Math.round(stat.value * progress).toString().padStart(2, "0")}{stat.suffix}</strong>
          <h3 className="mt-3 text-base font-semibold text-[#edf5ff]">{stat.label}</h3>
          <p className="mt-2 max-w-72 text-xs leading-relaxed text-[#7f95ab]">{stat.note}</p>
          <span className="absolute right-5 top-5 font-mono text-[.6rem] font-medium text-[#667d95]" aria-hidden="true">0{index + 1} ↗</span>
        </article>
      ))}
    </div>
  );
}
