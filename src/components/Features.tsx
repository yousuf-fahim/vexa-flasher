import { Zap, Download, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Flash firmware in under 60 seconds using optimized WebSerial protocol",
  },
  {
    icon: Download,
    title: "No Installation",
    description: "Works directly in your browser — no drivers or desktop software needed",
  },
  {
    icon: Shield,
    title: "Safe & Reliable",
    description: "Built on official esptool-js with automatic chip detection and verification",
  },
  {
    icon: Smartphone,
    title: "Easy to Use",
    description: "Simple 3-step process: select board, connect device, and flash",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Use VexaMiner Flasher?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 ">
            Professional-grade firmware flashing made simple and accessible
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:border-orange-300 hover:shadow-md "
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600 ">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 ">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 ">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
