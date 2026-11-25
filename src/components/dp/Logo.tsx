import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden>
      <defs>
        <linearGradient id="dpg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--wine)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="12" fill="url(#dpg)" />
      <path d="M14 11.5c0-1.2 1.3-1.9 2.3-1.3l12.6 8.5c.9.6.9 2 0 2.6l-12.6 8.5c-1 .6-2.3-.1-2.3-1.3z" fill="var(--primary-foreground)" />
      <path d="M17 15.5v9l6.5-4.5z" fill="var(--primary)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="DoraPlay — início">
      <LogoMark />
      <span className="font-display text-2xl">Dora<span className="text-primary">Play</span></span>
    </Link>
  );
}
