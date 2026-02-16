import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

const faq: FaqItem[] = [
  {
    q: "Browser not supported",
    a: 'WebSerial is required and only works in Chromium-based browsers — Google Chrome (v89+) or Microsoft Edge. Safari, Firefox, and mobile browsers are not supported. Make sure you\'re on the latest desktop version.',
  },
  {
    q: "Device not detected",
    a: "Check that your USB cable supports data transfer (some cables are charge-only). Try a different USB port. On Windows, you may need to install the CH340 or CP210x USB driver. On macOS/Linux, drivers are usually built-in.",
  },
  {
    q: "Can't enter bootloader / flashing fails immediately",
    a: 'Hold the BOOT button on your board, then click "Install Firmware". You can release BOOT once you see "Connecting..." in the console. Some boards require you to hold BOOT and tap RESET (EN) once, then release BOOT.',
  },
  {
    q: "Flashing is stuck or very slow",
    a: "Try refreshing the page and reconnecting. If the device is stuck, unplug it, hold BOOT, plug it back in, then release BOOT to force bootloader mode. Try a shorter USB cable or a different port (avoid USB hubs).",
  },
  {
    q: "What does 'Erase Flash' do?",
    a: "Some board profiles are configured to erase the entire flash before writing. This removes all stored data (Wi-Fi credentials, settings, etc.) and ensures a clean install. It is not always needed — check your board's profile in the config.",
  },
  {
    q: "Multiple serial ports appear in the picker",
    a: "Unplug other serial devices (Arduino, other dev boards, etc.) before connecting. This prevents picking the wrong port. Your Vexaminer board usually shows up as CP210x, CH340, or ESP32-S3 in the list.",
  },
];

export default function Troubleshooting() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-400">
        Troubleshooting
      </h2>
      <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-800">
        {faq.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-zinc-200 transition hover:bg-zinc-900/50"
              >
                <span>{item.q}</span>
                <svg
                  className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {open && (
                <div className="px-4 pb-3 text-xs leading-relaxed text-zinc-400">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
