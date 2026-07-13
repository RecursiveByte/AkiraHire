"use client";

import Header from "@/components/candidate/job/Header";
import Search from "@/components/candidate/job/Search";
import List from "@/components/candidate/job/List";

import { useJobs } from "@/hooks/candidate/useJobs";

export default function JobsPage() {
  const { jobs, isLoading, error, search, setSearch } = useJobs();

  return (
    <main className="flex h-full min-h-0 flex-col gap-8 py-8">
      <Header />

      <Search search={search} setSearch={setSearch} />

      <div className="flex-1 min-h-0">
        <List jobs={jobs} isLoading={isLoading} error={error} />
      </div>
    </main>
  );
}
