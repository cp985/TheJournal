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




export type AuthUserByEmail = {
  email?: string;
  password?: string;
  username?: string;
id?:string;
role?:string;
};






//auth dossiers list
export const getDossiers = async (limit?: number): Promise<DbDossier[]> => {
  try {
    const url = limit
      ? process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers?limit=" + limit
      : process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers";
    const response = await fetch(url);
    const data = await response.json();
    return data as DbDossier[];
  } catch (error) {
    console.log(error);
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

export type SignUpFormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined> | null;
  message?: string | null;
  data?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    lang?: string;
  };
};
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

export type AuthFormData = {
  email?: string;
  password?: string;
  username?: string;
  confirmPassword?: string;
};



export type LoginFormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined> | null;
  message?: string | null;
  data?:AuthFormData;
}

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

export type SendEmailFormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined> | null;
  message?: string | null;
  data?: {
    username?: string;
    email?: string;
   subject?: string;
    textarea?: string;
    lang?: string
  };
};
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
    avatar: z.string().optional(), // 👈 Aggiunto avatar allo schema Zod
    oldPassword: z.string().nullable().optional().or(z.literal("")),
    newPassword: z.string().nullable().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const hasNewPassword = data.newPassword && data.newPassword.trim() !== "";

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

      if (!data.oldPassword || data.oldPassword.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "old-password-required",
          path: ["oldPassword"],
        });
      }
    }
  });

export const userUpdate = async (
  prevS: any,
  formData: FormData
): Promise<InitialStateProfile> => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const avatar = (formData.get("avatar") as string) || "icon:detective"; // 👈 Lettura del valore avatar
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
    console.log("Dettaglio errori Zod:", validated.error.flatten().fieldErrors);
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

    // 🚀 Aggiunto avatar al payload inviato al server Render
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
        avatar, // 👈 Restituito al client per l'aggiornamento di NextAuth update()
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
        'Authorization': `Bearer ${token}`,

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
