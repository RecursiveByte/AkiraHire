import Link from "next/link";

export function AuthFooter() {
  return (
    <div className=" text-center">
      <p className="text-sm text-white/60">
        <Link
          href="/forgot-password"
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          Forgot Password?
        </Link>
      </p>
      <p className="mt-4 text-sm text-white/60">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-white underline-offset-4 hover:underline">
          Create Account
        </Link>
      </p>
      <p className="mt-4 text-xs text-white/60">
        Are you an Administrator?{" "}
        <Link href="/login/admin" className="font-semibold text-white underline-offset-4 hover:underline">
          Admin Login
        </Link>
      </p>
    </div>
  );
}