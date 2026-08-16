import { useLanguage } from "../language";

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 isolate bg-canvas-deep">
      <div className="site-container flex min-h-18 items-center max-sm:min-h-20">
        <div className="flex w-full items-center gap-8 font-mono text-xs font-medium tracking-[.035em] text-ink-dim before:text-[#38e6b2] before:content-['●'] before:[text-shadow:0_0_.7rem_rgba(56,230,178,.65)] max-sm:flex-wrap max-sm:gap-x-5 max-sm:gap-y-2 max-sm:py-4 [&>span]:mr-auto [&>span]:whitespace-nowrap [&>a]:whitespace-nowrap [&>a]:transition-[color,transform] [&>a]:duration-300 [&>a]:ease-out-expo hover:[&>a]:-translate-y-0.5 hover:[&>a]:text-[#bfe2ff] motion-reduce:[&>a]:transition-none">
          <span>© {currentYear} Thirawat Duangta</span>
          <a href="mailto:title.thirawat.dev@gmail.com">{language === "th" ? "อีเมล" : "Email"}</a>
          <a href="https://github.com/err0r4o4-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
