"use client"

import Hero  from "@/components/home/Hero";
import  Navbar  from "@/components/home/Navbar";
import  FeaturesGrid  from "@/components/home/FeaturesGrid";
import  Footer  from "@/components/home/Footer";

export default function HomePage() {

  return (
    <>
      <Navbar/>
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