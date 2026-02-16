export default function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-zinc-800/50 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Circuit board pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="#f97627" />
              <circle cx="80" cy="80" r="2" fill="#f97627" />
              <line
                x1="20"
                y1="20"
                x2="80"
                y2="20"
                stroke="#f97627"
                strokeWidth="0.5"
              />
              <line
                x1="80"
                y1="20"
                x2="80"
                y2="80"
                stroke="#f97627"
                strokeWidth="0.5"
              />
              <circle cx="50" cy="50" r="3" fill="#f97627" />
              <line
                x1="20"
                y1="20"
                x2="50"
                y2="50"
                stroke="#f97627"
                strokeWidth="0.5"
              />
              <line
                x1="50"
                y1="50"
                x2="80"
                y2="80"
                stroke="#f97627"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Flash Your Board
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
          A flasher utility for Vexaminer ESP boards. Flash firmware in under 1 minute
          directly from your browser — no desktop tools required.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500">
          <span className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1">
            ESP32
          </span>
          <span className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1">
            ESP32-S3
          </span>
          <span className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1">
            ESP32-C3
          </span>
          <span className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1">
            WebSerial
          </span>
        </div>
        <p className="mt-4 text-xs text-amber-400/80">
          ⚠ This tool is not supported on Safari browser
        </p>
      </div>
    </div>
  );
}
