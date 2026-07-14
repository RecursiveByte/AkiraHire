import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-bold tracking-tight text-white">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-semibold text-white">
          Looks like we can't find this page
        </h2>

        <p className="mt-3 text-sm leading-6 text-neutral-400">
          The page you are looking for doesn't exist. Please check the URL
          and make sure you typed it correctly.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  );
}