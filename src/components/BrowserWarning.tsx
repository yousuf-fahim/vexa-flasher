/**
 * Full-page warning shown when WebSerial is not available.
 */
export default function BrowserWarning() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-950/60 text-3xl">
        ⚠
      </div>
      <h2 className="mb-2 text-xl font-semibold text-white">
        Unsupported Browser
      </h2>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-400">
        The Vexaminer Web Flasher uses the{" "}
        <strong className="text-zinc-200">Web Serial API</strong> which is only
        available in{" "}
        <strong className="text-zinc-200">Google Chrome 89+</strong> and{" "}
        <strong className="text-zinc-200">Microsoft Edge 89+</strong> on
        desktop.
      </p>
      <p className="mt-3 text-sm text-zinc-500">
        Safari, Firefox, and mobile browsers are not supported.
      </p>
      <a
        href="https://www.google.com/chrome/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-500"
      >
        Download Chrome
      </a>
    </div>
  );
}
