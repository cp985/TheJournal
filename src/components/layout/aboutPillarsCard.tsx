"use client";

import { motion, type Variants } from "framer-motion";
import {useLanguage} from "@/context/maincontext";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Scale,
  Network,
  DatabaseZap,
  type LucideIcon,
} from "lucide-react";
const PILLAR_ICONS: LucideIcon[] = [DatabaseZap, Network, Scale];

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



// Definiamo le varianti dell'animazione
const mobileCardVariants : Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: idx * 0.15,
      ease: "easeOut",
    },
  }),
};

export function PillarsSection() {        
    
    const {t} = useLanguage();
    const pillars = t.about.pillars
  return (
    <section className="relative border-t border-zinc-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{pillars.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {pillars.title}
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.items.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];

            return (
              <motion.div
                key={pillar.title}
                // Usiamo le varianti
                variants={mobileCardVariants}
                custom={idx}
                // Animiamo in view
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                // TRUCCO CSS: Su schermi MD (desktop >768px), forziamo l'opacità a 1 e la trasformazione a 0
                // tramite Tailwind, ignorando l'animazione JS su desktop!
                className="md:!opacity-100 md:!transform-none"
              >
                <Card className="group relative border-zinc-800 bg-zinc-900/40 transition-colors hover:border-amber-900/50 hover:bg-zinc-900/70">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition-colors group-hover:border-amber-900/60 group-hover:text-amber-500">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="mt-5 text-xl font-medium text-zinc-100">
                      {pillar.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-zinc-400">
                      {pillar.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

