"use client"

import { useAuthStore } from "@/store/authStore";

export default function WelcomeHeader() {

    const {user} = useAuthStore()  

    return (
      <section>
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-geist text-headline-lg text-primary tracking-tight">
              Welcome back, {user?.name || "user"}
            </h2>
            <p className="text-on-surface-variant mt-2 max-w-lg">
            Review your recent applications, explore jobs, and keep your profile up to date to improve your chances of getting hired.
            </p>
          </div>
          <button className="btn-premium px-6 py-3 rounded-xl font-bold text-body-md">
            Complete Profile
          </button>
        </div>
      </section>
    );
  }