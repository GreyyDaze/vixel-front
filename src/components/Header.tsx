"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#how", label: COPY.header.nav.howItWorks },
    { href: "#situations", label: COPY.header.nav.useCases },
    { href: "#dashboard", label: COPY.header.nav.dashboard },
    { href: "#faq", label: COPY.header.nav.faq },
  ];

  return (
    <header className="w-full px-5 lg:px-16 py-5 max-w-[1320px] mx-auto">
      <div className="flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-5 w-5" color="var(--color-brand-blue)" />
          <span className="text-sm font-medium tracking-tight text-text-primary">{COPY.header.brand}</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" className="text-[13px] text-text-primary hover:text-black transition-colors hidden sm:inline">{COPY.header.signIn}</a>
          <Button size="sm" className="px-4 py-2" render={<a href="#cta" />}>
            {COPY.header.bookDemo}
          </Button>
          <button className="md:hidden p-1 text-text-primary" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        style={{
          maxHeight: open ? `${links.length * 48 + 48}px` : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="pt-4 pb-2 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-[13px] text-text-secondary hover:text-text-primary transition-colors py-2.5 px-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className="block text-[13px] text-text-primary py-2.5 px-1 sm:hidden"
            onClick={() => setOpen(false)}
          >
            {COPY.header.signIn}
          </a>
        </div>
      </div>
    </header>
  );
}
