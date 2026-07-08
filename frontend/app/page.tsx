"use client"

import Hero  from "@/components/home/Hero";
import  Navbar  from "@/components/home/Navbar";
import  FeaturesGrid  from "@/components/home/FeaturesGrid";
import  Footer  from "@/components/home/Footer";
import { useAuthStore } from "@/store/authStore";

export default function HomePage() {
  const { accessToken, user, isLoading } = useAuthStore();

  console.log(accessToken);
  console.log(user);
  console.log(isLoading);   

  return (
    <>
      <Navbar />
      <main className="grow pt-24 pb-12">
        <div className="max-w-300 mx-auto px-4 md:px-16">
          <Hero />
          <FeaturesGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}