export function AuthFooter() {
    return (
      <div className="pt-2 text-center">
        <p className="text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-semibold text-white underline-offset-4 hover:underline">
            Create Account
          </a>
        </p>
        <p className="mt-4 text-xs text-white/60">
          Are you an Administrator?{" "}
          <a href="#" className="font-semibold text-white underline-offset-4 hover:underline">
            Admin Login
          </a>
        </p>
      </div>
    );
  }