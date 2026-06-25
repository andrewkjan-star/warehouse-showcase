import { createFileRoute } from "@tanstack/react-router";
import { Clock, LockKeyhole, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";

import logoAsset from "@/assets/ak-zamzam-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AK ZAMZAM LLC - Publishing Closed" },
      {
        name: "description",
        content:
          "AK ZAMZAM LLC has closed public publishing while the site is being updated.",
      },
      { property: "og:title", content: "AK ZAMZAM LLC - Publishing Closed" },
      {
        property: "og:description",
        content:
          "Public access to this warehouse showcase is currently closed while updates are in progress.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen bg-[oklch(0.96_0.018_84)] text-foreground">
      <section className="grid min-h-screen place-items-center px-5 py-10">
        <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-[oklch(0.75_0.045_78)] bg-background shadow-[0_24px_80px_oklch(0.22_0.04_55/0.16)]">
          <div className="grid md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-72 bg-[oklch(0.21_0.035_60)] p-8 text-primary-foreground">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,transparent_0_47%,oklch(0.88_0.13_82)_47%_53%,transparent_53%_100%),linear-gradient(0deg,transparent_0_47%,oklch(0.88_0.13_82)_47%_53%,transparent_53%_100%)] [background-size:72px_72px]" />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <img
                  src={logoAsset.url}
                  alt="AK ZAMZAM LLC"
                  className="h-16 w-fit rounded bg-background px-3 py-2 object-contain"
                />
                <div>
                  <div className="inline-flex items-center gap-2 border border-primary-foreground/25 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em]">
                    <LockKeyhole className="h-3.5 w-3.5 text-gold" />
                    Publishing closed
                  </div>
                  <h1 className="mt-5 font-serif text-4xl font-bold leading-tight md:text-5xl">
                    This site is not accepting public orders right now.
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-sm leading-7 text-muted-foreground">
                Public publishing for AK ZAMZAM LLC has been closed while the
                warehouse showcase is offline. Product browsing, sign-in, cart,
                and checkout actions are unavailable from this page.
              </p>

              <div className="mt-8 grid gap-3">
                <InfoRow
                  icon={<Clock className="h-4 w-4" />}
                  label="Status"
                  value="Temporarily closed"
                />
                <InfoRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location"
                  value="Brooklyn, NY warehouse"
                />
                <InfoRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Contact"
                  value="Please use your usual AK ZAMZAM LLC contact channel"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 border border-border bg-cream px-4 py-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
