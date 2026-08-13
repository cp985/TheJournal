// "use client";

// import { useState } from "react";
// import {useLanguage} from "@/context/maincontext";
// import { cn } from "@/lib/utils";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { FiEdit2, FiLock, FiAlertCircle } from "react-icons/fi";
// import { Session } from "next-auth";
// import { useActionState } from "react";
// import { userUpdate } from "@/action/action";

// interface EditProfileDialogProps {
//   session: Session;


// }

//   export interface InitialStateProfile {
//     success: boolean;
//   errors?: Record<string, string[] | undefined> | null;
//     message?: string | null;
//     data: {
//       username?: string;
//       email?: string;
//       oldPassword?: string;
//       newPassword?: string;
//       lang?: 'IT' | 'EN';
//     };
//   }

// export default function ProfileEditDialog({ session }: EditProfileDialogProps) {
//   const [open, setOpen] = useState(false);
  
//   // Lettura diretta del provider aggiunto al token / sessione
//   const provider = (session.user as any)?.provider || "credentials";
//   const isOAuth = provider !== "credentials";


  
//   // State per feedback UI
// const {t,lang} = useLanguage();
// const initialState : InitialStateProfile = {
//   success: false,
//   errors: null,
//   message: null,
//   data: {
//     username: '',
//     email: '',
//     lang: lang,
//   },
// };
// const [formData,setFormData,isPending] = useActionState(userUpdate,initialState);


//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition-colors shadow-sm cursor-pointer">
//           <FiEdit2 className="w-4 h-4" /> Modifica Profilo
//         </button>
//       </DialogTrigger>

//       <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold text-zinc-100">
//             Modifica Profilo
//           </DialogTitle>
//           <DialogDescription className="text-zinc-400 text-xs">
//             Gestisci i tuoi dati personali e le credenziali del tuo account.
//           </DialogDescription>
//         </DialogHeader>

//                  {((formData.errors && Object.keys(formData.errors).length > 0) ||
//                    formData.message) && (
//                    <div
//                      key="boxError"
//                      className={cn(
//                        "mt-4 rounded-md border border-red-900/50 bg-red-950/30 p-3",
//                        {
//                          hidden: isPending,
//                        },
//                      )}
//                    >
//                      {formData.errors && (
//                        <ul className="flex flex-col gap-1 text-xs text-red-400 font-mono">
//                          {Object.entries(formData.errors).map(
//                            ([field, messages]) => {
//                              if (!messages || messages.length === 0) return null;
//                              const errorKey = messages[0];
//                              const translatedMessage =
//                                (t.login.errors as Record<string, string>)[
//                                  errorKey
//                                ] || errorKey;
   
//                              return (
//                                <li
//                                  key={field}
//                                  className="flex items-center gap-1.5"
//                                >
//                                  <span className="text-red-500">•</span>
//                                  <span>{translatedMessage}</span>
//                                </li>
//                              );
//                            },
//                          )}
//                        </ul>
//                      )}
   
//                      {formData.message && (
//                        <p
//                          className={cn(
//                            "flex justify-start items-center text-xs font-mono text-center gap-2 mt-1 before:h-0.75 before:w-0.75 before:shrink-0 before:rounded-full ",
//                            {
//                              "text-rose-400 before:bg-red-500": !formData.success,
//                              "text-amber-500 before:bg-amber-500":
//                                formData.success,
//                            },
//                          )}
//                        >
//                          {formData.success
//                            ? (t.login.success as Record<string, string>)[
//                                formData.message
//                              ] || formData.message
//                            : (t.login.errors as Record<string, string>)[
//                                formData.message
//                              ] || formData.message}
//                        </p>
//                      )}
//                    </div>
//                  )}
    

//         <form action={setFormData} className="space-y-4 py-2">
//           {/* USERNAME (Sempre modificabile) */}
//           <div className="space-y-1.5">
//             <Label htmlFor="username" className="text-xs font-medium text-zinc-300">
//               Username
//             </Label>
//             <Input
//               id="username"
//               name="username"
//               type="text"
//           defaultValue={session.user?.username}
//               className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500"
//               required
//             />
//           </div>

//           {/* EMAIL (Disabilitata per OAuth) */}
//           <div className="space-y-1.5">
//             <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
//               Indirizzo Email
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               name="email"
//               defaultValue={session.user?.email}
            
//               className="bg-zinc-950 border-zinc-800 text-zinc-400 opacity-60 cursor-not-allowed select-none"
//             />
//             {isOAuth && (
//               <p className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-1">
//                 <FiLock className="w-3 h-3 text-amber-500/80 shrink-0" />
//                 Account verificato con <span className="capitalize font-medium text-zinc-400">{provider}</span>.
//               </p>
//             )}
//           </div>

//           {/* CAMBIO PASSWORD (Renderizzato solo per utenti Credentials) */}
//           {!isOAuth && (
//             <div className="pt-3 border-t border-zinc-800 space-y-3">
//               <span className="text-xs font-semibold text-zinc-400 block">
//                 Sicurezza (Opzionale)
//               </span>

//               <div className="space-y-1.5">
//                 <Label htmlFor="currentPassword" className="text-xs text-zinc-300">
//                   Password Attuale
//                 </Label>
//                 <Input
//                   id="currentPassword"
//                   name="currentPassword"
//                   type="password"
//                  defaultValue={formData.data.oldPassword}
//                   placeholder="••••••••"
//                   className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500 text-sm"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <Label htmlFor="newPassword" className="text-xs text-zinc-300">
//                   Nuova Password
//                 </Label>
//                 <Input
//                   id="newPassword"
//                   name="newPassword"
//                   type="password"
//                defaultValue={formData.data.newPassword}
//                   placeholder="••••••••"
//                   className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500 text-sm"
//                 />
//               </div>
//             </div>
//           )}

