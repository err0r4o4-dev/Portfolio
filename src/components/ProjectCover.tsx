interface ProjectCoverProps {
  title: string;
  subtitle: string;
  code: string;
  number: string;
  imageUrl?: string;
  isCompact?: boolean;
}

export default function ProjectCover({ title, subtitle, code, number, imageUrl, isCompact = false }: ProjectCoverProps) {
  return (
    <div className={`project-cover-art relative isolate h-full w-full overflow-hidden bg-[#05111e] text-[#edf5ff] ${isCompact ? "min-h-88" : "min-h-60 sm:min-h-68"}`} aria-hidden="true">
      <span className="absolute inset-0 bg-[linear-gradient(rgba(78,142,205,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(78,142,205,.1)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-25 [mask-image:linear-gradient(135deg,black,transparent_74%)]" />
      <span className="project-cover-orbit absolute -right-[4%] -top-[20%] aspect-square w-[48%] rounded-full border border-[#4e8ecd]/30 shadow-[0_0_0_2.8rem_rgba(35,143,242,.025),0_0_0_6rem_rgba(35,143,242,.015)] transition-transform duration-700 ease-out-expo group-hover/visual:scale-110 group-hover/visual:-translate-x-2 group-hover/visual:translate-y-2" />
      <span className="absolute left-6 top-6 font-mono text-[.68rem] font-medium tracking-[.1em] text-[#238ff2]">{number}</span>
      <span className="absolute right-[9%] top-[15%] font-heading text-[clamp(6rem,14vw,12rem)] font-bold leading-none tracking-[-.09em] text-[#edf5ff]/4">{code}</span>
      <span className="absolute left-6 right-6 top-16 h-px bg-[#4e8ecd]/25" />
      {imageUrl && <img className="absolute bottom-[14%] right-[8%] z-10 aspect-square w-[min(30%,8rem)] object-contain drop-shadow-[0_1rem_1.8rem_rgba(0,7,20,.55)]" src={imageUrl} alt="" />}
      <div className="absolute bottom-[clamp(1.5rem,4vw,3rem)] left-[clamp(1.5rem,4vw,3rem)] right-12 z-10">
        <small className="mb-3 block font-mono text-[.68rem] font-semibold uppercase tracking-[.1em] text-[#238ff2]">{subtitle}</small>
        <strong className="project-cover-title block max-w-[10ch] text-[clamp(2rem,5.5vw,5.25rem)] font-bold leading-[.88] tracking-[-.065em] text-[#edf5ff] text-balance">{title}</strong>
      </div>
      <span className="absolute bottom-6 right-6 font-mono text-[.68rem] font-medium tracking-[.1em] text-[#7f95ab] [writing-mode:vertical-rl] max-sm:hidden">THIRAWAT / ARCHIVE</span>
    </div>
  );
}
