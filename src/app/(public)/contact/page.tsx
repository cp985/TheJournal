"use client";

import { useState } from "react";
import {useActionState} from "react";
import Link from "next/link";
import { useLanguage } from "@/context/maincontext";
import { AlertCircle, CheckCircle2 } from "lucide-react"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {sendEmail} from "@/../api/api";

import {cn} from "@/lib/utils";

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const contact = t.contact;



  const initialState = {
    success: false,
    errors: null,
    message: null,
    data:{
  username: "",
    email: "",
    subject: "",
    textarea: "",
    lang: lang

    }
  
  }
const [formState, setFormState,isPending] = useActionState(sendEmail,initialState);




  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-mono flex flex-col justify-between p-6 sm:p-12">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <header className="border-b border-zinc-800 pb-6 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <Link
              href="/login"
              className="text-amber-500 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
            >
              {contact.backToLogin}
            </Link>
            <span className="text-amber-500/80 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              {contact.systemStatus}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 pt-2">
            {contact.title}
          </h1>
          <p className="text-xs text-zinc-400">{contact.subtitle}</p>
        </header>

        {/* Layout a due colonne */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form principale (2 Colonne) */}
 
        

          <form action={setFormState} className="md:col-span-2 space-y-4">
  {/* Campo Nome */}
  <div className="space-y-1.5">
    <Label htmlFor="username" className="text-xs font-semibold text-zinc-400">
      {contact.form.nameLabel}
    </Label>
    <Input
    defaultValue={formState.data?.username || ""}
      id="username"
      type="text"
      name="username"
      required
      placeholder={contact.form.namePlaceholder}
      className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/50 focus-visible:border-amber-500 text-sm h-10 transition-all"
    />
  </div>

  {/* Campo Email */}
  <div className="space-y-1.5">
    <Label htmlFor="email" className="text-xs font-semibold text-zinc-400">
      {contact.form.emailLabel}
    </Label>
    <Input
    defaultValue={formState.data?.email || ""}
      id="email"
      type="email"
      name="email"
      required
      placeholder={contact.form.emailPlaceholder}
      className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/50 focus-visible:border-amber-500 text-sm h-10 transition-all"
    />
  </div>

  {/* Campo Select (Oggetto) */}


  <div className="space-y-1.5">
  <Label htmlFor="subject" className="text-xs font-semibold text-zinc-400">
    {contact.form.subjectLabel}
  </Label>
  <Select 
    key={formState.data?.subject || "empty"}
    defaultValue={formState.data?.subject || undefined}
    required 
    name="subject"
  >
    <SelectTrigger
      id="subject"
      className="w-full bg-zinc-900 border-zinc-800 text-zinc-300 focus:ring-amber-500/50 focus:border-amber-500 text-sm h-10 transition-colors"
    >
      <SelectValue placeholder={contact.form.subjectPlaceholder} />
    </SelectTrigger>
    
    <SelectContent 
      position="popper" 
      sideOffset={4}
      className="bg-zinc-900/95 backdrop-blur-md border border-zinc-800 text-zinc-300 shadow-xl rounded-md overflow-hidden z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
    >
      <SelectItem 
        value="general" 
        className="focus:bg-zinc-800 focus:text-amber-400 cursor-pointer text-sm transition-colors"
      >
        {contact.form.subjects.general}
      </SelectItem>
      <SelectItem 
        value="bug" 
        className="focus:bg-zinc-800 focus:text-amber-400 cursor-pointer text-sm transition-colors"
      >
        {contact.form.subjects.bug}
      </SelectItem>
      <SelectItem 
        value="security" 
        className="focus:bg-zinc-800 focus:text-amber-400 cursor-pointer text-sm transition-colors"
      >
        {contact.form.subjects.security}
      </SelectItem>
      <SelectItem 
        value="account" 
        className="focus:bg-zinc-800 focus:text-amber-400 cursor-pointer text-sm transition-colors"
      >
        {contact.form.subjects.account}
      </SelectItem>
    </SelectContent>
  </Select>
</div>

  {/* Campo Messaggio */}
  <div className="space-y-1.5">
    <Label htmlFor="textarea" className="text-xs font-semibold text-zinc-400">
      {contact.form.messageLabel}
    </Label>
    <Textarea
    defaultValue={formState.data?.textarea || ""}
      id="textarea"
      name="textarea"
      rows={5}
      required
      placeholder={contact.form.messagePlaceholder}
      className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/50 focus-visible:border-amber-500 text-sm resize-none transition-all"
    />
  </div>

  <Input type="hidden" name="lang" id="lang" value={lang} />


  



  {/* Bottone Submit */}
  <Button
    type="submit"
    disabled={isPending}
    className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-100 font-bold py-2.5 text-xs tracking-wider transition-colors h-10 uppercase"
  >
    {isPending ? contact.form.submitting : contact.form.submitButton}
  </Button>

{/* Messaggio di errore */}

   {((formState.errors && Object.keys(formState.errors).length > 0) || formState.message) && (
    <div 
    key="boxError"
    className={cn("mt-4 rounded-md border border-red-900/50 bg-red-950/30 p-3",{
      "hidden": isPending
    })}>
      {formState.errors && (
        <ul className="flex flex-col gap-1 text-xs text-red-400 font-mono">
          {Object.entries(formState.errors).map(([field, messages]) => {
            if (!messages || messages.length === 0) return null;
            const errorKey  = messages[0];
            // Recupera la traduzione oppure usa una chiave di fallback
            const translatedMessage = (t.contact.errors as Record<string, string>)[errorKey] || errorKey;
  
            return (
              <li key={field} className="flex items-center gap-1.5">
                <span className="text-red-500">•</span>
                <span>{translatedMessage}</span>
              </li>
            );
          })}
        </ul>
      )}
  
      {formState.message && (
        <p className={cn("flex justify-start items-center text-xs font-mono text-center gap-2 mt-1 before:h-0.75 before:w-0.75 before:shrink-0 before:rounded-full ",{
          "text-rose-400 before:bg-red-500": !formState.success,
          "text-amber-500 before:bg-amber-500": formState.success
        })}>
          {formState.success ? (t.contact.success as Record<string, string>)[formState.message] || formState.message : (t.contact.errors as Record<string, string>)[formState.message] || formState.message}
        
        </p>
      )}
    </div>
  )}
</form>

          {/* Info Box Cyber / Informazioni aggiuntive (1 Colonna) */}
          <aside className="space-y-6 border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-6">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-amber-500 tracking-wider">
                {contact.infoBox.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {contact.infoBox.responseTime}
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {contact.infoBox.encryptionNote}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-800/60">
              <span className="block text-[10px] text-zinc-400 font-bold">
                {contact.infoBox.directEmail}
              </span>
              <a
                href="mailto:support@thejournal.dev"
                className="text-xs text-amber-500 hover:text-amber-300 transition-colors break-all"
              >
                support@thejournal.dev
              </a>
            </div>


          </aside>
        </div>
      </div>
    </main>
  );
}
