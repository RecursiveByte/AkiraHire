import { BriefcaseBusiness } from "lucide-react";

export default function Empty() {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <BriefcaseBusiness className="h-8 w-8 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-semibold">
                No Jobs Available
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                There are currently no job openings available. Please check back
                later for new opportunities.
            </p>
        </div>
    );
}