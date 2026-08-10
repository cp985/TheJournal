"use server";

import { type DbDossier } from "@/lib/type";
import z from "zod";


//user by email



export type AuthUserByEmail = {
  email?: string;
  password?: string;
  username?: string;
id?:string;
role?:string;
};



export type UserByEmail = {
  success: boolean;
  error?: Record<string, string[] | undefined> | null;
  message?: string | null;
  data?:AuthUserByEmail | null;
}
export const userByEmail = async (email: string
): Promise<UserByEmail> => {
try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_RENDER + "/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
   
        }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false as const,
        error: data.error || data.message,
        message: data.message || data.error || "server-error",
        data: null,
      };
    }
    return {
      success: true as const,
      message: "success",
     error: null,
      data: data,
    };
  } catch (error) { 
    console.log(error );
    return {
      success: false as const,
      message: "connection-error",
      error:{errore1:["server-error"],errore2: ["connection-error"]},
      data: null,
    };
  }
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
      .min(4, { message: "username-too-short" }),
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

  try {
    const validation = userSignUpZodSchema.safeParse(validatedForm);

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
    return {
      success: true as const,
      errors: null,
      message: "user-signed-up",
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
};


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

  try {
    const validation = userLogInZodSchema.safeParse(validatedForm);

    if (!validation.success) {
      return {
        success: false as const,
        errors: validation.error.flatten().fieldErrors,
        data: validatedForm,
      };
    }

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
    return {
      success: true as const,
      errors: null,
      message: "user-logged-in",
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
};


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
};