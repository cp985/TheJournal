"use client";

import { FaGithub as Github, FaXTwitter as Twitter } from "react-icons/fa6";
import Link from "next/link";
import { useLanguage } from "@/context/maincontext";
import { Mail, Network } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const { footer } = t.landing;
  return (
    /* FOOTER */
    <footer className="border-t border-zinc-900 px-4 py-10 sm:px-6 lg:px-8 bg-[#09090b]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900">
              <Network className="h-3.5 w-3.5 text-amber-500" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-[0.15em] text-zinc-400">
              THE JOURNAL
            </span>
          </Link>

          <div className="flex items-center gap-5 text-sm text-zinc-500">
            <Link href="/privacy" className="hover:text-zinc-300">
              {footer.privacy}
            </Link>
            <Link href="/termini" className="hover:text-zinc-300">
              {footer.terms}
            </Link>
            <Link href="/contatti" className="hover:text-zinc-300">
              {footer.contacts}
            </Link>
          </div>

          <div className="flex items-center gap-4 text-zinc-500">
            <Link
              href="https://github.com"
              aria-label="GitHub"
              className="hover:text-zinc-300"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://twitter.com"
              aria-label="Twitter / X"
              className="hover:text-zinc-300"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:redazione@thejournal.example"
              aria-label="Email"
              className="hover:text-zinc-300"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="max-w-3xl text-xs leading-relaxed text-zinc-600">
            © {new Date().getFullYear()} The Journal — DataInquest.{" "}
            {footer.disclaimer}
          </p>
          <span className="text-xs text-zinc-600 whitespace-nowrap">
            {footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
