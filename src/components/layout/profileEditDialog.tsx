

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useLanguage } from "@/context/maincontext";
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
// import { FiEdit2, FiLock, FiRotateCcw } from "react-icons/fi";
// import { Session } from "next-auth";
// import { useSession } from "next-auth/react";
// import { useActionState } from "react";
// import { userUpdate } from "@/action/action";
// import { useRouter } from "next/navigation";
// import UserAvatar, { AVATAR_MAP } from "@/components/layout/userAvatar";

// interface EditProfileDialogProps {
//   session: Session;
// }

// export interface InitialStateProfile {
//   success: boolean;
//   errors?: Record<string, string[] | undefined> | null;
//   message?: string | null;
//   data: {
//     username?: string;
//     email?: string;
//     oldPassword?: string;
//     newPassword?: string;
//     lang?: "IT" | "EN";
//     avatar?: string;
//   };
// }

// export default function ProfileEditDialog({ session }: EditProfileDialogProps) {
//   const [open, setOpen] = useState(false);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition-colors shadow-sm cursor-pointer">
//           <FiEdit2 className="w-4 h-4" /> Modifica Profilo
//         </button>
//       </DialogTrigger>

//       <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold text-zinc-100">
//             Modifica Profilo
//           </DialogTitle>
//           <DialogDescription className="text-zinc-400 text-xs">
//             Gestisci i tuoi dati personali, l&apos;avatar e le credenziali del tuo account.
//           </DialogDescription>
//         </DialogHeader>

//         {open && <ProfileForm session={session} setOpen={setOpen} />}
//       </DialogContent>
//     </Dialog>
//   );
// }

// // ----------------------------------------------------------------------
// // FORM INTERNO
// // ----------------------------------------------------------------------
// function ProfileForm({
//   session,
//   setOpen,
// }: {
//   session: Session;
//   setOpen: (open: boolean) => void;
// }) {
//   const { update } = useSession();
//   const router = useRouter();
//   const provider = (session.user as any)?.provider || "credentials";
//   const isOAuth = provider !== "credentials";
//   const { t, lang } = useLanguage();

//   // URL Immagine originale OAuth (se presente)
//   const oauthOriginalImage = (session.user as any)?.originalImage || session.user?.image;

//   // Inizializza lo stato avatar controllando sia `image` che `avatar`
//   const initialAvatar =
//     (session.user as any)?.avatar || session.user?.image || "icon:detective";

//   const [selectedAvatar, setSelectedAvatar] = useState<string>(initialAvatar);

//   const hasUpdatedRef = useRef(false);

//   const initialState: InitialStateProfile = {
//     success: false,
//     errors: null,
//     message: null,
//     data: {
//       username: session.user?.username || "",
//       email: session.user?.email || "",
//       lang: lang as "IT" | "EN",
//       avatar: selectedAvatar,
//     },
//   };

//   const [state, formAction, isPending] = useActionState(
//     userUpdate,
//     initialState
//   );

//   useEffect(() => {
//     if (state.success && !hasUpdatedRef.current) {
//       hasUpdatedRef.current = true;

//       const handleSuccess = async () => {
//         // Aggiorna la sessione NextAuth passando sia `image` che `avatar`
//         // per compatibilità con i vari tipi di JWT callback
//         await update({
//           user: {
//             username: state.data?.username || session.user?.username,
//             image: selectedAvatar,
//             avatar: selectedAvatar,
//           },
//         });

//         // Forza il re-render delle Server Components
//         router.refresh();

//         setTimeout(() => {
//           setOpen(false);
//         }, 600);
//       };

//       handleSuccess();
//     }
//   }, [state.success, state.data?.username, selectedAvatar, update, setOpen, session, router]);

//   return (
//     <>
//       {/* MESSAGGI DI ERRORE O SUCCESSO */}
//       {((state.errors && Object.keys(state.errors).length > 0) ||
//         state.message) && (
//         <div
//           key="boxError"
//           className={cn(
//             "mt-2 rounded-md border p-3",
//             state.success
//               ? "border-emerald-900/50 bg-emerald-950/30"
//               : "border-red-900/50 bg-red-950/30",
//             {
//               hidden: isPending,
//             }
//           )}
//         >
//           {state.errors && (
//             <ul className="flex flex-col gap-1 text-xs text-red-400 font-mono">
//               {Object.entries(state.errors).map(([field, messages]) => {
//                 if (!messages || messages.length === 0) return null;
//                 const errorKey = messages[0];
//                 const translatedMessage =
//                   (t.login.errors as Record<string, string>)[errorKey] ||
//                   errorKey;

//                 return (
//                   <li key={field} className="flex items-center gap-1.5">
//                     <span className="text-red-500">•</span>
//                     <span>{translatedMessage}</span>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}

