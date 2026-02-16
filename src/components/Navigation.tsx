import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="VexaMiner"
              className="h-10 w-auto sm:h-12"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
            >
              FAQ
            </a>
            <a
              href="https://vexa-miner.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-orange-500"
            >
              SHOP
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                Features
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                FAQ
              </a>
              <a
                href="https://vexa-miner.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-orange-600 px-4 py-2 text-center text-sm font-medium text-white"
              >
                SHOP
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
