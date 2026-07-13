"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { Evaluation } from "@/types/recruiter/application/evaluatedApplication.types";

import EvaluatedApplicationRow from "./EvaluatedApplicationRow";
import EvaluatedApplicationRowSkeleton from "./EvaluatedApplicationRowSkeleton";

import { SKELETON_ROW_COUNT } from "@/constants/skeleton";

interface EvaluatedApplicationsTableProps {
  evaluatedApplications: Evaluation[];
  isLoading: boolean;
  onSelectEvaluation: (applicationId: number) => void;
  onDeleteEvaluation: (applicationId: number) => Promise<void>;
}

export default function EvaluatedApplicationsTable({
  evaluatedApplications,
  isLoading,
  onSelectEvaluation,
  onDeleteEvaluation,
}: EvaluatedApplicationsTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: evaluatedApplications.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 6,
  });

  if (!isLoading && evaluatedApplications.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
        No evaluated applications yet.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div
        ref={parentRef}
        className="lg:overflow-x-auto overflow-y-auto max-h-140"
      >
        <div className="lg:min-w-235">
          <div className="hidden lg:grid lg:grid-cols-[100px_100px_1fr_140px_140px_60px] lg:gap-4 px-6 py-4 border-b border-white/5 sticky top-0 bg-surface-container z-10">
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[100px]">
              App ID
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[100px]">
              Score
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[240px]">
              Reasoning
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[140px]">
              Status
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[140px]">
              Evaluated
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold text-right">
              Actions
            </span>
          </div>

          {isLoading ? (
            Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
              <EvaluatedApplicationRowSkeleton key={i} />
            ))
          ) : (
            <div
              className="relative w-full divide-y divide-white/5"
              style={{ height: `${virtualizer.getTotalSize()}px` }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const evaluatedApplication =
                  evaluatedApplications[virtualRow.index];

                return (
                  <div
                    key={evaluatedApplication.applicationId}
                    ref={virtualizer.measureElement}
                    data-index={virtualRow.index}
                    className="absolute top-0 left-0 w-full"
                    style={{
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <EvaluatedApplicationRow
                      evaluatedApplication={evaluatedApplication}
                      onClick={onSelectEvaluation}
                      onDelete={onDeleteEvaluation}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}