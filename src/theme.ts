import type { Player } from "./game/types";

/** Per-player text colour + glow, shared by the marks, status line and scores. */
export const MARK: Record<Player, string> = {
  X: "text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.9)]",
  O: "text-fuchsia-400 drop-shadow-[0_0_18px_rgba(232,121,249,0.9)]",
};
