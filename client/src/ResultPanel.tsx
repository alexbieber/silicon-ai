import { useMemo, useEffect } from "react";
import type { GenerateResult } from "./api";

type Props = {
  result: GenerateResult | null;
  prompt: string;
};

function slugFromPrompt(prompt: string): string {
  return prompt
    .slice(0, 40)
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase() || "image";
}

export function ResultPanel({ result, prompt }: Props) {
  const url = useMemo(() => {
    if (!result?.image) return null;
    const binary = Uint8Array.from(atob(result.image), (c) => c.charCodeAt(0));
    const blob = new Blob([binary], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
  }, [result?.image]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  if (!result) {
    return (
      <div className="bg-surface border border-border rounded-[10px] p-6">
        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-3">Output</label>
        <div className="aspect-square bg-[#0c0d0f] border border-border rounded-[10px] flex items-center justify-center text-muted text-sm min-h-[320px]">
          Generated image will appear here
        </div>
      </div>
    );
  }

  const filename = `${slugFromPrompt(prompt)}-${Date.now()}.jpg`;

  return (
    <div className="bg-surface border border-border rounded-[10px] p-6">
      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-3">Output</label>
      <div className="aspect-square bg-[#0c0d0f] border border-border rounded-[10px] overflow-hidden flex items-center justify-center min-h-[320px]">
        {url && <img src={url} alt="Generated" className="max-w-full max-h-full object-contain" />}
      </div>
      {(result.seed != null || result.finishReason) && (
        <p className="mt-3 font-mono text-xs text-muted">
          {result.seed != null && `Seed: ${result.seed}`}
          {result.seed != null && result.finishReason && " · "}
          {result.finishReason}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {url && (
          <a
            href={url}
            download={filename}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-surface border border-border text-[#e6e8ec] font-semibold rounded-lg hover:bg-border transition-colors"
          >
            Download image
          </a>
        )}
      </div>
    </div>
  );
}
