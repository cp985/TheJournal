"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Puzzle } from "lucide-react";
import { useLanguage } from "@/context/maincontext";

export default function HeroVideoSection() {
    const {t}=useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [hasPlayed, setHasPlayed] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Rileva quando la sezione entra nel viewport (almeno al 30%)
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && videoRef.current && !hasPlayed) {
          videoRef.current.play().catch(() => {
            // Gestione fallback per eventuali policy di autoplay del browser
          });
          setHasPlayed(true); // Assicura che riproduca una sola volta
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [hasPlayed]);

  return (
    <div
      ref={containerRef}
      className="relative mb-18 flex lg:max-h-[450px]  h-[80vh] min-h-[400px] w-full border-2 border-amber-800 items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* VIDEO SFONDO */}
      <video
        ref={videoRef}
        muted
        playsInline
        onEnded={() => setVideoFinished(true)} // Si attiva all'ultimo frame
        className="absolute inset-0 h-full w-full object-cover  opacity-90  transition-opacity duration-1000"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay Sfumatura Scura per la leggibilità del testo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/80"
      />

      {/* SCRITTA IN SOVRAIMPRESSIONE (Appare alla fine del video) */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <AnimatePresence>
          {videoFinished && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              {/* Badge Investigatori / Community */}
              <span className="inline-flex items-center gap-2 rounded-sm border border-amber-900/50 bg-amber-950/30 px-3 py-1 font-mono text-xs uppercase tracking-[0.25em] text-amber-500 backdrop-blur-md">
                <Puzzle className="h-3.5 w-3.5 shrink-0" />
                Crowdsourced Investigation
              </span>

              {/* Titolo Principale Immagine / Brand */}
              <h1 className="font-serif text-3xl font-extrabold uppercase tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
                The Power of <span className="text-amber-500">Community</span>
              </h1>

              {/* Sottotitolo sul tema "Pezzi del Puzzle dei Casi" */}
              <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {t.landing.hero.canvasPlaceholder}
              </p>

              {/* Pulsanti o Call to Action opzionali */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
     
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}