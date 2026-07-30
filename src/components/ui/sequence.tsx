// components/ui/sequence.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface SequenceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Sequence({ children, className, ...props }: SequenceProps) {
  return (
    <div
      className={cn("relative space-y-8 pl-6 border-l border-zinc-800", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Step({ title, subtitle, children, className, ...props }: StepProps) {
  return (
    <div className={cn("relative group", className)} {...props}>
      {/* Indicatore visivo sul connettore verticale */}
      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border border-amber-500/50 bg-zinc-950 transition-colors group-hover:border-amber-500 group-hover:bg-amber-500/20" />
      
      <div>
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-lg font-medium text-zinc-100">
            {title}
          </h3>
          {subtitle && (
            <span className="font-mono text-xs uppercase tracking-wider text-amber-500/80">
              {subtitle}
            </span>
          )}
        </div>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
}