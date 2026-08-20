"use server";

import { DbEvidence, type DbDossier, type DbUser } from "@/lib/type";
import z from "zod";
import { signIn, signOut } from "@/auth/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import {auth} from '@/auth/auth'
import { InitialStateProfile } from "@/components/layout/profileEditDialog";
import { type FormActionState  ,type SendEmailFormState, type LoginFormState,  type SignUpFormState, type HealthStatus, type ActionState } from "@/lib/type"










//auth dossiers list


export const getDossiers = async (): Promise<DbDossier[]> => {
  try {
    const session = await auth();

    if (!session?.user) {
      return [];
    }
    const headers: Record<string, string> = {};

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if(!secret){
    return [];
  }
    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email },
      secret,
      { expiresIn: "5m" }
    );
    headers["Authorization"] = `Bearer ${token}`;


    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_RENDER}/dossiers`, {
      headers, 
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Errore Fetch Dossiers Status:", response.status);
      return [];
    }

    const data = await response.json();
    return data as DbDossier[];
  } catch (error) {
    console.error("Errore getDossiers:", error);
    return [];
  }
};


export const getDossierByCode = async (code: string): Promise<DbDossier[]> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers/" + code,
    );
    const data = await response.json();
    return data as DbDossier[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

//get users
export const getUsers = async (): Promise<DbUser[]> => {
  try {
       const session = await auth();

    if (!session?.user?.id) {
      console.error("user-not-authenticated");
      return [];
    }

    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("jwt-secret-not-set");
      return [];
    }

    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email, role: session.user.role },
      secret,
      { expiresIn: "5m" }
    );
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_RENDER + "/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Error Fetch Status:", response.status);
        return [];
      }
   
      const data = await response.json();
    
    return data as DbUser[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// signup

const userSignUpZodSchema = z
  .object({
    username: z
      .string()
      .max(20, { message: "username-too-long" })
      .min(4, { message: "username-too-short" }).regex(/^[a-zA-Z0-9_-]+$/, { message: "username-no-symbols" }),
    email: z.string().email({ message: "invalid-email" }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: "password-too-weak-8-Aa-@$!%*?&" },
      ),
    confirmPassword: z.string(),
    lang: z.enum(["IT", "EN"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords-do-not-match",
    path: ["confirmPassword"],
  });


export const userSignUp = async (
  _prevs: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> => {
  const validatedForm = {
    username: (formData.get("username") as string) || "",
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
    confirmPassword: (formData.get("confirmPassword") as string) || "",
    lang: (formData.get("lang") as string) || "",
  };
    const validation = userSignUpZodSchema.safeParse(validatedForm);

  try {

    if (!validation.success) {
      return {
        success: false as const,
        errors: validation.error.flatten().fieldErrors,
        data: validatedForm,
      };
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_RENDER + "/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: validation.data.username,
          email: validation.data.email,
          password: validation.data.password,
          lang: validation.data.lang,
        }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false as const,
        message: data.message || data.error || "server-error",
        errors: null,
        data: validatedForm,
      };
    }

  } catch (error) {
    console.log(error);
    return {
      success: false as const,
      message: "connection-error",
      errors: null,
      data: validatedForm,
    };
  }
    try{
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    });

  revalidatePath("/", "layout");

 

  }
  catch(error){
      if (error instanceof AuthError) {
      return { success: false, 
        message: "auth-error",
        errors: null,
        data: validatedForm,

    }
  }  throw error;
};
  redirect("/profile");
};


// login







const userLogInZodSchema = z
  .object({
    email: z.string().email({ message: "invalid-email" }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: "password-too-weak-8-Aa-@$!%*?&" },
      ),
  })


export const userLogin = async (
  _prevs: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> => {
  const validatedForm = {
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
  };
    const validation = userLogInZodSchema.safeParse(validatedForm);

   if (!validation.success) {
      return {
        success: false as const,
        errors: validation.error.flatten().fieldErrors,
        data: validatedForm,
      };
    }

  try {


    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_RENDER + "/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validation.data.email,
          password: validation.data.password,
        }),
      },
    );


    const data = await response.json();


    if (!response.ok) {
      return {
        success: false as const,
        message: data.message || data.error || "server-error",
        errors: null,
        data: validatedForm,
      };
    }


  } catch (error) {
    console.log(error);

    return {
      success: false as const,
      message: "connection-error",
      errors: null,
      data: validatedForm,
    };
  
  }

  try{
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    });

  revalidatePath("/", "layout");

 

  }
  catch(error){
      if (error instanceof AuthError) {
      return { success: false, 
        message: "auth-error",
        errors: null,
        data: validatedForm,

    }
  }  throw error;
};
  redirect("/profile");
}


//oauth login/signup


export async function userOauth(prevState: any, formData: FormData) {
  const provider = formData.get("provider") as string;

  if (!provider) {
    return { error: "Provider non specificato" };
  }

  await signIn(provider, { redirectTo: "/profile" });
}





//sendmail action

const userSendEmailZodSchema = z
  .object({
    username: z
      .string()
      .max(20, { message: "username-too-long" })
      .min(4, { message: "username-too-short" }),
    email: z.string().email({ message: "invalid-email" }),
    subject: z.string().min(1, { message: "subject-too-short" }).max(20, { message: "subject-too-long" }),
    textarea: z.string().min(10, { message: "message-too-short" }).max(1000, { message: "message-too-long" }),
  lang: z.enum(["IT", "EN"] ),

  })


export const sendEmail = async (
  _prevs: SendEmailFormState,
  formData: FormData,
): Promise<SendEmailFormState> => {
  const validatedForm = {
    username: (formData.get("username") as string) || "",
    email: (formData.get("email") as string) || "",
    subject: (formData.get("subject") as string) || "",
    textarea: (formData.get("textarea") as string) || "",
    lang: (formData.get("lang") as string) || "",
  };

 

  try {
    const validation = userSendEmailZodSchema.safeParse(validatedForm);

    if (!validation.success) {
      return {
        success: false as const,
        errors: validation.error.flatten().fieldErrors,
        data: validatedForm,
      };
    }

    

    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_RENDER + "/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: validation.data.username,
          email: validation.data.email,
          subject: validation.data.subject,
          textarea: validation.data.textarea,
          lang: validation.data.lang
        }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false as const,
        message: data.message || data.error || "server-error",
        errors: null,
        data: validatedForm,
      };
    }
    return {
      success: true as const,
      errors: null,
      message: "email-sent",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false as const,
      message: "connection-error",
      errors: null,
      data: validatedForm,
    };
  }
}

//evidence get all

export const getEvidences = async (): Promise<DbEvidence[]> => {
  try {
  
           const session = await auth();

    if (!session?.user?.id) {
      console.error("user-not-authenticated");
      return [];
    }

    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("jwt-secret-not-set");
      return [];
    }

    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email, role: session.user.role },
      secret,
      { expiresIn: "5m" }
    );

    const headers: Record<string, string> = {};



 

    headers["Authorization"] = `Bearer ${token}`;


    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_RENDER}/evidences`, {
      headers, 
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Errore Fetch Dossiers Status:", response.status);
      return [];
    }

    const data = await response.json();
    return data as DbEvidence[];
  } catch (error) {
    console.error("Errore getDossiers:", error);
    return [];
  }
};

