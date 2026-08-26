import { useEffect, useState } from "react";
import logo from "@/assets/mim-al-logo.png";
import { SPOTIFY_ARTIST_URL, BOOKING_MAILTO } from "@/lib/links";

const NAV_ITEMS = [
  { label: "Releases", href: "#releases" },
  { label: "About", href: "#about" },
  { label: "Tour", href: "#tour" },
  { label: "Services", href: "#services" },
  { label: "Follow", href: "#follow" },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // The overlay covers the page, so the document behind it must not scroll.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-foreground/[0.12] bg-background/[0.82] px-5 py-3 backdrop-blur-lg">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="" className="block h-[30px] w-[30px]" />
          <span className="font-hand text-base tracking-[0.06em]">MIM AL</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60 transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-foreground/25 transition-colors hover:border-foreground md:hidden"
        >
          <span className="block h-[1.5px] w-4 bg-foreground" />
          <span className="block h-[1.5px] w-4 bg-foreground" />
        </button>
      </header>

      {menuOpen && (
        <div className="mim-up fixed inset-0 z-[80] flex flex-col bg-background">
          <div className="flex items-center justify-between border-b border-foreground/[0.12] px-5 py-3">
            <span className="font-hand text-[15px] tracking-[0.06em]">MIM AL</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/25 text-[15px] transition-colors hover:bg-foreground hover:text-background"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col px-5 py-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[60px] items-center border-b border-foreground/10 font-hand text-2xl uppercase"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex gap-2 p-5">
            <a
              href={SPOTIFY_ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero flex-1"
            >
              Listen
            </a>
            <a href={BOOKING_MAILTO} className="btn-secondary flex-1">
              Booking
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SiteHeader;
