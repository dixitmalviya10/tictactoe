import type { Difficulty, PlayableMode } from "../game/types";
import { Title } from "./Title";

const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
];

type ModeSelectProps = {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onSelect: (mode: PlayableMode) => void;
};

export function ModeSelect({
  difficulty,
  onDifficultyChange,
  onSelect,
}: ModeSelectProps) {
  return (
    <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
      <Title />
      <p className="animate-rise mt-2 text-center text-sm font-semibold tracking-widest text-slate-400 uppercase">
        Choose a mode
      </p>

      <div className="mt-6 space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <button
            type="button"
            onClick={() => onSelect("computer")}
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-3 font-bold tracking-widest text-white uppercase transition duration-300 hover:shadow-[0_0_35px_-6px_rgba(217,70,239,0.9)] hover:brightness-110 active:scale-95">
            Play vs Computer
          </button>

          <div
            role="group"
            aria-label="Computer difficulty"
            className="mt-3 grid grid-cols-3 gap-2">
            {DIFFICULTIES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={difficulty === id}
                onClick={() => onDifficultyChange(id)}
                className={`cursor-pointer rounded-xl border px-2 py-1.5 text-xs font-bold tracking-wider uppercase transition duration-300 ${
                  difficulty === id
                    ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-300 shadow-[0_0_25px_-6px_rgba(34,211,238,0.9)]"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-slate-200"
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect("local")}
          className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition duration-300 hover:border-white/30 hover:bg-white/10 active:scale-95">
          <span className="block font-bold tracking-widest text-slate-100 uppercase">
            2 Players
          </span>
          <span className="mt-0.5 block text-xs font-semibold tracking-wider text-slate-400">
            Take turns on this device
          </span>
        </button>

        <button
          type="button"
          disabled
          aria-describedby="online-soon"
          className="w-full cursor-not-allowed rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-3 text-left opacity-70">
          <span className="flex items-center justify-between gap-2">
            <span className="font-bold tracking-widest text-slate-300 uppercase">
              Play Online
            </span>
            <span
              id="online-soon"
              className="rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-fuchsia-300 uppercase">
              Coming soon
            </span>
          </span>
          <span className="mt-0.5 block text-xs font-semibold tracking-wider text-slate-500">
            Invite a friend by link and play together
          </span>
        </button>
      </div>
    </div>
  );
}
