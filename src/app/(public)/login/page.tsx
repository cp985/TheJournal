"use client";

import { useState, Suspense } from "react";

import Link from "next/link";
import Loader from "@/components/layout/loader";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import {
  userSignUp,
  userLogin,
  userOauth,
  type SignUpFormState,
  type LoginFormState,
} from "@/action/action";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { FaGoogle, FaGithub } from "react-icons/fa6";

import { useLanguage } from "@/context/maincontext";

// ---------------------------------------------------------------------------
// Componenti di campo riutilizzabili
// ---------------------------------------------------------------------------

interface TextFieldProps {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ElementType;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
}

function TextField({
  id,
  label,
  placeholder,
  icon: Icon,
  type = "text",
  autoComplete,
  defaultValue,
  required,
}: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-wider text-zinc-400"
      >
        {label}
      </Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          required={required}
          className="border-zinc-800 bg-zinc-900/60 pl-9 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-amber-700 focus-visible:ring-amber-600/40"
        />
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  visible: boolean;
  onToggleVisible: () => void;
  autoComplete?: string;
  rightSlot?: React.ReactNode;
  ariaShowText: string;
  ariaHideText: string;
  defaultValue?: string;
  required?: boolean;
}

function PasswordField({
  id,
  label,
  placeholder,
  visible,
  onToggleVisible,
  autoComplete,
  rightSlot,
  ariaShowText,
  ariaHideText,
  defaultValue,
  required,
}: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className="font-mono text-[11px] uppercase tracking-wider text-zinc-400"
        >
          {label}
        </Label>
        {rightSlot}
      </div>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
        <Input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          required={required}
          className="border-zinc-800 bg-zinc-900/60 pl-9 pr-10 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-amber-700 focus-visible:ring-amber-600/40"
        />
        <button
          type="button"
          onClick={onToggleVisible}
          aria-label={visible ? ariaHideText : ariaShowText}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-sm text-zinc-500 transition-colors hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pagina
// ---------------------------------------------------------------------------

function LoginComponent() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isSignUp = params.get("action") === "signup";
  const { t, lang } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleModeChange(next: boolean) {
    setShowPassword(false);
    setShowConfirmPassword(false);

    const newParams = new URLSearchParams(params.toString());

    if (next) {
      newParams.set("action", "signup");
    } else {
      newParams.delete("action");
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }

  //login/signup handling

  const correctRegistrationMode = async (
    prevS: LoginFormState | SignUpFormState,
    formData: FormData,
  ) => {
    if (isSignUp) {
      return await userSignUp(prevS as SignUpFormState, formData);
    }
    return await userLogin(prevS as LoginFormState, formData);
  };

  const initialState = {
    success: false,
    message: "",
    errors: {},
    data: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      lang: lang,
    },
  };
  const [formData, setFormData, isPendingCredentials] = useActionState(
    correctRegistrationMode,
    initialState,
  );


    const [formSGoogle, setOAuthGoogle, isPendingOAuthGoogle] = useActionState(
    userOauth,
   null
  );

     const [formSGithub, setOAuthGithub, isPendingOAuthGithub] = useActionState(
    userOauth,
   null
  );

  const isPending =
    isPendingCredentials || isPendingOAuthGoogle || isPendingOAuthGithub;



  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 pt-8 sm:px-6">
      {/* Background Section (Mantenuta la tua correzione di prima) */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
        <Image
          fill
          priority
          alt="background image"
          src="/assets/bg-login.webp"
          className="object-cover opacity-60 blur-[2px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-zinc-950/60" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <Card className="w-full py-1 rounded-tl-none border-amber-600/60 border bg-zinc-950/90 shadow-2xl shadow-black/60">
          <CardContent className="px-6 py-1 pb-2 sm:px-8">
            {/* Toggle Accedi / Registrati */}
            <div className="relative mt-8 grid grid-cols-2 rounded-md border border-zinc-800 bg-zinc-900/60 p-1">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-sm bg-amber-500 transition-transform duration-300 ease-out",
                  isSignUp && "translate-x-[calc(100%+4px)]",
                )}
              />
              <button
                type="button"
                onClick={() => handleModeChange(false)}
                aria-pressed={!isSignUp}
                className={cn(
                  "relative z-10 rounded-sm py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                  !isSignUp
                    ? "text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                {t.login.loginToggle}
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleModeChange(true)}
                aria-pressed={isSignUp}
                className={cn(
                  "relative z-10 rounded-sm py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                  isSignUp
                    ? "text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                {t.login.signUpToggle}
              </button>
            </div>

            {/* Intestazione dinamica */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? "signup-header" : "login-header"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="mt-6 text-center"
              >
                <span className="inline-flex items-center gap-1.5 rounded-sm border border-amber-900/40 bg-amber-950/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-500">
                  <ShieldCheck className="h-3 w-3" />
                  {isSignUp ? t.login.badgeSignUp : t.login.badgeLogin}
                </span>
                <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  {isSignUp ? t.login.titleSignUp : t.login.titleLogin}
                </h1>
                <p className="mt-2 text-sm text-zinc-500">
                  {isSignUp ? t.login.descSignUp : t.login.descLogin}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Form */}
            <form action={setFormData} className="mt-8">
              <motion.div layout className="flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {isSignUp && (
                    <motion.div
                      key="username"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <TextField
                        id="username"
                        label={t.login.usernameLabel}
                        placeholder={t.login.usernamePlaceholder}
                        icon={User}
                        autoComplete="username"
                        required
                        defaultValue={formData.data?.username || ""}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <TextField
                  id="email"
                  label={t.login.emailLabel}
                  type="email"
                  placeholder={t.login.emailPlaceholder}
                  icon={Mail}
                  autoComplete="email"
                  required
                  defaultValue={formData.data?.email || ""}
                />

                <PasswordField
                  id="password"
                  required
                  defaultValue={formData.data?.password || ""}
                  label={t.login.passwordLabel}
                  placeholder={t.login.passwordPlaceholder}
                  visible={showPassword}
                  onToggleVisible={() => setShowPassword((v) => !v)}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  ariaShowText={t.login.showPassword}
                  ariaHideText={t.login.hidePassword}
                  rightSlot={
                    !isSignUp ? (
                      <Link
                        href="/recupero-password"
                        className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition-colors hover:text-amber-500"
                      >
                        {t.login.forgotPassword}
                      </Link>
                    ) : undefined
                  }
                />

                <AnimatePresence initial={false}>
                  {isSignUp && (
                    <motion.div
                      key="confirmPassword"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-3">
                        <PasswordField
                          id="confirmPassword"
                          required
                          defaultValue={formData.data?.confirmPassword || ""}
                          label={t.login.confirmPasswordLabel}
                          placeholder={t.login.passwordPlaceholder}
                          visible={showConfirmPassword}
                          onToggleVisible={() =>
                            setShowConfirmPassword((v) => !v)
                          }
                          autoComplete="new-password"
                          ariaShowText={t.login.showPassword}
                          ariaHideText={t.login.hidePassword}
                        />
                        <p className="text-[11px] leading-relaxed text-zinc-600">
                          {t.login.termsPrefix}
                          <Link
                            href="/terms-and-conditions"
                            className="text-zinc-400 underline underline-offset-2 hover:text-amber-500"
                          >
                            {t.login.termsLink}
                          </Link>
                          {t.login.termsAnd}
                          <Link
                            href="/privacy"
                            className="text-zinc-400 underline underline-offset-2 hover:text-amber-500"
                          >
                            {t.login.privacyLink}
                          </Link>
                          .
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Input type="hidden" name="lang" id="lang" value={lang} />
              </motion.div>

              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className={cn(
                  "mt-8 w-full gap-2 bg-amber-500 text-zinc-900 hover:bg-amber-600 focus-visible:ring-amber-500",
                  {
                    "bg-amber-950 text-zinc-400": isPendingCredentials,
                  },
                )}
              >
                {isSignUp ? t.login.btnSignUp : t.login.btnLogin}
                {isPendingCredentials ? (
                  <div className="h-5 w-5 rounded-full border-2 border-amber-500 border-r-transparent animate-spin"></div>
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>

              <div className="relative my-4 text-center text-xs text-muted-foreground ">
                {t.login.or}
              </div>


          


              {/* Error box */}

              {((formData.errors && Object.keys(formData.errors).length > 0) ||
                formData.message) && (
                <div
                  key="boxError"
                  className={cn(
                    "mt-4 rounded-md border border-red-900/50 bg-red-950/30 p-3",
                    {
                      hidden: isPending,
                    },
                  )}
                >
                  {formData.errors && (
                    <ul className="flex flex-col gap-1 text-xs text-red-400 font-mono">
                      {Object.entries(formData.errors).map(
                        ([field, messages]) => {
                          if (!messages || messages.length === 0) return null;
                          const errorKey = messages[0];
                          const translatedMessage =
                            (t.login.errors as Record<string, string>)[
                              errorKey
                            ] || errorKey;

                          return (
                            <li
                              key={field}
                              className="flex items-center gap-1.5"
                            >
                              <span className="text-red-500">•</span>
                              <span>{translatedMessage}</span>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  )}

                  {formData.message && (
                    <p
                      className={cn(
                        "flex justify-start items-center text-xs font-mono text-center gap-2 mt-1 before:h-0.75 before:w-0.75 before:shrink-0 before:rounded-full ",
                        {
                          "text-rose-400 before:bg-red-500": !formData.success,
                          "text-amber-500 before:bg-amber-500":
                            formData.success,
                        },
                      )}
                    >
                      {formData.success
                        ? (t.login.success as Record<string, string>)[
                            formData.message
                          ] || formData.message
                        : (t.login.errors as Record<string, string>)[
                            formData.message
                          ] || formData.message}
                    </p>
                  )}
                </div>
              )}
            </form>
                          <div className="relative my-4 text-center text-xs text-muted-foreground uppercase"></div>

            <div className="flex flex-row gap-3">

{/* BOTTONI OAUTH (FUORI DAL FORM CREDENTIALS) */}

  {/* Bottone Google */}
  <form action={setOAuthGoogle} className="flex-1">
    <Input type="hidden" name="provider" id="provider" value={"google"} />
    <Button
    disabled={isPending}
      type="submit"
     
      
      className={cn("w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-700 text-zinc-950 font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm",{
        "bg-amber-950 text-zinc-400": isPendingOAuthGoogle
      })}
    >
      <FaGoogle className="w-4 h-4" />
      <span>Google</span>
      {isPendingOAuthGoogle && (
        <span className="h-5 w-5 rounded-full border-2 border-amber-500 border-r-transparent animate-spin"></span>
      )}
    </Button>
  </form>

  {/* Bottone GitHub */}
  <form action={setOAuthGithub} className="flex-1">
    <Input type="hidden" name="provider" id="provider" value={"github"} />
    <Button
      type="submit"
      disabled={isPending}
     
      
      className={cn("w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-700 text-zinc-950 font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm",{
        "bg-amber-950 text-zinc-400": isPendingOAuthGithub
      })}
    >
      <FaGithub className="w-4 h-4" />
      <span>GitHub</span>
      {isPendingOAuthGithub && (
        <span className="h-5 w-5 rounded-full border-2 border-amber-500 border-r-transparent animate-spin"></span>
      )}
    </Button>
  </form>
</div>


            {/* Trust line */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-zinc-800/80 pt-6 text-center text-[11px] text-zinc-600">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-zinc-700" />
              {t.login.trustLine}
            </div>
          </CardContent>
        </Card>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-xs text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <ArrowLeft className="h-3 w-3" />
          {t.login.backToJournal}
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader />}>
      <LoginComponent />
    </Suspense>
  );
}
