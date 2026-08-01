
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PillarsSection } from "@/components/layout/aboutPillarsCard";

import {
  Search,

  ShieldCheck,
  ArrowRight,

} from "lucide-react";

import { useLanguage } from "@/context/maincontext";


// ---------------------------------------------------------------------------
// Componenti UI ausiliari
// ---------------------------------------------------------------------------

function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-amber-900/50 bg-red-950/20 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-500",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 motion-safe:animate-pulse" />
      {children}
    </div>
  );
}

function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-soft-light"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Main About Page Component
// ---------------------------------------------------------------------------

export default function AboutPage() {
  const { t } = useLanguage();
  const { hero, mission, cta } = t.about;

  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-900 selection:text-white">
      <GrainOverlay />

      {/* HERO SECTION */}
      <section className="relative flex flex-col justify-center overflow-hidden px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:64px_64px] opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-red-950/10 blur-[100px]"
        />

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 className="mt-6 max-w-3xl text-balance font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            {hero.titleStart} <br />
            <span className="text-amber-500">{hero.titleHighlight}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
            {hero.description}
          </p>
        </div>
      </section>

      {/* MISSION & METHODOLOGY */}
      <section className="relative border-t border-zinc-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left Column: Text */}
            <div className="flex flex-col justify-center">
              <Eyebrow className="w-fit">{mission.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                {mission.title}
              </h2>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-zinc-400">
                <p>{mission.p1}</p>
                <p>{mission.p2}</p>
                <p>{mission.p3}</p>
              </div>
            </div>

            {/* Right Column: Visual Network Graph Simulation */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-950/20 via-amber-950/20 to-transparent blur-[80px]" />

              <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-md">
                {/* Header della Scheda Grafico */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                    <span className="font-mono text-xs tracking-wider uppercase text-zinc-400">
                      {mission.graphHeader}
                    </span>
                  </div>
                  <span className="rounded bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-500 border border-zinc-800">
                    {mission.graphNodesLabel}
                  </span>
                </div>

                {/* Area del Grafico Interattivo / Visivo */}
                <div className="relative my-6 h-64 w-full rounded-lg border border-zinc-900 bg-zinc-900/30 p-4 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                  <svg className="absolute inset-0 h-full w-full stroke-amber-500/30" strokeWidth="1.5">
                    <line x1="25%" y1="30%" x2="50%" y2="50%" className="stroke-red-500/50" strokeDasharray="4 4" />
                    <line x1="50%" y1="50%" x2="80%" y2="25%" strokeDasharray="2 2" />
                    <line x1="50%" y1="50%" x2="65%" y2="75%" />
                  </svg>

                  {/* Nodo 1 */}
                  <div className="absolute top-[25%] left-[20%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="font-mono text-[11px] text-zinc-300">{mission.nodeEvidence}</span>
                  </div>

                  {/* Nodo Centrale */}
                  <div className="absolute top-[50%] left-[50%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl border border-amber-500/50 bg-amber-950/30 px-4 py-2.5 shadow-xl backdrop-blur-sm">
                    <span className="font-mono text-xs font-semibold text-amber-400">
                      {mission.nodeCentral}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">{mission.nodeCentralDate}</span>
                  </div>

                  {/* Nodo 3 */}
                  <div className="absolute top-[25%] right-[20%] flex translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="font-mono text-[11px] text-zinc-300">{mission.nodeSignal}</span>
                  </div>

                  {/* Nodo 4 */}
                  <div className="absolute bottom-[20%] right-[30%] flex translate-x-1/2 translate-y-1/2 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[11px] text-zinc-300">{mission.nodeAct}</span>
                  </div>
                </div>

                {/* Footer con Metriche del Grafo */}
                <div className="grid grid-cols-3 gap-2 border-t border-zinc-800/80 pt-4 text-center font-mono">
                  <div>
                    <div className="text-[10px] text-zinc-500">{mission.statDocuments}</div>
                    <div className="text-sm font-semibold text-zinc-200">1,420</div>
                  </div>
                  <div className="border-x border-zinc-800">
                    <div className="text-[10px] text-zinc-500">{mission.statConnections}</div>
                    <div className="text-sm font-semibold text-amber-500">88.4%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500">{mission.statSources}</div>
                    <div className="text-sm font-semibold text-emerald-500">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS / I NOSTRI VALORI */}
      <PillarsSection />

      {/* CALL TO ACTION */}
      <section className="relative border-t border-zinc-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-amber-900/40 bg-gradient-to-b from-red-950/20 via-zinc-900/60 to-zinc-950 px-6 py-14 text-center sm:px-14">
            <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-amber-800/60" />
            <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-amber-800/60" />
            <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-amber-800/60" />
            <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-amber-800/60" />

            <Search className="mx-auto h-8 w-8 text-amber-500" strokeWidth={1.5} />
            <h2 className="mx-auto mt-6 max-w-lg font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-zinc-400 sm:text-base">
              {cta.description}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-500 sm:w-auto"
              >
                <Link href="/casi">
                  {cta.archiveButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-zinc-700 bg-transparent text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900 sm:w-auto"
              >
                <Link href="/contatti">{cta.contactButton}</Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-500">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-600" />
              {cta.securityNotice}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}