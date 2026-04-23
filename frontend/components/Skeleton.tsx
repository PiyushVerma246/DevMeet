"use client";

// ──────────────────────────────────────────────
// Skeleton primitives
// ──────────────────────────────────────────────

/** Base shimmer block */
export function SkeletonBlock({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`skeleton-block rounded-lg ${className}`}
      aria-hidden="true"
    />
  );
}

// ──────────────────────────────────────────────
// Project card skeleton  (grid layout)
// ──────────────────────────────────────────────
export function ProjectCardSkeleton() {
  return (
    <div className="glass-card p-6 flex flex-col gap-4 animate-pulse-soft">
      {/* hackathon badge placeholder */}
      <div className="self-end">
        <SkeletonBlock className="h-5 w-24 rounded-bl-xl" />
      </div>

      {/* Title */}
      <SkeletonBlock className="h-6 w-3/4 mt-1" />

      {/* Description lines */}
      <div className="space-y-2 flex-1">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />
      </div>

      {/* Roles Needed label */}
      <SkeletonBlock className="h-3 w-24" />
      <div className="flex gap-2 flex-wrap">
        <SkeletonBlock className="h-6 w-20 rounded" />
        <SkeletonBlock className="h-6 w-16 rounded" />
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-foreground/5">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <SkeletonBlock className="w-8 h-8 rounded-full" />
            <SkeletonBlock className="w-8 h-8 rounded-full" />
          </div>
          <SkeletonBlock className="h-3 w-16" />
        </div>
        <SkeletonBlock className="h-4 w-20" />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Explore / Talent Directory row skeleton
// ──────────────────────────────────────────────
export function ExploreRowSkeleton() {
  return (
    <div className="relative p-6 sm:p-8 rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] flex flex-col md:flex-row gap-6 md:gap-8 animate-pulse-soft">
      {/* Left column */}
      <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-56 md:border-r border-foreground/5 pb-6 md:pb-0 md:pr-8 gap-4">
        {/* Avatar */}
        <SkeletonBlock className="w-24 h-24 rounded-3xl" />
        {/* Name */}
        <SkeletonBlock className="h-5 w-32" />
        {/* Role */}
        <SkeletonBlock className="h-3 w-40" />
        {/* Location */}
        <SkeletonBlock className="h-3 w-28" />
        {/* Github */}
        <SkeletonBlock className="h-3 w-24" />
        {/* Badge */}
        <SkeletonBlock className="h-7 w-full max-w-[200px] rounded-md" />
      </div>

      {/* Right column */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Stats row */}
        <div className="flex items-start justify-between gap-4">
          <SkeletonBlock className="h-5 w-40" />
          <div className="flex gap-5">
            <SkeletonBlock className="h-8 w-16" />
            <SkeletonBlock className="h-8 w-16" />
            <SkeletonBlock className="h-8 w-16 hidden sm:block" />
          </div>
        </div>

        {/* Bio lines */}
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-4/5" />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mt-auto">
          <div className="flex flex-col gap-3">
            <SkeletonBlock className="h-3 w-20" />
            <div className="flex gap-2 flex-wrap">
              <SkeletonBlock className="h-6 w-16 rounded-md" />
              <SkeletonBlock className="h-6 w-20 rounded-md" />
              <SkeletonBlock className="h-6 w-14 rounded-md" />
              <SkeletonBlock className="h-6 w-18 rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-3 w-16" />
              <SkeletonBlock className="h-4 w-28" />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-3 w-full xl:w-auto">
            <SkeletonBlock className="h-9 flex-1 xl:w-32 rounded-xl" />
            <SkeletonBlock className="h-9 flex-1 xl:w-36 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Hackathon candidate card skeleton  (grid)
// ──────────────────────────────────────────────
export function HackathonCardSkeleton() {
  return (
    <div className="glass-card p-8 rounded-3xl border border-foreground/5 flex flex-col h-full relative overflow-hidden animate-pulse-soft">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <SkeletonBlock className="w-16 h-16 rounded-2xl" />
          <div className="space-y-2">
            <SkeletonBlock className="h-5 w-28" />
            <SkeletonBlock className="h-3 w-20" />
          </div>
        </div>
      </div>

      {/* Hackathon badge */}
      <SkeletonBlock className="h-11 w-full rounded-xl mb-6" />

      {/* Bio */}
      <div className="space-y-2 mb-8 flex-grow">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-3/4" />
      </div>

      {/* Skills */}
      <SkeletonBlock className="h-3 w-20 mb-3" />
      <div className="flex flex-wrap gap-2 mb-8">
        <SkeletonBlock className="h-7 w-16 rounded-lg" />
        <SkeletonBlock className="h-7 w-20 rounded-lg" />
        <SkeletonBlock className="h-7 w-14 rounded-lg" />
      </div>

      {/* CTA */}
      <div className="pt-6 border-t border-foreground/5">
        <SkeletonBlock className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
