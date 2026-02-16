import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

const faq: FaqItem[] = [
  {
    q: "Which browsers are supported?",
    a: "This updater works with Google Chrome (v89+), Microsoft Edge (v89+), Brave, and Opera. Safari, Firefox, and mobile browsers are not supported.",
  },
  {
    q: "My device is not detected. What should I do?",
    a: "First, check that your USB cable supports data transfer (some cables are charge-only). Try a different USB port. On Windows, you may need to install the CH340 or CP210x USB driver. On macOS/Linux, drivers are usually built-in. Make sure no other program is using the serial port.",
  },
  {
    q: "How do I enter update mode?",
    a: 'Most devices enter update mode automatically. If the update fails, try this: Hold the BOOT button, click "Update Now", wait for "Connecting..." message, then release BOOT. Some devices require holding BOOT and tapping RESET once.',
  },
  {
    q: "Update is stuck or very slow. What can I do?",
    a: "Try refreshing the page and reconnecting. Use a shorter USB cable or connect directly to your computer (avoid USB hubs). If the device appears stuck, unplug it, hold BOOT, plug it back in, then release BOOT.",
  },
  {
    q: "Will updating erase my settings?",
    a: "By default, your settings are preserved during updates. Only the firmware is updated, keeping your configuration intact.",
  },
  {
    q: "How often should I update?",
    a: "We recommend checking for updates monthly or when new features are announced. Updates include performance improvements, bug fixes, and new features for your VexaMiner.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 ">
            Common issues and solutions
          </p>
        </div>

        <div className="mt-12 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white ">
          {faq.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-gray-50 "
                >
                  <span className="text-base font-medium text-gray-900 ">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open && (
                  <div className="px-6 pb-4 text-sm leading-relaxed text-gray-600 ">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
