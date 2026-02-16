import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

const faq: FaqItem[] = [
  {
    q: "Welche Browser werden unterstützt?",
    a: "Dieser Updater funktioniert mit Google Chrome (v89+), Microsoft Edge (v89+), Brave und Opera. Safari, Firefox und mobile Browser werden nicht unterstützt.",
  },
  {
    q: "Mein Gerät wird nicht erkannt. Was soll ich tun?",
    a: "Überprüfe zunächst, ob dein USB-Kabel Datenübertragung unterstützt (manche Kabel dienen nur zum Laden). Probiere einen anderen USB-Port aus. Unter Windows musst du möglicherweise den CH340- oder CP210x-USB-Treiber installieren. Unter macOS/Linux sind Treiber normalerweise bereits integriert. Stelle sicher, dass kein anderes Programm den seriellen Port verwendet.",
  },
  {
    q: "Wie aktiviere ich den Update-Modus?",
    a: 'Die meisten Geräte wechseln automatisch in den Update-Modus. Falls das Update fehlschlägt, versuche Folgendes: Halte die BOOT-Taste gedrückt, klicke auf "Jetzt aktualisieren", warte auf die Meldung "Verbinde...", und lass dann BOOT los. Bei manchen Geräten musst du BOOT gedrückt halten und einmal kurz RESET drücken.',
  },
  {
    q: "Das Update hängt oder ist sehr langsam. Was kann ich tun?",
    a: "Versuche, die Seite zu aktualisieren und erneut zu verbinden. Verwende ein kürzeres USB-Kabel oder verbinde dich direkt mit deinem Computer (vermeide USB-Hubs). Falls das Gerät hängen bleibt, ziehe den Stecker, halte BOOT gedrückt, stecke es wieder ein und lass dann BOOT los.",
  },
  {
    q: "Werden beim Update meine Einstellungen gelöscht?",
    a: "Standardmäßig bleiben deine Einstellungen während Updates erhalten. Nur die Firmware wird aktualisiert, deine Konfiguration bleibt intakt.",
  },
  {
    q: "Wie oft sollte ich aktualisieren?",
    a: "Wir empfehlen, monatlich nach Updates zu suchen oder wenn neue Funktionen angekündigt werden. Updates enthalten Leistungsverbesserungen, Fehlerbehebungen und neue Funktionen für deinen VexaMiner.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Häufig gestellte Fragen
          </h2>
          <p className="mt-4 text-lg text-gray-600 ">
            Häufige Probleme und Lösungen
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
