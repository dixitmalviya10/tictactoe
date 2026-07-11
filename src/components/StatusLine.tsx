type StatusLineProps = {
  text: string;
  /** Colour classes for the current outcome. */
  tone: string;
};

export function StatusLine({ text, tone }: StatusLineProps) {
  return (
    <p
      key={text}
      aria-live="polite"
      className={`animate-rise mt-2 text-center text-sm font-semibold tracking-widest uppercase ${tone}`}>
      {text}
    </p>
  );
}
