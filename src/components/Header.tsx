import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full px-8 lg:px-16 py-5 flex items-center justify-between max-w-[1320px] mx-auto relative z-20">
      <a href="#" className="flex items-center gap-2">
        <Logo className="h-5 w-5" color="#002FD2" />
        <span className="text-[14px] font-medium tracking-tight text-[#111]">Vox Front</span>
      </a>
      <nav className="hidden md:flex items-center gap-7">
        <a href="#how" className="text-[13px] text-[#666] hover:text-[#111] transition-colors">How it works</a>
        <a href="#situations" className="text-[13px] text-[#666] hover:text-[#111] transition-colors">Use cases</a>
        <a href="#dashboard" className="text-[13px] text-[#666] hover:text-[#111] transition-colors">Dashboard</a>
        <a href="#faq" className="text-[13px] text-[#666] hover:text-[#111] transition-colors">FAQ</a>
      </nav>
      <div className="flex items-center gap-4">
        <a href="#" className="text-[13px] text-[#111] hover:text-[#000] transition-colors hidden sm:inline">Sign in</a>
        <Button size="sm" render={<a href="#cta" />}>
          Book a demo
        </Button>
      </div>
    </header>
  );
}
