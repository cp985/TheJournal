"use client";

import Link from "next/link";
import { useLanguage } from "@/context/maincontext";
import { Sequence, Step } from "@/components/ui/sequence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCode, Globe, ShieldCheck, Cpu, ArrowRight } from "lucide-react";

export default function OsintMethodologyPage() {
  const { t } = useLanguage();
  const { hero, pipeline, standards, cta } = t.osint;

  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 antialiased px-4 py-20 sm:px-6 lg:px-8">
      {/* HERO SECTION */}
      <section className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-sm border border-amber-900/50 bg-red-950/20 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-500">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          {hero.eyebrow}
        </div>

        <h1 className="mt-6 font-serif text-4xl font-semibold text-zinc-50 sm:text-5xl md:text-6xl">
          {hero.titleStart} <span className="text-amber-500">{hero.titleHighlight}</span>
        </h1>

        <p className="mt-6 text-base text-zinc-400 sm:text-lg max-w-2xl mx-auto">
          {hero.description}
        </p>
      </section>

      {/* PIPELINE DI ANALISI (WORKFLOW) */}
      <section className="mx-auto max-w-4xl mt-20 border-t border-zinc-900 pt-16">
        <div className="mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
            {pipeline.eyebrow}
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-zinc-100">
            {pipeline.title}
          </h2>
        </div>

        <Sequence>
          <Step title={pipeline.step1Title} subtitle="ETL & OCR Processing">
            <p className="text-sm leading-relaxed text-zinc-300">
              {pipeline.step1Desc}
            </p>
          </Step>

          <Step title={pipeline.step2Title} subtitle="Cross-referencing & Triangulation">
            <p className="text-sm leading-relaxed text-zinc-300">
              {pipeline.step2Desc}
            </p>
          </Step>

          <Step title={pipeline.step3Title} subtitle="Knowledge Graph Generation">
            <p className="text-sm leading-relaxed text-zinc-300">
              {pipeline.step3Desc}
            </p>
          </Step>
        </Sequence>
      </section>

      {/* PRINCIPI E STANDARDS */}
      <section className="mx-auto max-w-5xl mt-24 border-t border-zinc-900 pt-16">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
            {standards.eyebrow}
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-zinc-100">
            {standards.title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {standards.items.map((item, idx) => {
            const icons = [FileCode, Globe, ShieldCheck];
            const Icon = icons[idx % icons.length];
            return (
              <Card key={item.title} className="border-zinc-800 bg-zinc-900/40">
                <CardHeader>
                  <Icon className="h-6 w-6 text-amber-500 mb-2" />
                  <CardTitle className="text-lg text-zinc-100">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="mx-auto max-w-3xl mt-24 text-center border-t border-zinc-900 pt-16">
        <h2 className="font-serif text-2xl font-semibold text-zinc-100">
          {cta.title}
        </h2>
        <p className="mt-2 text-sm text-zinc-400">{cta.description}</p>
        <div className="mt-6">
          <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
            <Link href="/casi">
              {cta.button} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}