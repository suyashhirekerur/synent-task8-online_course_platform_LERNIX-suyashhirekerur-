import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="card h-80 flex flex-col animate-pulse">
      <div className="h-40 bg-[var(--color-surface-2)]"></div>
      <div className="p-4 flex flex-col flex-grow gap-3">
        <div className="h-6 w-3/4 bg-[var(--color-surface-2)] rounded"></div>
        <div className="h-4 w-1/2 bg-[var(--color-surface-2)] rounded mt-2"></div>
        <div className="mt-auto flex justify-between items-center">
          <div className="h-6 w-16 bg-[var(--color-surface-2)] rounded"></div>
          <div className="h-6 w-16 bg-[var(--color-surface-2)] rounded"></div>
        </div>
      </div>
    </div>
  );
}
