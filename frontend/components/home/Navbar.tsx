import Link from "next/link";
import Image from "next/image";
import { ASSETS } from "@/constants/assets";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur h-16 flex items-center border-b border-white/5">
      <div className="max-w-300 mx-auto w-full px-4 md:px-16 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-geist text-[20px] font-bold text-white flex items-center gap-2"
          >
            <Image
              src={ASSETS.AKIRA_LOGO}
              alt="AkiraHire"
              width={40}
              height={40}
              className="rounded-lg object-contain"
            />
            AkiraHire
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-white text-black px-4 py-1.5 rounded text-sm font-medium hover:bg-white/90 transition-all active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
