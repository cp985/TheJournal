

import { useLanguage } from "@/context/maincontext";
import { cn } from "@/lib/utils";

interface ErrorsBoxProps {
  formData: {
    success: boolean;
    errors?: Record<string, string[] | undefined> | null;
    message?: string | null;
    data?: any;
  };
  isPending: boolean;
  page?: string; 
}

function resolveDictPath(dict: unknown, path: string): any {
  return path
    .split(".")
    .reduce<any>(
      (acc, key) => (acc && typeof acc === "object" ? acc[key] : undefined),
      dict
    );
}


export default function ErrorsBox(props: ErrorsBoxProps) {
  const { t } = useLanguage();
  const { formData, isPending, page = "login" } = props;

  const pageLocale = resolveDictPath(t, page) as
    | { errors?: Record<string, string>; success?: Record<string, string> }
    | undefined;

  const errorsDict = pageLocale?.errors ?? {};
  const successDict = pageLocale?.success ?? {};

  return (
    <>
      {((formData.errors && Object.keys(formData.errors).length > 0) ||
        formData.message) && (
        <div
          key="boxError"
          className={cn(
            "mt-4 rounded-md border border-red-900/50 bg-red-950/30 p-3",
            { hidden: isPending }
          )}
        >
          {formData.errors && (
            <ul className="flex flex-col gap-1 text-xs text-red-400 font-mono">
              {Object.entries(formData.errors).map(([field, messages]) => {
                if (!messages || messages.length === 0) return null;
                const errorKey = messages[0];
                const translatedMessage = errorsDict[errorKey] || errorKey;

                return (
                  <li key={field} className="flex items-center gap-1.5">
                    <span className="text-red-500">•</span>
                    <span>{translatedMessage}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {formData.message && (
            <p
              className={cn(
                "flex justify-start items-center text-xs font-mono text-center gap-2 mt-1 before:h-0.75 before:w-0.75 before:shrink-0 before:rounded-full",
                {
                  "text-rose-400 before:bg-red-500": !formData.success,
                  "text-amber-500 before:bg-amber-500": formData.success,
                }
              )}
            >
              {formData.success
                ? successDict[formData.message] || formData.message
                : errorsDict[formData.message] || formData.message}
            </p>
          )}
        </div>
      )}
    </>
  );
}