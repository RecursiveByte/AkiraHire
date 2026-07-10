
import Header from "@/components/candidate/job/Header";
import Search from "@/components/candidate/job/Search";
import List from "@/components/candidate/job/List";

export default function JobsPage() {
    return (
        <main className="flex h-full min-h-0 flex-col gap-8 py-8">
            <Header />

            <Search />


            <div className="flex-1 min-h-0">
                <List />
            </div>
        </main>
    );
}