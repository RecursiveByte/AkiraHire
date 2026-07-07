"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Form } from "@/types/form.types";
import FormRow from "./FormRow";

interface FormsTableProps {
  forms: Form[];
  onSelectForm: (formId: number) => void;
  onDeleteForm: (formId: number) => void;
  onPublishForm: (formId: number) => void;
}

export default function FormsTable({ forms, onSelectForm, onDeleteForm, onPublishForm }: FormsTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: forms.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 6,
  });

  if (forms.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
        No forms to show yet.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div ref={parentRef} className="lg:overflow-x-auto overflow-y-auto max-h-140">
        <div className="lg:min-w-225">
          <div className="hidden lg:grid lg:grid-cols-[110px_110px_1fr_110px_190px] lg:gap-4 px-6 py-4 border-b border-white/5  sticky top-0 bg-surface-container z-10">
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-27.5">
              Form ID
            </span>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-27.5">
              Job ID
            </span>
            <span className="text-[11px]  uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-55">
              Form Title
            </span>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-27.5">
              Status
            </span>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold text-center lg:min-w-47.5">
              Actions
            </span>
          </div>

          <div
            className="relative w-full divide-y divide-white/5 "
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const form = forms[virtualRow.index];
              return (
                <div
                  key={form.formId}
                  ref={virtualizer.measureElement}
                  data-index={virtualRow.index}
                  className="absolute top-0 left-0 w-full"
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  <FormRow
                    form={form}
                    onClick={onSelectForm}
                    onDelete={onDeleteForm}
                    onPublish={onPublishForm}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}