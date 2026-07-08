export function SocialAuthButtons() {
    return (
      <div className="grid grid-cols-2 gap-4">
        <button className="btn-social flex items-center justify-center gap-3 rounded-lg py-3 group cursor-pointer">
          <img
            alt="Google"
            className="h-5 w-5 opacity-80 transition-opacity group-hover:opacity-100"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsZ53LXMnTiNXSUtjW9NpqF7HEqu5PmcJoJOu1pxsh9h39xs-uWaJhL4vG90v3-sGBC7aDHW21vN4qh6vz-7l-dqA8tavXR2AXM2XGiNgY7YQWjB27CQWNFjBzk4rZIulLVgeNhQTsY6C52AuwjgvxyKWEdHMacNeBQdvoowVwa6bBCreHY9tkpXPDxBMiSZmXM2_EjLMLdcMxdOTEUln4rNfmNNhxMALKZZhvx9tXIIhB1lLj4I8qrM7LsMCaAORtqWorf8MPlA"
          />
          <span className="text-sm font-medium">Google</span>
        </button>
  
        <button className="btn-social flex items-center justify-center gap-3 rounded-lg py-3 group cursor-pointer">
          <svg
            className="h-5 w-5 text-white opacity-80 transition-opacity group-hover:opacity-100"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.61-4.041-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="text-sm font-medium">GitHub</span>
        </button>
      </div>
    );
  }