//evidence by id user



export const getEvidenceByUserId = async (): Promise<DbEvidence[]> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      console.error("Utente non autenticato");
      return [];
    }

    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("AUTH_SECRET non trovato nelle variabili d'ambiente di Next.js");
      return [];
    }

    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email },
      secret,
      { expiresIn: "5m" }
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_RENDER}/evidences/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`Errore risposta backend: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data as DbEvidence[];
  } catch (error) {
    console.error("Errore fetch evidence:", error);
    return [];
  }
};

//user update



const profileZodSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "username-too-short" })
      .max(20, { message: "username-too-long" })
      .regex(/^[a-zA-Z0-9_-]+$/, { message: "username-no-symbols" }),
    email: z.string().email({ message: "invalid-email" }),
    lang: z.enum(["IT", "EN"]),
    avatar: z.string().optional(), 
    oldPassword: z.string().nullable().optional().or(z.literal("")),
    newPassword: z.string().nullable().optional().or(z.literal("")),
  })
 .superRefine((data, ctx) => {
  const hasNewPassword = data.newPassword && data.newPassword.trim() !== "";
  const hasOldPassword = data.oldPassword && data.oldPassword.trim() !== "";

  if (hasNewPassword) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(data.newPassword!)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "password-too-weak-8-Aa-@$!%*?&",
        path: ["newPassword"],
      });
    }

    if (!hasOldPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "old-password-required",
        path: ["oldPassword"],
      });
    }
  }

  if (hasOldPassword && !hasNewPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "new-password-required",
      path: ["newPassword"],
    });
  }
});

export const userUpdate = async (
  prevS: any,
  formData: FormData
): Promise<InitialStateProfile> => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const avatar = (formData.get("avatar") as string) || "icon:detective"; 
  const lang = ((formData.get("lang") as string) || "IT") as "IT" | "EN";
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  const validated = profileZodSchema.safeParse({
    username,
    email,
    avatar,
    newPassword,
    oldPassword,
    lang,
  });

  if (!validated.success) {
    return {
      success: false as const,
      errors: validated.error.flatten().fieldErrors,
      message: null,
      data: {
        username,
        email,
        avatar,
        oldPassword,
        newPassword,
        lang,
      },
    };
  }

  try {
    const session = await auth();

    if (!session?.user?.id) {
      console.error("user-not-authenticated");
      return {
        success: false as const,
        errors: null,
        message: "user-not-authenticated",
        data: {
          username,
          email,
          avatar,
          oldPassword,
          newPassword,
          lang,
        },
      };
    }

    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("Auth-secret-not-found");
      return {
        success: false as const,
        errors: null,
        message: "auth-secret-not-found",
        data: {
          username,
          email,
          avatar,
          oldPassword,
          newPassword,
          lang,
        },
      };
    }

    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email },
      secret,
      { expiresIn: "5m" }
    );

    const payload: Record<string, string> = { username, lang, email, avatar };

    if (oldPassword && newPassword) {
      payload.oldPassword = oldPassword;
      payload.newPassword = newPassword;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_RENDER}/users`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return {
        success: false as const,
        errors: null,
        message: "invalid-credentials",
        data: {
          username,
          email,
          avatar,
          oldPassword,
          newPassword,
          lang,
        },
      };
    }

    const data = await response.json();
    revalidatePath("/profile");

    return {
      success: true as const,
      errors: null,
      message: "user-updated",
      data: {
        username,
        email,
        avatar, 
        oldPassword,
        newPassword,
        lang,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false as const,
      errors: null,
      message: "fatal-error",
      data: {
        username,
        email,
        avatar,
        oldPassword,
        newPassword,
        lang,
      },
    };
  }
};

