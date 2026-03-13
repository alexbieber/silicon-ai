import type { Model } from "./api";

type Props = {
  prompt: string;
  setPrompt: (v: string) => void;
  negativePrompt: string;
  setNegativePrompt: (v: string) => void;
  model: string;
  setModel: (v: string) => void;
  steps: number;
  setSteps: (v: number) => void;
  cfgScale: number;
  setCfgScale: (v: number) => void;
  seed: number;
  setSeed: (v: number) => void;
  models: Model[];
  modelsLoading: boolean;
  generating: boolean;
  error: string | null;
  clearError: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function GenerateForm({
  prompt,
  setPrompt,
  negativePrompt,
  setNegativePrompt,
  model,
  setModel,
  steps,
  setSteps,
  cfgScale,
  setCfgScale,
  seed,
  setSeed,
  models,
  modelsLoading,
  generating,
  error,
  clearError,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="bg-surface border border-border rounded-[10px] p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
            Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A photo of an astronaut riding a horse on Mars..."
            className="w-full min-h-[100px] px-4 py-3 bg-[#0c0d0f] border border-border rounded-lg text-[#e6e8ec] font-sans text-base placeholder:text-muted focus:outline-none focus:border-accent resize-y transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="negative" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
            Negative prompt (optional)
          </label>
          <textarea
            id="negative"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="blurry, low quality..."
            rows={2}
            className="w-full px-4 py-3 bg-[#0c0d0f] border border-border rounded-lg text-[#e6e8ec] font-sans text-base placeholder:text-muted focus:outline-none focus:border-accent resize-y transition-colors"
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
            Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={modelsLoading}
            className="w-full px-4 py-2.5 bg-[#0c0d0f] border border-border rounded-lg text-[#e6e8ec] font-mono text-sm cursor-pointer focus:outline-none focus:border-accent disabled:opacity-60"
          >
            {models.length === 0 && <option value="">{modelsLoading ? "Loading…" : "Select model"}</option>}
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="steps" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Steps
            </label>
            <input
              id="steps"
              type="number"
              min={5}
              max={100}
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value) || 25)}
              className="w-full px-3 py-2 bg-[#0c0d0f] border border-border rounded-md text-[#e6e8ec] font-mono text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="cfg" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              CFG scale
            </label>
            <input
              id="cfg"
              type="number"
              min={1}
              max={9}
              step={0.5}
              value={cfgScale}
              onChange={(e) => setCfgScale(Number(e.target.value) || 7)}
              className="w-full px-3 py-2 bg-[#0c0d0f] border border-border rounded-md text-[#e6e8ec] font-mono text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="seed" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Seed (0 = random)
            </label>
            <input
              id="seed"
              type="number"
              min={0}
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[#0c0d0f] border border-border rounded-md text-[#e6e8ec] font-mono text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={generating || !prompt.trim()}
        className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-[#0c0d0f] font-semibold rounded-lg hover:bg-accent-dim disabled:opacity-60 disabled:cursor-not-allowed transition-colors active:scale-[0.98]"
      >
        {generating ? (
          <>
            <span className="inline-block w-5 h-5 border-2 border-[#0c0d0f]/30 border-t-[#0c0d0f] rounded-full animate-spin" />
            Generating…
          </>
        ) : (
          "Generate image"
        )}
      </button>

      {error && (
        <div
          role="alert"
          className="mt-4 p-3 rounded-lg bg-danger/10 border border-danger text-[#ff6b6b] text-sm flex items-center justify-between gap-2"
        >
          <span>{error}</span>
          <button type="button" onClick={clearError} className="text-danger hover:underline shrink-0">
            Dismiss
          </button>
        </div>
      )}
    </form>
  );
}
