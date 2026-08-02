"use client";

import { useState } from "react";
import Link from "next/link";
import HeroVideoSection  from "@/components/layout/herovideo";
import LandingFeauture from "@/components/layout/landingFeauture";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FileText,
  GitFork,
  ShieldCheck,
  ArrowRight,

} from "lucide-react";

// Importa l'hook useLanguage (adegua il path se diverso)
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

function CaseThreadLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 500"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 6">
        <path d="M 120 90 Q 400 40 620 160 T 1080 120" />
        <path d="M 90 340 Q 320 260 560 320 T 1000 260" />
        <path d="M 240 60 L 560 320" />
        <path d="M 900 90 L 620 160" />
        <path d="M 1080 120 L 1000 260" />
      </g>
      <g fill="#dc2626">
        <circle cx="120" cy="90" r="3.5" />
        <circle cx="620" cy="160" r="3.5" />
        <circle cx="1080" cy="120" r="3.5" />
        <circle cx="90" cy="340" r="3.5" />
        <circle cx="560" cy="320" r="3.5" />
        <circle cx="1000" cy="260" r="3.5" />
        <circle cx="240" cy="60" r="3.5" />
        <circle cx="900" cy="90" r="3.5" />
      </g>
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isInProgress =
    status.toLowerCase().includes("analisi") ||
    status.toLowerCase().includes("review") ||
    status.toLowerCase().includes("corso");

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 border font-mono text-[11px] font-normal uppercase tracking-wider",
        isInProgress
          ? "border-amber-900/60 bg-red-950/30 text-amber-400"
          : "border-zinc-700 bg-zinc-900 text-zinc-400",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isInProgress
            ? "bg-amber-500 motion-safe:animate-pulse"
            : "bg-zinc-500",
        )}
      />
      {status}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function LandingPage() {

  // Recupera il dizionario della lingua corrente tramite useLanguage
  const { t } = useLanguage();
  const { hero, cases, cta } = t.landing;



  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-900 selection:text-white">
      <GrainOverlay />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-5 sm:px-6 lg:px-8"
      >  
       <HeroVideoSection />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:64px_64px] opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-amber-900/10 blur-[120px]"
        />
        <CaseThreadLines />

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 className="mt-6 max-w-3xl text-balance font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            {hero.titleStart}{" "}
            <span className="text-amber-500">{hero.titleHighlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
            {hero.description}
          </p>

      

   
        </div>

      </section>

      {/* FEATURE HIGHLIGHTS */}

      <LandingFeauture />

      {/* CASI IN EVIDENZA */}
      <section
        id="casi"
        className="relative border-t border-zinc-900 px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>{cases.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                {cases.title}
              </h2>
            </div>
            <p className="max-w-sm text-sm text-zinc-500">
              {cases.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {cases.items.map((item) => (
              <Card
                key={item.code}
                className="relative flex flex-col justify-between border-zinc-800 bg-zinc-900/40 transition-colors hover:border-amber-900/50 hover:bg-zinc-900/70"
              >
                <span className="absolute -top-3 right-5 -rotate-3 rounded-sm border border-zinc-700 bg-zinc-950 px-2 py-0.5 font-mono text-[10px] tracking-widest text-zinc-500">
                  {item.code}
                </span>

                <div>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-lg font-medium text-zinc-100">
                        {item.title}
                      </CardTitle>
                    </div>
                    <div className="pt-1">
                      <StatusBadge status={item.status} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </div>

                <CardFooter className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      {item.atti} {cases.documentsLabel}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GitFork className="h-3.5 w-3.5" />
                      {item.connessioni} {cases.connectionsLabel}
                    </span>
                  </div>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-sm text-xs font-medium text-amber-500 transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    {cases.openButton}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="border-zinc-700 bg-transparent text-zinc-300 hover:border-amber-800 hover:bg-red-950/20 hover:text-amber-400"
            >
              <Link href="/cases">
                {cases.viewAllButton}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="relative border-t border-zinc-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-amber-900/40 bg-gradient-to-b from-red-950/20 via-zinc-900/60 to-zinc-950 px-6 py-14 text-center sm:px-14">
            <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-amber-800/60" />
            <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-amber-800/60" />
            <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-amber-800/60" />
            <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-amber-800/60" />

            <Eyebrow className="mx-auto">{cta.eyebrow}</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-lg font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
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
                <Link href="/login?action=signup">{cta.registerButton}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-zinc-700 bg-transparent text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900 sm:w-auto"
              >
                <Link href="/login">{cta.loginButton}</Link>
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
