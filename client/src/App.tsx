import { useState, useCallback } from "react";
import { useModels, useGenerate } from "./api";
import { GenerateForm } from "./GenerateForm";
import { ResultPanel } from "./ResultPanel";
import logoPng from "./assets/logo.png";

function App() {
  const { models, loading: modelsLoading } = useModels();
  const { generate, loading: generating, result, error, clearError } = useGenerate();
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [model, setModel] = useState("");
  const [steps, setSteps] = useState(25);
  const [cfgScale, setCfgScale] = useState(7);
  const [seed, setSeed] = useState(0);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!prompt.trim()) return;
      generate({
        prompt: prompt.trim(),
        negativePrompt: negativePrompt.trim(),
        model: model || undefined,
        steps,
        cfg_scale: cfgScale,
        seed,
      });
    },
    [prompt, negativePrompt, model, steps, cfgScale, seed, generate]
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="flex items-center gap-3 mb-6">
        <div className="flex shrink-0 items-center justify-center w-9 h-9">
          <img src={logoPng} alt="Silicon AI" className="w-full h-full object-contain object-center block" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <h1 className="font-mono font-semibold text-accent text-xl tracking-wide leading-tight">Silicon AI</h1>
          <p className="text-muted text-[0.95rem] mt-0.5 leading-tight">Text-to-image. No sign-up required.</p>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <GenerateForm
            prompt={prompt}
            setPrompt={setPrompt}
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            model={model}
            setModel={setModel}
            steps={steps}
            setSteps={setSteps}
            cfgScale={cfgScale}
            setCfgScale={setCfgScale}
            seed={seed}
            setSeed={setSeed}
            models={models}
            modelsLoading={modelsLoading}
            generating={generating}
            error={error}
            clearError={clearError}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="lg:sticky lg:top-8">
          <ResultPanel result={result} prompt={prompt} />
        </div>
      </div>
    </div>
  );
}

export default App;
