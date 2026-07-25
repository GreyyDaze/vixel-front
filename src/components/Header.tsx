import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function Header() {
  return (
    <header className="w-full px-8 lg:px-16 py-5 flex items-center justify-between max-w-[1320px] mx-auto">
      <a href="#" className="flex items-center gap-2">
        <Logo className="h-5 w-5" color="var(--color-brand-blue)" />
        <span className="text-sm font-medium tracking-tight text-text-primary">{COPY.header.brand}</span>
      </a>
      <nav className="hidden md:flex items-center gap-7">
        <a href="#how" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">{COPY.header.nav.howItWorks}</a>
        <a href="#situations" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">{COPY.header.nav.useCases}</a>
        <a href="#dashboard" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">{COPY.header.nav.dashboard}</a>
        <a href="#faq" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">{COPY.header.nav.faq}</a>
      </nav>
      <div className="flex items-center gap-4">
        <a href="#" className="text-[13px] text-text-primary hover:text-black transition-colors hidden sm:inline">{COPY.header.signIn}</a>
        <Button size="sm" className="px-4 py-2" render={<a href="#cta" />}>
          {COPY.header.bookDemo}
        </Button>
      </div>
    </header>
  );
}