export const userRoleAdmin = async (userId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      console.error("user-not-authenticated");
      return {
        success: false as const,
        message: "user-not-authenticated",
      };
    }

    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("auth-secret-not-found");
      return {
        success: false as const,
        message: "auth-secret-not-found",
      };
    }

    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email ,role: session.user.role},
      secret,
      { expiresIn: "5m" }

    );
    

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_RENDER}/users/admin`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (!response.ok) {
      console.error(`[Express Error] Status: ${response.status}`, response);
      return {
        success: false as const,
        message: "user-not-authenticated",
      };
    }

    const data = await response.json();
    revalidatePath("/admin");

    return {
      success: true as const,
      message: "user-updated-role",
      data,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false as const,
      errors: null,
      message: "fatal-error",
      data: null,
    };
  }
};

export const  userDelete= async () =>{
 let isDeleting = false;
  try {
    const session = await auth();
    if(!session?.user?.id){
      console.error("Utente non autenticato");
      return {
        success: false as const,
        message: "user-not-authenticated",
        
      };
    }
        const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("Auth-secret-not-found");
      return {
        success: false as const,
        message: "auth-secret-not-found",
      };
    }

    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email },
      secret,
      { expiresIn: "5m" }
    );


    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_RENDER}/users/me`, 
      {method:"DELETE", 
        headers:{"Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

        },
      
      });
 
        if(!response.ok){
          console.error(`Error: ${response.status}`);
          return {
            success: false as const,
            message: "user-not-authenticated",
          };
        }
    isDeleting = true;
    

    
}
catch(error){
  console.error("Error:", error);
  return {
    success: false as const,
    errors: null,
    message: "fatal-error",
    data: null,
  };
}

if(isDeleting){
  revalidatePath("/profile");
await signOut({ redirectTo: "/" });

}}

