import { Zap, Shield, Clock } from "lucide-react";

export default function ModernHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Gradient orbs for depth */}
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-orange-500 opacity-10 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-orange-600 opacity-10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Flash Your Board
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Install firmware on your VexaMiner boards directly from your browser.
            No desktop tools required — flash in under 1 minute.
          </p>

          {/* Feature pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            
            <div className="flex items-center gap-2 rounded-full border border-gray-600 bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-sm">
              <Clock className="h-4 w-4" />
              WebSerial
            </div>
            <div className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 backdrop-blur-sm">
              <Zap className="h-4 w-4" />
              Under 1 Minute
            </div>
            <div className="flex items-center gap-2 rounded-full border border-gray-600 bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-sm">
              <Shield className="h-4 w-4" />
              Secure & Fast
            </div>
          </div>

          <p className="mt-6 text-sm text-amber-400">
            ⚠ Chrome or Edge Browser required
          </p>
        </div>
      </div>
    </div>
  );
}
