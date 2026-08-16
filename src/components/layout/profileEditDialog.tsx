

"use client";

import { useState, useActionState, startTransition } from "react";
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
import { FiEdit2, FiLock, FiRotateCcw, FiLoader, FiUser } from "react-icons/fi";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
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
        <button
          type="button"
          className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <FiEdit2 className="w-4 h-4 text-amber-500/90" /> Modifica Profilo
        </button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-950 border-2 border-amber-500/40 shadow-xl shadow-amber-500/5 text-zinc-100 sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="space-y-1.5 pb-2 border-b border-zinc-800/80">
          <DialogTitle className="text-zinc-100 flex items-center gap-2.5 text-lg font-bold">
            <FiUser className="w-5 h-5 text-amber-500" />
            Gestione Profilo
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm">
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

  const currentAvatar =
    (session.user as any)?.avatar || session.user?.image || "icon:detective";

  const oauthOriginalImage = (session.user as any)?.originalImage;

  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatar);

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

  return (
    <>
      {/* MESSAGGI DI ERRORE O SUCCESSO */}
      {((state.errors && Object.keys(state.errors).length > 0) ||
        state.message) && (
        <div
          key="boxError"
          className={cn(
            "mt-2 rounded-lg border p-3.5",
            state.success
              ? "border-emerald-900/50 bg-emerald-950/30"
              : "border-red-900/50 bg-red-950/30",
            {
              hidden: isPending,
            }
          )}
        >
          {state.errors && (
            <ul className="flex flex-col gap-1.5 text-xs text-red-400 font-mono">
              {Object.entries(state.errors).map(([field, messages]) => {
                if (!messages || messages.length === 0) return null;
                const errorKey = messages[0];
                const translatedMessage =
                  (t.login.errors as Record<string, string>)[errorKey] ||
                  errorKey;

                return (
                  <li key={field} className="flex items-center gap-2">
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
                "flex justify-start items-center text-xs font-mono gap-2.5 mt-1.5 before:h-2 before:w-2 before:shrink-0 before:rounded-full",
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

      {/* 🟢 Form aggiornato con wrapper startTransition inline, come nel dialog evidence */}
      <form
        action={async (formData) => {
          startTransition(async () => {
            const res = await userUpdate(state, formData);
            if (res.success) {
              const updatedAvatar = res.data?.avatar || selectedAvatar;

              await update({
                user: {
                  username: res.data?.username || session.user?.username,
                  image: updatedAvatar,
                  avatar: updatedAvatar,
                },
              });

              router.refresh();

              setTimeout(() => {
                setOpen(false);
              }, 300);
            } else {
              formAction(formData);
            }
          });
        }}
        className="space-y-5 pt-2"
      >
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="avatar" value={selectedAvatar} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* COLONNA SINISTRA: Avatar e Selettore */}
          <div className="flex flex-col items-center gap-3 bg-zinc-950/50 p-5 rounded-2xl border border-zinc-800/80 shadow-inner shadow-black/10">
            {/* 🟢 Avatar leggermente ingrandito */}
            <UserAvatar avatarValue={selectedAvatar} />
            <span className="text-sm font-medium text-zinc-300">Scegli il tuo avatar</span>

            {/* SELETTORE ICONE */}
            <div className="grid grid-cols-4 gap-2.5 mt-1 w-full">
              {Object.keys(AVATAR_MAP).map((iconKey) => (
                <button
                  key={iconKey}
                  type="button"
                  onClick={() => setSelectedAvatar(iconKey)}
                  className={cn(
                    "p-2.5 rounded-lg border transition-all cursor-pointer bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center",
                    selectedAvatar === iconKey
                      ? "border-amber-500 bg-amber-500/10 scale-105"
                      : "border-zinc-800 opacity-60"
                  )}
                >
                  <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-4.5 [&>svg]:h-4.5">
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
                className="mt-2.5 text-[11px] text-zinc-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer font-mono"
              >
                <FiRotateCcw className="w-3 h-3" /> Ripristina foto originaria
              </button>
            )}
          </div>

          {/* COLONNA DESTRA: Campi Input text-sm e padding adeguato */}
          <div className="space-y-4">
            {/* USERNAME */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-mono text-zinc-200 flex items-center gap-1.5 font-medium">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                defaultValue={session.user?.username || ""}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 h-10 focus:outline-none focus:border-amber-500 placeholder:text-zinc-500"
                required
              />
            </div>

            {/* EMAIL (Read-only) */}
            <div className="space-y-2 relative">
              <Label htmlFor="email" className="text-sm font-mono text-zinc-200 flex items-center gap-1.5 font-medium">
                Indirizzo Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={session.user?.email || ""}
                readOnly
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-400 opacity-70 cursor-not-allowed select-none focus:ring-0"
              />
              {isOAuth && (
                <p className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-1.5 font-mono">
                  <FiLock className="w-3 h-3 text-amber-500/90 shrink-0" />
                  Account verificato tramite{" "}
                  <span className="capitalize font-medium text-amber-400">
                    {provider}
                  </span>
                </p>
              )}
            </div>

            {/* PASSWORD SECTION */}
            {!isOAuth && (
              <div className="pt-4 border-t border-zinc-800/80 space-y-4">
                <span className="text-sm font-bold text-amber-500 block">
                  Sicurezza Account (Opzionale)
                </span>

                <div className="space-y-2 relative">
                  <Label htmlFor="oldPassword" className="text-sm text-zinc-300">
                    Password Attuale
                  </Label>
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 h-10 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="newPassword" className="text-sm text-zinc-300">
                    Nuova Password
                  </Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 h-10 focus:border-amber-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER coordinato */}
        <DialogFooter className="gap-3 sm:gap-2 pt-3 border-t border-zinc-800/80">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 text-sm font-mono px-4 py-2"
          >
            Annulla
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-sm font-mono flex items-center gap-2 px-5 py-2 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                Salvataggio...
              </>
            ) : (
              "Salva Modifiche Profilo"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}