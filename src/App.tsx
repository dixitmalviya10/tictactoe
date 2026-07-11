import { useState } from "react";

import { Background } from "./components/Background";
import { Game } from "./components/Game";
import { ModeSelect } from "./components/ModeSelect";
import type { Difficulty, PlayableMode } from "./game/types";

function App() {
  const [mode, setMode] = useState<PlayableMode | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
      <Background />

      {mode ? (
        // Keyed by mode so switching modes starts a clean match and score line.
        <Game
          key={mode}
          mode={mode}
          difficulty={difficulty}
          onExit={() => setMode(null)}
        />
      ) : (
        <ModeSelect
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          onSelect={setMode}
        />
      )}
    </main>
  );
}

export default App;
