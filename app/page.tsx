import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";


export default function LandingPage() {
  return (
    <div className="min-h-screen relative bg-bg-primary overflow-hidden flex flex-col">
      <div className="ambient-glow top-[-100px] left-1/3"></div>
      
      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-8 h-20 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2 font-bold text-lg tracking-wider">
          <div className="w-6 h-6 rounded-md bg-accent-primary"></div> NEXUS
        </div>
        <Button variant="secondary" className="!py-2 !px-4">Launch Core</Button>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center pt-24 px-8 z-10 relative flex-1 flex flex-col items-center">
        <h1 className="text-5xl md:text-[64px] font-bold tracking-tight text-text-primary leading-[1.1] mb-6">
          Build, Research, and <br />Learn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-highlight">Autonomous AI</span>
        </h1>
        <p className="text-text-secondary max-w-xl text-lg mb-8 font-medium">
          The next-generation workspace consolidating real-time research, documents processing, and conversational models into a single hyper-threaded workspace.
        </p>
        <div className="flex items-center gap-4 mb-20">
          <Button variant="primary">Start Free Trial</Button>
          <Button variant="secondary">Watch System Demo</Button>
        </div>

        {/* Dynamic Abstract Tech Frame Illustration */}
        <div className="w-full aspect-[16/9] max-w-4xl rounded-nexus border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 relative mb-24 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          <div className="w-full h-full bg-bg-secondary/80 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <span className="text-xs font-mono tracking-[0.3em] text-accent-highlight uppercase animate-pulse">System Core Interactive Interface Placeholder</span>
          </div>
        </div>

        {/* Features Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full text-left mb-24">
          {[
            { title: "AI Chat", desc: "Multi-model reasoning execution canvas." },
            { title: "Research Agent", desc: "Automated vector exploration & generation web pipelines." },
            { title: "Knowledge Base", desc: "Your second brain integrated natively with high-scale vector indexing." },
            { title: "Doc Intelligence", desc: "Contextual insight parsing engines over dense text corpuses." }
          ].map((feat, i) => (
            <Card key={i}>
              <h3 className="text-base font-semibold text-text-primary mb-2">{feat.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}