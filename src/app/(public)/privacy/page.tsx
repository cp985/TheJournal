"use client";

import Link from "next/link";
import { useLanguage } from "@/context/maincontext"; // Modifica il path in base a dove risiede il tuo context

export default function PrivacyPage() {
  const { t } = useLanguage();
  const privacy = t.privacy;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-mono flex flex-col justify-between p-6 sm:p-12">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <header className="border-b border-zinc-800 pb-6 space-y-2">
          <Link 
            href="/login" 
            className="text-xs text-amber-500 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
          >
            {privacy.backToLogin}
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            {privacy.title}
          </h1>
          <p className="text-xs text-zinc-500">
            {privacy.lastUpdated}: {privacy.lastUpdatedDate}
          </p>
        </header>

        {/* Content */}
        <section className="space-y-6 text-sm leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {privacy.sections.introTitle}
            </h2>
            <p className="text-zinc-400">
              {privacy.sections.introBody}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {privacy.sections.collectedTitle}
            </h2>
            <p className="text-zinc-400">
              {privacy.sections.collectedBody}
            </p>
            <ul className="list-inside list-disc space-y-1 text-zinc-400 pl-2">
              {privacy.sections.collectedPoints.map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {privacy.sections.purposeTitle}
            </h2>
            <p className="text-zinc-400">
              {privacy.sections.purposeBody}
            </p>
            <ul className="list-inside list-disc space-y-1 text-zinc-400 pl-2">
              {privacy.sections.purposePoints.map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {privacy.sections.sharingTitle}
            </h2>
            <p className="text-zinc-400">
              {privacy.sections.sharingBody}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {privacy.sections.securityTitle}
            </h2>
            <p className="text-zinc-400">
              {privacy.sections.securityBody}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {privacy.sections.rightsTitle}
            </h2>
            <p className="text-zinc-400">
              {privacy.sections.rightsBody}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-100 border-l-2 border-amber-500 pl-3">
              {privacy.sections.contactTitle}
            </h2>
            <p className="text-zinc-400">
              {privacy.sections.contactBody}
            </p>
          </div>
        </section>

 
      </div>
    </main>
  );
}