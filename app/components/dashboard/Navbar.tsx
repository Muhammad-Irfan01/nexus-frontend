export const Navbar = ({ title }: { title: string }) => {
  return (
    <header className="h-[72px] w-full border-b border-white/8 bg-bg-primary/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-sm font-semibold tracking-wide text-text-primary uppercase">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-bg-secondary border border-white/8 rounded-lg px-3 py-1.5 text-xs text-text-secondary">
          <span>Model:</span>
          <span className="text-accent-secondary font-medium">Nexus-Omni-Ultra</span>
        </div>
      </div>
    </header>
  );
};