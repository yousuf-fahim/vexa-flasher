import { useEffect, useRef } from "react";

interface Props {
  lines: string[];
}

export default function LogConsole({ lines }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines.length]);

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-400">
        Console
      </h2>
      <div className="h-56 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-zinc-300">
        {lines.length === 0 && (
          <span className="text-zinc-600">
            Waiting for activity...
          </span>
        )}
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("ERROR")
                ? "text-red-400"
                : line.startsWith("✓")
                  ? "text-emerald-400"
                  : ""
            }
          >
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </section>
  );
}