//           {state.message && (
//             <p
//               className={cn(
//                 "flex justify-start items-center text-xs font-mono gap-2 mt-1 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full",
//                 {
//                   "text-rose-400 before:bg-red-500": !state.success,
//                   "text-emerald-400 before:bg-emerald-500": state.success,
//                 }
//               )}
//             >
//               {state.success
//                 ? (t.login.success as Record<string, string>)[state.message] ||
//                   state.message
//                 : (t.login.errors as Record<string, string>)[state.message] ||
//                   state.message}
//             </p>
//           )}
//         </div>
//       )}

//       {/* FORM */}
//       <form action={formAction} className="space-y-4 pt-2">
//         <input type="hidden" name="lang" value={lang} />
//         <input type="hidden" name="avatar" value={selectedAvatar} />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
//           {/* COLONNA SINISTRA: Avatar e Selettore */}
//           <div className="flex flex-col items-center gap-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/80">
//             <UserAvatar avatarValue={selectedAvatar} />
//             <span className="text-xs font-medium text-zinc-400">Scegli il tuo avatar</span>

//             {/* SELETTORE ICONE (Visibile sia a Credentials che OAuth) */}
//             <div className="grid grid-cols-4 gap-2 mt-1 w-full">
//               {Object.keys(AVATAR_MAP).map((iconKey) => (
//                 <button
//                   key={iconKey}
//                   type="button"
//                   onClick={() => setSelectedAvatar(iconKey)}
//                   className={cn(
//                     "p-2 rounded-lg border transition-all cursor-pointer bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center",
//                     selectedAvatar === iconKey
//                       ? "border-amber-500 bg-amber-500/10 scale-105"
//                       : "border-zinc-800 opacity-60"
//                   )}
//                 >
//                   <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4">
//                     {AVATAR_MAP[iconKey]}
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {/* OPZIONE RESET AVATAR OAUTH (se l'utente ha un account social) */}
//             {isOAuth && oauthOriginalImage && oauthOriginalImage.startsWith("http") && (
//               <button
//                 type="button"
//                 onClick={() => setSelectedAvatar(oauthOriginalImage)}
//                 className="mt-2 text-[11px] text-zinc-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
//               >
//                 <FiRotateCcw className="w-3 h-3" /> Usi foto profil {provider}
//               </button>
//             )}
//           </div>

//           {/* COLONNA DESTRA: Dati Personali */}
//           <div className="space-y-4">
//             {/* USERNAME */}
//             <div className="space-y-1.5">
//               <Label htmlFor="username" className="text-xs font-medium text-zinc-300">
//                 Username
//               </Label>
//               <Input
//                 id="username"
//                 name="username"
//                 type="text"
//                 defaultValue={session.user?.username || ""}
//                 className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500"
//                 required
//               />
//             </div>

//             {/* EMAIL */}
//             <div className="space-y-1.5">
//               <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
//                 Indirizzo Email
//               </Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 defaultValue={session.user?.email || ""}
//                 readOnly
//                 className="bg-zinc-950 border-zinc-800 text-zinc-400 opacity-60 cursor-not-allowed select-none focus:ring-0"
//               />
//               {isOAuth && (
//                 <p className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-1">
//                   <FiLock className="w-3 h-3 text-amber-500/80 shrink-0" />
//                   Account verificato tramite{" "}
//                   <span className="capitalize font-medium text-zinc-400">
//                     {provider}
//                   </span>
//                 </p>
//               )}
//             </div>

//             {/* CAMBIO PASSWORD */}
//             {!isOAuth && (
//               <div className="pt-3 border-t border-zinc-800/80 space-y-3">
//                 <span className="text-xs font-semibold text-zinc-400 block">
//                   Sicurezza (Opzionale)
//                 </span>

//                 <div className="space-y-1.5">
//                   <Label htmlFor="oldPassword" className="text-xs text-zinc-300">
//                     Password Attuale
//                   </Label>
//                   <Input
//                     id="oldPassword"
//                     name="oldPassword"
//                     type="password"
//                     placeholder="••••••••"
//                     className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500 text-sm"
//                   />
//                 </div>

//                 <div className="space-y-1.5">
//                   <Label htmlFor="newPassword" className="text-xs text-zinc-300">
//                     Nuova Password
//                   </Label>
//                   <Input
//                     id="newPassword"
//                     name="newPassword"
//                     type="password"
//                     placeholder="••••••••"
//                     className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500 text-sm"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* FOOTER */}
//         <DialogFooter className="pt-4 border-t border-zinc-800/80">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => setOpen(false)}
//             className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
//           >
//             Annulla
//           </Button>
//           <Button
//             type="submit"
//             disabled={isPending}
//             className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-medium cursor-pointer"
//           >
//             {isPending ? "Salvataggio..." : "Salva Modifiche"}
//           </Button>
//         </DialogFooter>
//       </form>
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
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
import { FiEdit2, FiLock, FiRotateCcw } from "react-icons/fi";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useActionState } from "react";
import { userUpdate } from "@/action/action";
import { useRouter } from "next/navigation";
import UserAvatar, { AVATAR_MAP } from "@/components/layout/userAvatar";

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
    avatar?: string;
  };
}

