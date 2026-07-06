import Link from "next/link";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur h-14 flex items-center border-b border-white/5">
      <div className="max-w-300 mx-auto w-full px-4 md:px-16 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-geist text-[20px] font-bold text-white flex items-center gap-2">
            <span className="msi text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
              dataset
            </span>
            AkiraHire
          </Link>

          <div className="hidden md:flex gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="#login" className="text-white/70 hover:text-white transition-colors text-sm">
            Login
          </a>
          <button className="bg-white text-black px-4 py-1.5 rounded text-sm font-medium hover:bg-white/90 transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}