export const userDeleteAdmin = async (userId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      console.error("user-not-authenticated");
      return {
        success: false as const,
        message: "user-not-authenticated",
      };
    }

    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("auth-secret-not-found");
      return {
        success: false as const,
        message: "auth-secret-not-found",
      };
    }

    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email ,role: session.user.role},
      secret,
      { expiresIn: "5m" }

    );
    

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_RENDER}/users/admin`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (!response.ok) {
      console.error(`[Express Error] Status: ${response.status}`, response);
      return {
        success: false as const,
        message: "user-not-authenticated",
      };
    }

    const data = await response.json();
    revalidatePath("/admin");

    return {
      success: true as const,
      message: "user-deleted",
      data,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false as const,
      errors: null,
      message: "fatal-error",
      data: null,
    };
  }
};


export const userExportData = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      console.error("user-not-authenticated");
      return {
        success: false as const,
        message: "user-not-authenticated",
        data: null,
        fileName: null,
      };
    }

    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("auth-secret-not-found");
      return {
        success: false as const,
        message: "auth-secret-not-found",
        data: null,
        fileName: null,
      };
    }

    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email },
      secret,
      { expiresIn: "5m" }
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_RENDER}/users/me/export`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return {
        success: false as const,
        message: "export-failed",
        data: null,
        fileName: null,
      };
    }

    const jsonData = await response.text();

    return {
      success: true as const,
      data: jsonData,
      message: "ok",
      fileName: `data-export-${session.user.id}-${Date.now()}.json`,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false as const,
      message: "fatal-error",
      data: null,
      fileName: null,
    };
  }
};

//user send evidence



const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const evidenceSchema = z.object({
  dossierId: z.string().min(1, { message: "dossierId-not-selected" }),
  type: z.enum(["PHOTO", "DOCUMENT", "VIDEO", "AUDIO", "OTHER"]),
  notes: z
    .string()
    .min(15, { message: "notes-too-short" })
    .max(60, { message: "notes-too-long" }),
  fileName: z
    .string()
    .max(40, { message: "file-name-too-long" })
    .min(3, { message: "file-name-too-short" }),
  file: z
    .custom<File>((val) => val instanceof File && val.size > 0, {
      message: "file-missing",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "file-too-large",
    })
    .refine((file) => ALLOWED_MIME_TYPES.includes(file.type), {
      message: "invalid-file-format",
    }),
});



export async function createEvidenceAction(
  prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const dossierId = formData.get("dossierId") as string;
  const type = formData.get("type") as string;
  const notes = formData.get("notes") as string;
  const fileName = formData.get("fileName") as string;
  const file = formData.get("file") as File;

  const data = { dossierId, type, notes, fileName };

  const validationResult = evidenceSchema.safeParse({
    dossierId,
    type,
    notes,
    file,
    fileName,
  });

  if (!validationResult.success) {
    const errorCodes = validationResult.error.flatten().fieldErrors;
    return {
      errors: errorCodes,
      data,
      success: false,
    };
  }

  try {
    const session = await auth();
    if (!session?.user?.id) {
      console.error("user-not-authenticated");
      return {
        success: false,
        message: "user-not-authenticated",
        data,
      };
    }

    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("auth-secret-not-found");
      return {
        success: false,
        message: "auth-secret-not-found",
        data,
      };
    }

    const token = jwt.sign(
      { sub: session.user.id, email: session.user.email },
      secret,
      { expiresIn: "5m" }
    );

    const payload = new FormData();
    payload.append("dossierId", dossierId);
    payload.append("type", type);
    payload.append("notes", notes);
    payload.append("fileName", fileName);
    payload.append("file", file, file.name);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_RENDER}/evidences`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      }
    );

    if (!response.ok) {
      const rawErrorText = await response.text();
  console.error("❌ Risposta di errore grezza da Render (Status:", response.status, "):", rawErrorText);
      const errorResponse = await response.json().catch(() => null);
      return {
        errors: errorResponse?.errors || null,
        message: errorResponse?.message || "error-creating-evidence",
        data,
        success: false,
      };
    }
 revalidatePath("/profile");
    return {
      errors: null,
      message: "evidence-created",
      data: { dossierId: "", type: "PHOTO", notes: "", fileName: "" },
      success: true,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      errors: null,
      message: "error-creating-evidence-catch",
      data,
      success: false,
    };
  }
}

//health check





export const getHealth = async (): Promise<HealthStatus> => {
  const baseUrl = process.env.RENDER_API_URL || process.env.NEXT_PUBLIC_URL_RENDER;

  if (!baseUrl) {
    console.error("[HealthCheck] backend-url-not-found");
    return { online: false, message: "Configuration Error" };
  }

  try {
    const response = await fetch(`${baseUrl}/health`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[HealthCheck] error: ${response.status}`);
      return { online: false, message: `HTTP ${response.status}` };
    }

    const data = await response.json();

    return {
      online: true,
      message: data.status || "ok",
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error("[HealthCheck] error (catch):", error);
    return { online: false, message: "Network Error" };
  }
};

//dossier admin edit/create

