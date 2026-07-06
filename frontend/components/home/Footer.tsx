import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs text-white/50 md:px-8">
        <p>© 2026 AkiraHire. All rights reserved.</p>

        <Link
          href="/"
          className="transition-colors duration-200 hover:text-white"
        >
          AI-Powered Recruitment.
        </Link>
      </div>
    </footer>
  );
}