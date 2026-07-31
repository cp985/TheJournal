// // components/ui/sequence.tsx
// import * as React from "react";
// import { cn } from "@/lib/utils";

// interface SequenceProps extends React.HTMLAttributes<HTMLDivElement> {
//   children: React.ReactNode;
// }

// export function Sequence({ children, className, ...props }: SequenceProps) {
//   return (
//     <div
//       className={cn("relative space-y-8 pl-6 border-l border-zinc-800", className)}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
//   title: string;
//   subtitle?: string;
//   children?: React.ReactNode;
// }

// export function Step({ title, subtitle, children, className, ...props }: StepProps) {
//   return (
//     <div className={cn("relative group", className)} {...props}>
//       {/* Indicatore visivo sul connettore verticale */}
//       <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border border-amber-500/50 bg-zinc-950 transition-colors group-hover:border-amber-500 group-hover:bg-amber-500/20" />
      
//       <div>
//         <div className="flex items-center gap-3">
//           <h3 className="font-serif text-lg font-medium text-zinc-100">
//             {title}
//           </h3>
//           {subtitle && (
//             <span className="font-mono text-xs uppercase tracking-wider text-amber-500/80">
//               {subtitle}
//             </span>
//           )}
//         </div>
//         {children && <div className="mt-2">{children}</div>}
//       </div>
//     </div>
//   );
// }

// components/ui/sequence.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SequenceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Sequence({ children, className, ...props }: SequenceProps) {
  return (
    <div
      className={cn("relative space-y-4 sm:space-y-6", className)}
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
  const [isActive, setIsActive] = React.useState(false);
  const stepRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Attiva lo step quando entra per almeno il 30% nel viewport
        if (entry.isIntersecting) {
          setIsActive(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px", // Attiva prima che arrivi a fine schermo
      }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stepRef}
      className={cn(
        "relative rounded-lg border p-4 sm:p-5 transition-all duration-500 ease-out",
        isActive
          ? "border-amber-500/40 bg-amber-950/10 shadow-[0_0_20px_rgba(245,158,11,0.05)]"
          : "border-zinc-800/80 bg-zinc-950/40 opacity-60",
        className
      )}
      {...props}
    >
      {/* Barra verticale sinistra di accensione/retroilluminazione */}
      <div
        className={cn(
          "absolute left-0 top-3 bottom-3 w-1 rounded-r transition-all duration-500",
          isActive
            ? "bg-amber-500 shadow-[0_0_10px_#f59e0b]"
            : "bg-zinc-800"
        )}
      />

      <div className="pl-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            {/* Indicatore a 3 punti che compare all'attivazione */}
            <span
              className={cn(
                "font-mono text-xs font-bold transition-opacity duration-300",
                isActive ? "text-amber-500 opacity-100" : "text-zinc-600 opacity-40"
              )}
            >
              [•••]
            </span>
            <h3 className="font-serif text-base sm:text-lg font-medium text-zinc-100">
              {title}
            </h3>
          </div>

          {subtitle && (
            <span
              className={cn(
                "font-mono text-xs uppercase tracking-wider transition-colors duration-300",
                isActive ? "text-amber-400 font-semibold" : "text-zinc-500"
              )}
            >
              {subtitle}
            </span>
          )}
        </div>

        {children && (
          <div className="mt-3 text-sm text-zinc-300 leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}