// --- DOSSIER SCHEMAS ---
 const dossierSchemaAdmin = z.object({
  id: z.string().optional(), 
    code: z
    .string()
    .min(3, "Il codice deve contenere almeno 3 caratteri")
    .max(20, "Il codice non può superare 20 caratteri")
    .regex(/^[A-Za-z0-9-_]+$/, "Solo lettere, numeri, trattini e underscore"),
  title: z.string().min(2, "Il titolo è obbligatorio"),
  title_en: z.string().optional().nullable(),
  description: z.string().min(5, "La descrizione deve contenere almeno 5 caratteri"),
  description_en: z.string().optional().nullable(),
  coverUrl: z.string().min(1, "L'URL della copertina è obbligatorio"),
  status: z.enum(["Open" , "Archived" , "Closed"]).default("Open"),
});







// --- CREA DOSSIER ---
export async function createDossierAdmin(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = dossierSchemaAdmin.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Controlla i campi inseriti e riprova.",
      errors: validatedFields.error.flatten().fieldErrors,
      fields: rawData,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/dossier`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Errore durante la creazione del dossier.",
        errors: result.errors || null,
        fields: rawData,
      };
    }

    revalidatePath("/admin");
    return {
      success: true,
      message: "Dossier creato con successo!",
      errors: null,
    };
  } catch (error) {
    console.error("Errore fetch createDossier:", error);
    return {
      success: false,
      message: "Impossibile contattare il server per creare il dossier.",
      fields: rawData,
    };
  }
}

// --- MODIFICA DOSSIER ---
export async function updateDossierAdmin(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = dossierSchemaAdmin.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Controlla i dati inseriti.",
      errors: validatedFields.error.flatten().fieldErrors,
      fields: rawData,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/dossier`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Errore durante la modifica del dossier.",
        errors: result.errors || null,
        fields: rawData,
      };
    }

    revalidatePath("/admin");
    return {
      success: true,
      message: "Dossier aggiornato con successo!",
      errors: null,
    };
  } catch (error) {
    console.error("Errore fetch updateDossier:", error);
    return {
      success: false,
      message: "Impossibile contattare il server per aggiornare il dossier.",
      fields: rawData,
    };
  }
}

// --- ELIMINA DOSSIER ---
export async function deleteDossierAdmin(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/dossiers`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Errore eliminazione dossier:", error);
  }
}

//evidence admin create update 

// --- EVIDENCE SCHEMAS ---
 const evidenceSchemaAdmin = z.object({
  id: z.string().optional(),
  dossierId: z.string().min(1, "Il codice del Dossier è obbligatorio"),
  type: z.enum(["PHOTO", "PDF", "DOCUMENT"], {
    message: "Seleziona un tipo di prova valido",
  }),
  fileUrl: z.string().min(1, "L'URL del file è obbligatorio"),
  notes: z.string().min(3, "Le note devono contenere almeno 3 caratteri"),
  notes_en: z.string().optional().nullable(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).default("PENDING"),
});




// --- CREA EVIDENCE ---
export async function createEvidence(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = evidenceSchemaAdmin.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Controlla i dati della prova inseriti.",
      errors: validatedFields.error.flatten().fieldErrors,
      fields: rawData,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/evidence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Errore durante il salvataggio della prova.",
        errors: result.errors || null,
        fields: rawData,
      };
    }

    revalidatePath("/admin");
    return {
      success: true,
      message: "Prova aggiunta con successo!",
      errors: null,
    };
  } catch (error) {
    console.error("Errore fetch createEvidence:", error);
    return {
      success: false,
      message: "Impossibile contattare il server per salvare la prova.",
      fields: rawData,
    };
  }
}

// --- MODIFICA EVIDENCE ---
export async function updateEvidence(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = evidenceSchemaAdmin.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Controlla i dati della prova inseriti.",
      errors: validatedFields.error.flatten().fieldErrors,
      fields: rawData,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/evidence`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Errore durante l'aggiornamento della prova.",
        errors: result.errors || null,
        fields: rawData,
      };
    }

    revalidatePath("/admin");
    return {
      success: true,
      message: "Prova aggiornata con successo!",
      errors: null,
    };
  } catch (error) {
    console.error("Errore fetch updateEvidence:", error);
    return {
      success: false,
      message: "Impossibile contattare il server per aggiornare la prova.",
      fields: rawData,
    };
  }
}

// --- ELIMINA EVIDENCE (ID inviato nel Body JSON) ---
export async function deleteEvidence(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/evidence`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    revalidatePath("/admin");
  } catch (error) {
    console.error("Errore eliminazione prova:", error);
  }
}