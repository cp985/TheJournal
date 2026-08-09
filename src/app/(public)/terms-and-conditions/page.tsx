"use client";

import Link from "next/link";
import { useLanguage } from "@/context/maincontext";

export default function TermsPage() {
  const { t } = useLanguage();
  const terms = t.terms;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-mono flex flex-col justify-between p-6 sm:p-12">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Header */}
        <header className="border-b border-zinc-800 pb-6 space-y-2">
          <Link
            href="/login"
            className="text-xs text-amber-500 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
          >
            {terms.backToLogin}
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            {terms.title}
          </h1>
          <p className="text-xs text-zinc-500">
            {terms.lastUpdated}: {terms.lastUpdatedDate}
          </p>
        </header>

        {/* Content */}
        <section className="space-y-6 text-sm leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {terms.sections.acceptanceTitle}
            </h2>
            <p className="text-zinc-400">{terms.sections.acceptanceBody}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {terms.sections.accountTitle}
            </h2>
            <p className="text-zinc-400">{terms.sections.accountBody}</p>
            <ul className="list-inside list-disc space-y-1 text-zinc-400 pl-2">
              {terms.sections.accountPoints.map(
                (point: string, idx: number) => (
                  <li key={idx}>{point}</li>
                ),
              )}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {terms.sections.usageTitle}
            </h2>
            <p className="text-zinc-400">{terms.sections.usageBody}</p>
            <ul className="list-inside list-disc space-y-1 text-zinc-400 pl-2">
              {terms.sections.usagePoints.map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {terms.sections.intellectualTitle}
            </h2>
            <p className="text-zinc-400">{terms.sections.intellectualBody}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {terms.sections.limitationTitle}
            </h2>
            <p className="text-zinc-400">{terms.sections.limitationBody}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {terms.sections.suspensionTitle}
            </h2>
            <p className="text-zinc-400">{terms.sections.suspensionBody}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {terms.sections.contactTitle}
            </h2>
            <p className="text-zinc-400">{terms.sections.contactBody}</p>
          </div>
        </section>

  
  
      </div>
    </main>
  );
}
