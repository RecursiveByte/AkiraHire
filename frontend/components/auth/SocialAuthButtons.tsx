"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const BASE_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export function SocialAuthButtons() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleGoogleLogin = () => {
    if (isRedirecting) return;

    setIsRedirecting(true);
    window.location.replace(`${BASE_API_URL}/auth/google/login`);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleLogin}
        disabled={isRedirecting}
        className="btn-social flex w-full items-center justify-center gap-3 rounded-lg py-3 group disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FcGoogle className="h-5 w-5" />
        <span className="text-sm font-medium">
          {isRedirecting ? "Redirecting..." : "Continue with Google"}
        </span>
      </button>
    </div>
  );
}
