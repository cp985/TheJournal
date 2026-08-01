import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import { useLanguage } from "@/context/maincontext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { GitFork, Clock3, DatabaseZap, type LucideIcon } from "lucide-react";

const FEATURE_ICONS: LucideIcon[] = [Clock3, DatabaseZap, GitFork];

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

const variantsCard: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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

export default function LandingFeauture() {
  const { t } = useLanguage();
  const { features } = t.landing;
  return (
    <section
      id="features"
      className="relative border-t border-zinc-900 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{features.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {features.title}
          </h2>
          <p className="mt-4 text-zinc-400">{features.description}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((feature, idx) => {
            const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
            return (
              <motion.div 
            key={feature.title}
        variants={variantsCard}
          initial="hidden"
          whileInView="visible"
          custom={idx}
          viewport={{ once: true, margin: "-50px" }}
              >
                <Card
                  key={feature.title}
                  className="group relative border-zinc-800 bg-zinc-900/40 transition-colors hover:border-amber-900/50 hover:bg-zinc-900/70"
                >
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 transition-colors group-hover:border-amber-900/60 group-hover:text-amber-500">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <CardTitle className="mt-4 text-lg font-medium text-zinc-100">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-zinc-400">
                      {feature.description}
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