//           <DialogFooter className="pt-4 border-t border-zinc-800/50">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => setOpen(false)}
//               className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
//             >
//               Annulla
//             </Button>
//             <Button
//               type="submit"
//               disabled={isPending}
//               className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-medium cursor-pointer"
//             >
//               {isPending ? "Salvataggio..." : "Salva Modifiche"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/maincontext";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FiEdit2, FiLock } from "react-icons/fi";
import { Session } from "next-auth";
import { useActionState } from "react";
import { userUpdate } from "@/action/action";

interface EditProfileDialogProps {
  session: Session;
}

export interface InitialStateProfile {
  success: boolean;
  errors?: Record<string, string[] | undefined> | null;
  message?: string | null;
  data: {
    username?: string;
    email?: string;
    oldPassword?: string;
    newPassword?: string;
    lang?: "IT" | "EN";
  };
}

export default function ProfileEditDialog({ session }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);

  // Lettura diretta del provider aggiunto al token / sessione
  const provider = (session.user as any)?.provider || "credentials";
  const isOAuth = provider !== "credentials";

  // State per feedback UI & i18n
  const { t, lang } = useLanguage();

  const initialState: InitialStateProfile = {
    success: false,
    errors: null,
    message: null,
    data: {
      username: session.user?.username || "",
      email: session.user?.email || "",
      lang: lang as "IT" | "EN",
    },
  };

  const [state, formAction, isPending] = useActionState(
    userUpdate,
    initialState
  );

  // Auto-chiusura del Dialog in caso di successo
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition-colors shadow-sm cursor-pointer">
          <FiEdit2 className="w-4 h-4" /> Modifica Profilo
        </button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-zinc-100">
            Modifica Profilo
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-xs">
            Gestisci i tuoi dati personali e le credenziali del tuo account.
          </DialogDescription>
        </DialogHeader>

        {((state.errors && Object.keys(state.errors).length > 0) ||
          state.message) && (
          <div
            key="boxError"
            className={cn(
              "mt-4 rounded-md border p-3",
              state.success
                ? "border-emerald-900/50 bg-emerald-950/30"
                : "border-red-900/50 bg-red-950/30",
              {
                hidden: isPending,
              }
            )}
          >
            {state.errors && (
              <ul className="flex flex-col gap-1 text-xs text-red-400 font-mono">
                {Object.entries(state.errors).map(([field, messages]) => {
                  if (!messages || messages.length === 0) return null;
                  const errorKey = messages[0];
                  const translatedMessage =
                    (t.login.errors as Record<string, string>)[errorKey] ||
                    errorKey;

                  return (
                    <li key={field} className="flex items-center gap-1.5">
                      <span className="text-red-500">•</span>
                      <span>{translatedMessage}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            {state.message && (
              <p
                className={cn(
                  "flex justify-start items-center text-xs font-mono text-center gap-2 mt-1 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full",
                  {
                    "text-rose-400 before:bg-red-500": !state.success,
                    "text-emerald-400 before:bg-emerald-500": state.success,
                  }
                )}
              >
                {state.success
                  ? (t.login.success as Record<string, string>)[state.message] ||
                    state.message
                  : (t.login.errors as Record<string, string>)[state.message] ||
                    state.message}
              </p>
            )}
          </div>
        )}

        <form action={formAction} className="space-y-4 py-2">
          {/* Input nascosto per inviare la lingua corrente al FormData */}
          <input type="hidden" name="lang" value={lang} />

          {/* USERNAME (Sempre modificabile) */}
          <div className="space-y-1.5">
            <Label
              htmlFor="username"
              className="text-xs font-medium text-zinc-300"
            >
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              defaultValue={state.data.username || session.user?.username || ""}
              className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500"
              required
            />
          </div>

          {/* EMAIL (Read-only per non bloccare l'invio via FormData) */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-xs font-medium text-zinc-300"
            >
              Indirizzo Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={session.user?.email || ""}
              readOnly
              className="bg-zinc-950 border-zinc-800 text-zinc-400 opacity-60 cursor-not-allowed select-none focus:ring-0"
            />
            {isOAuth && (
              <p className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-1">
                <FiLock className="w-3 h-3 text-amber-500/80 shrink-0" />
                Account verificato con{" "}
                <span className="capitalize font-medium text-zinc-400">
                  {provider}
                </span>
                .
              </p>
            )}
          </div>

          {/* CAMBIO PASSWORD (Renderizzato solo per utenti Credentials) */}
          {!isOAuth && (
            <div className="pt-3 border-t border-zinc-800 space-y-3">
              <span className="text-xs font-semibold text-zinc-400 block">
                Sicurezza (Opzionale)
              </span>

              <div className="space-y-1.5">
                <Label
                  htmlFor="oldPassword"
                  className="text-xs text-zinc-300"
                >
                  Password Attuale
                </Label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="••••••••"
                  className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="newPassword"
                  className="text-xs text-zinc-300"
                >
                  Nuova Password
                </Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="••••••••"
                  className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500 text-sm"
                />
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 border-t border-zinc-800/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-medium cursor-pointer"
            >
              {isPending ? "Salvataggio..." : "Salva Modifiche"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}