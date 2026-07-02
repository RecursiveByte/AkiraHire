"use client"
import { usePathname } from "next/navigation";
import path from "path";

export default function Home() {

  const pathName = usePathname();
  console.log(pathName)
  return (
    <>
      <div className="bg-red-500">hello</div>
    </>
  );
}
