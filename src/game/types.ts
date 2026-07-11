export type Player = "X" | "O";
export type SquareValue = Player | null;
export type Line = readonly [number, number, number];
export type WinResult = { player: Player; line: Line } | null;

export type Difficulty = "easy" | "medium" | "hard";

/**
 * "online" is the invite-link mode: not implemented yet, offered as coming soon.
 * Everything else must keep working without it.
 */
export type GameMode = "computer" | "local" | "online";
export type PlayableMode = Exclude<GameMode, "online">;
