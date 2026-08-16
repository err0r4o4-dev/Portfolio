import { MapPin } from "lucide-react";
import type { Language } from "../../language";
import logo from "../../assets/thirawat-logo.png";
import { connectCopy } from "./connectData";

type ProfileCardProps = {
  language: Language;
};

const cardClass = "group min-w-0 rounded-panel border border-line-strong bg-panel/92 shadow-panel transition-[border-color,box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/50 hover:shadow-panel-hover motion-reduce:transition-none motion-reduce:hover:transform-none";

export default function ProfileCard({ language }: ProfileCardProps) {
  const copy = connectCopy[language];

  return (
    <article className={`${cardClass} grid grid-cols-[minmax(10rem,.78fr)_minmax(0,1.22fr)] items-center gap-[clamp(1.5rem,3vw,2.5rem)] p-[clamp(1.55rem,3vw,2.2rem)] max-[1100px]:grid-cols-[8rem_minmax(0,1fr)] max-[1100px]:gap-5 max-md:grid-cols-1 max-md:justify-items-center max-md:text-center max-sm:rounded-xl`} data-reveal>
      <div className="grid aspect-square w-full max-w-58 place-items-center overflow-hidden rounded-[1.25rem] border border-accent/35 bg-[#020b18] max-md:max-w-48">
        <img className="h-[78%] w-[78%] object-contain drop-shadow-[0_1rem_2rem_rgba(38,151,255,.2)]" src={logo} alt={copy.profileLogoAlt} />
      </div>
      <div className="grid content-center gap-4 max-md:justify-items-center">
        <div>
          <h3 className="text-[clamp(1.65rem,2.35vw,2.25rem)] font-semibold leading-[1.08] tracking-[-.045em]">{copy.profileName}</h3>
          <p className="mt-2.5 max-w-lg text-[clamp(.91rem,1.25vw,1.08rem)] leading-[1.65] text-[#77b7f7]">{copy.profileRole}</p>
        </div>
        <p className="flex items-center gap-2 text-[.94rem] text-[#aabbd0] [&_svg]:h-[1.15rem] [&_svg]:w-[1.15rem] [&_svg]:shrink-0 [&_svg]:text-[#9fb7d2] [&_svg]:[stroke-width:1.8]">
          <MapPin aria-hidden="true" />
          <span>{copy.location}</span>
        </p>
        <div className="mt-1 flex items-center gap-4 max-[1100px]:flex-col max-[1100px]:items-start max-[1100px]:gap-2 max-md:items-center">
          <span className="inline-flex items-center gap-2.5 whitespace-nowrap text-sm text-[#7fce5a]"><i className="status-dot" aria-hidden="true" />{copy.available}</span>
          <span className="h-10 w-px shrink-0 bg-line-strong max-[1100px]:hidden" aria-hidden="true" />
          <p className="max-w-56 text-sm leading-normal text-[#b7c6d9] max-md:max-w-sm">{copy.availabilityNote}</p>
        </div>
      </div>
    </article>
  );
}
