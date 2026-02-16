import Navigation from "./components/Navigation";
import ModernHero from "./components/ModernHero";
import ModernFlasher from "./components/ModernFlasher";
import FAQ from "./components/FAQ";
import { isWebSerialSupported } from "./lib/flashing/webSerial";
import { AlertCircle } from "lucide-react";

export default function App() {
  const supported = isWebSerialSupported();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <ModernHero />

      {!supported && (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 shrink-0 text-amber-600" />
              <div>
                <h3 className="text-lg font-semibold text-amber-900">
                  Browser nicht unterstützt
                </h3>
                <p className="mt-2 text-sm text-amber-800">
                  Dieser Updater benötigt <strong>Google Chrome 89+</strong> oder{" "}
                  <strong>Microsoft Edge 89+</strong> auf dem Desktop.
                </p>
                <p className="mt-2 text-sm text-amber-700">
                  Safari, Firefox und mobile Browser werden nicht unterstützt.
                </p>
                <a
                  href="https://www.google.com/chrome/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-500"
                >
                  Chrome herunterladen
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModernFlasher />
      {/* <Features /> */}
      <FAQ />

      <footer className="border-t border-gray-200 bg-gray-50 py-8 text-center text-sm text-gray-600">
        <div className="mx-auto max-w-7xl px-4">
          VexaMiner Updater · Powered by{" "}
          {/* <a
            href="https://github.com/espressif/esptool-js"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-orange-600 transition hover:text-orange-500"
          >
            esptool-js
          </a>{" "}
          ·{" "} */}
          <a
            href="https://vexa-miner.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-orange-600 transition hover:text-orange-500"
          >
            vexa-miner.com
          </a>
        </div>
      </footer>
    </div>
  );
}
