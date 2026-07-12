"use client";

import { FcGoogle } from "react-icons/fc";

const BASE_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export function SocialAuthButtons() {
  const handleGoogleLogin = () =>
    (window.location.href = `${BASE_API_URL}/auth/google/login`);

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleLogin}
        className="btn-social flex w-full items-center justify-center gap-3 rounded-lg py-3 group"
      >
        <FcGoogle className="h-5 w-5" />
        <span className="text-sm font-medium">Continue with Google</span>
      </button>
    </div>
  );
}
