"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/maincontext";
export default function ContactPage() {
  const { t } = useLanguage();
  const contact = t.contact;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    // Simulazione di invio chiamata API
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-mono flex flex-col justify-between p-6 sm:p-12">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <header className="border-b border-zinc-800 pb-6 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <Link
              href="/login"
              className="text-amber-500 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
            >
              {contact.backToLogin}
            </Link>
            <span className="text-amber-500/80 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              {contact.systemStatus}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 pt-2">
            {contact.title}
          </h1>
          <p className="text-xs text-zinc-400">{contact.subtitle}</p>
        </header>

        {/* Layout a due colonne */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form principale (2 Colonne) */}
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                {contact.form.nameLabel}
              </label>
              <input
                type="text"
                required
                placeholder={contact.form.namePlaceholder}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                {contact.form.emailLabel}
              </label>
              <input
                type="email"
                required
                placeholder={contact.form.emailPlaceholder}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                {contact.form.subjectLabel}
              </label>
              <select
                required
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded px-3 py-2 text-sm text-zinc-300 outline-none transition-all"
              >
                <option value="">{contact.form.subjectPlaceholder}</option>
                <option value="general">{contact.form.subjects.general}</option>
                <option value="bug">{contact.form.subjects.bug}</option>
                <option value="security">
                  {contact.form.subjects.security}
                </option>
                <option value="account">{contact.form.subjects.account}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                {contact.form.messageLabel}
              </label>
              <textarea
                rows={5}
                required
                placeholder={contact.form.messagePlaceholder}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all resize-none"
              />
            </div>

            {/* Banner dei risultati */}
            {status === "success" && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded text-xs text-emerald-500">
                ✓ {contact.form.successMessage}
              </div>
            )}

            {status === "error" && (
              <div className="p-3 bg-amber-950/40 border border-amber-800 rounded text-xs text-amber-500">
                ⚠ {contact.form.errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-800 disabled:text-zinc-400 text-zinc-100 font-bold py-2.5 px-4 rounded text-xs tracking-wider transition-colors"
            >
              {isSubmitting
                ? contact.form.submitting
                : contact.form.submitButton}
            </button>
          </form>

          {/* Info Box Cyber / Informazioni aggiuntive (1 Colonna) */}
          <aside className="space-y-6 border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-6">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-amber-500 tracking-wider">
                {contact.infoBox.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {contact.infoBox.responseTime}
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {contact.infoBox.encryptionNote}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-800/60">
              <span className="block text-[10px] text-zinc-400 font-bold">
                {contact.infoBox.directEmail}
              </span>
              <a
                href="mailto:support@thejournal.dev"
                className="text-xs text-amber-500 hover:text-amber-300 transition-colors break-all"
              >
                support@thejournal.dev
              </a>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-800/60">
              <span className="block text-[10px] text-zinc-400 font-bold">
                {contact.infoBox.pgpKey}
              </span>
              <code className="block text-[10px] bg-zinc-900 border border-zinc-800 p-2 rounded text-zinc-400 break-all">
                4A89 98F2 B011 C765 89AA
              </code>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
