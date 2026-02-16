export default function Header() {
  return (
    <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <img
          src="/logo.svg"
          alt="VexaMiner"
          className="h-10 w-auto"
        />
        <a
          href="https://vexa-miner.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-zinc-400 transition hover:text-orange-400"
        >
          vexa-miner.com &rarr;
        </a>
      </div>
    </header>
  );
}