export default function ProfileEditDialog({ session }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition-colors shadow-sm cursor-pointer">
          <FiEdit2 className="w-4 h-4" /> Modifica Profilo
        </button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-zinc-100">
            Modifica Profilo
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-xs">
            Gestisci i tuoi dati personali, l&apos;avatar e le credenziali del tuo account.
          </DialogDescription>
        </DialogHeader>

        {open && <ProfileForm session={session} setOpen={setOpen} />}
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------
// FORM INTERNO
// ----------------------------------------------------------------------
function ProfileForm({
  session,
  setOpen,
}: {
  session: Session;
  setOpen: (open: boolean) => void;
}) {
  const { update } = useSession();
  const router = useRouter();
  const provider = (session.user as any)?.provider || "credentials";
  const isOAuth = provider !== "credentials";
  const { t, lang } = useLanguage();

  // Recupera il valore corrente dell'avatar dalla sessione
  const currentAvatar =
    (session.user as any)?.avatar || session.user?.image || "icon:detective";

  const oauthOriginalImage = (session.user as any)?.originalImage;

  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatar);
  const hasUpdatedRef = useRef(false);

  // Sincronizza lo stato dell'avatar se cambia la sessione
  useEffect(() => {
    if (currentAvatar) {
      setSelectedAvatar(currentAvatar);
    }
  }, [currentAvatar]);

  const initialState: InitialStateProfile = {
    success: false,
    errors: null,
    message: null,
    data: {
      username: session.user?.username || "",
      email: session.user?.email || "",
      lang: lang as "IT" | "EN",
      avatar: selectedAvatar,
    },
  };

  const [state, formAction, isPending] = useActionState(
    userUpdate,
    initialState
  );

  useEffect(() => {
    if (state.success && !hasUpdatedRef.current) {
      hasUpdatedRef.current = true;

      const handleSuccess = async () => {
        // Prendi l'avatar appena salvato nel DB o quello selezionato
        const updatedAvatar = state.data?.avatar || selectedAvatar;

        // Aggiorna sia `image` che `avatar` nella sessione NextAuth
        await update({
          user: {
            username: state.data?.username || session.user?.username,
            image: updatedAvatar,
            avatar: updatedAvatar,
          },
        });

        router.refresh();

        setTimeout(() => {
          setOpen(false);
        }, 500);
      };

      handleSuccess();
    }
  }, [state.success, state.data, selectedAvatar, update, setOpen, session, router]);

  return (
    <>
      {/* MESSAGGI DI ERRORE O SUCCESSO */}
      {((state.errors && Object.keys(state.errors).length > 0) ||
        state.message) && (
        <div
          key="boxError"
          className={cn(
            "mt-2 rounded-md border p-3",
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
                "flex justify-start items-center text-xs font-mono gap-2 mt-1 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full",
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

      {/* FORM */}
      <form action={formAction} className="space-y-4 pt-2">
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="avatar" value={selectedAvatar} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* COLONNA SINISTRA: Avatar e Selettore */}
          <div className="flex flex-col items-center gap-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/80">
            <UserAvatar avatarValue={selectedAvatar} />
            <span className="text-xs font-medium text-zinc-400">Scegli il tuo avatar</span>

            {/* SELETTORE ICONE */}
            <div className="grid grid-cols-4 gap-2 mt-1 w-full">
              {Object.keys(AVATAR_MAP).map((iconKey) => (
                <button
                  key={iconKey}
                  type="button"
                  onClick={() => setSelectedAvatar(iconKey)}
                  className={cn(
                    "p-2 rounded-lg border transition-all cursor-pointer bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center",
                    selectedAvatar === iconKey
                      ? "border-amber-500 bg-amber-500/10 scale-105"
                      : "border-zinc-800 opacity-60"
                  )}
                >
                  <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4">
                    {AVATAR_MAP[iconKey]}
                  </div>
                </button>
              ))}
            </div>

            {/* RESET OAUTH */}
            {isOAuth && oauthOriginalImage && (
              <button
                type="button"
                onClick={() => setSelectedAvatar(oauthOriginalImage)}
                className="mt-2 text-[11px] text-zinc-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FiRotateCcw className="w-3 h-3" /> Ripristina foto {provider}
              </button>
            )}
          </div>

          {/* COLONNA DESTRA */}
          <div className="space-y-4">
            {/* USERNAME */}
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-xs font-medium text-zinc-300">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                defaultValue={session.user?.username || ""}
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus:border-amber-500"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
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
                  Account verificato tramite{" "}
                  <span className="capitalize font-medium text-zinc-400">
                    {provider}
                  </span>
                </p>
              )}
            </div>

            {/* PASSWORD */}
            {!isOAuth && (
              <div className="pt-3 border-t border-zinc-800/80 space-y-3">
                <span className="text-xs font-semibold text-zinc-400 block">
                  Sicurezza (Opzionale)
                </span>

                <div className="space-y-1.5">
                  <Label htmlFor="oldPassword" className="text-xs text-zinc-300">
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
                  <Label htmlFor="newPassword" className="text-xs text-zinc-300">
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
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="pt-4 border-t border-zinc-800/80">
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
    </>
  );
}