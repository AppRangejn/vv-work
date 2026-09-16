function JobCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-2xs animate-pulse"
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="h-5 w-24 rounded-md bg-zinc-200" />
          <div className="h-6 w-24 rounded-md bg-zinc-200" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-5 w-4/5 rounded-md bg-zinc-200" />
          <div className="h-5 w-1/2 rounded-md bg-zinc-200" />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-3.5 w-20 rounded bg-zinc-200" />
          <span className="text-zinc-200">•</span>
          <div className="h-3.5 w-28 rounded bg-zinc-200" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-zinc-100" />
          <div className="h-3 w-5/6 rounded bg-zinc-100" />
          <div className="h-3 w-2/3 rounded bg-zinc-100" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
        <div className="h-3.5 w-24 rounded bg-zinc-200" />
        <div className="h-3.5 w-20 rounded bg-zinc-200" />
      </div>
    </div>
  );
}

export default JobCardSkeleton;