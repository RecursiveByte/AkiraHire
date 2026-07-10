export default function Loading() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border p-5 animate-pulse"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-muted" />

                        <div className="space-y-2">
                            <div className="h-5 w-56 rounded bg-muted" />

                            <div className="h-4 w-28 rounded bg-muted" />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="h-10 w-28 rounded bg-muted" />

                        <div className="h-10 w-20 rounded bg-muted" />
                    </div>
                </div>
            ))}
        </div>
    );
}