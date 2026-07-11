/** Drifting blurred blobs behind the card. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="animate-blob absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
      <div className="animate-blob absolute -right-16 -bottom-24 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl [animation-delay:-7s]" />
      <div className="animate-blob absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl [animation-delay:-14s]" />
    </div>
  );
}
