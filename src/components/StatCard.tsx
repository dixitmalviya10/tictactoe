type StatCardProps = {
  label: string;
  value: number;
  active: boolean;
  tone: "cyan" | "fuchsia" | "slate";
};

const TONE: Record<StatCardProps["tone"], { text: string; active: string }> = {
  cyan: {
    text: "text-cyan-300",
    active:
      "border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_25px_-6px_rgba(34,211,238,0.9)]",
  },
  fuchsia: {
    text: "text-fuchsia-400",
    active:
      "border-fuchsia-400/60 bg-fuchsia-500/10 shadow-[0_0_25px_-6px_rgba(232,121,249,0.9)]",
  },
  slate: { text: "text-slate-300", active: "" },
};

export function StatCard({ label, value, active, tone }: StatCardProps) {
  const styles = TONE[tone];
  return (
    <div
      className={`rounded-2xl border px-2 py-2 text-center transition duration-300 ${
        active
          ? `scale-105 ${styles.active}`
          : "border-white/10 bg-white/5 opacity-70"
      }`}>
      <div className={`text-xl font-black ${styles.text}`}>{label}</div>
      <div className="text-xs font-semibold tracking-wider text-slate-400 tabular-nums">
        {value}
      </div>
    </div>
  );
}
