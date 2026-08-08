"use server"

import {type DbDossier, type DbUser} from "@/lib/type"
import z from "zod";

//auth dossiers list
export const getDossiers  = async (limit?: number) : Promise<DbDossier[]> =>  {
try{

    const url = limit ? process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers?limit=" + limit : process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers";
    const response = await fetch(url);
    const data = await response.json();
    return data as DbDossier[];
} catch (error) {
    console.log(error);
    return [];
}
}




export const getDossierByCode  = async (code:string) : Promise<DbDossier[]> =>  {
try{
    const response = await fetch(process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers/" + code);
    const data = await response.json();
    console.log(data);
    return data as DbDossier[];
} catch (error) {
    console.log(error);
    return [];
}
}


// signup

const userZodSchema =z.object({
    username: z.string().max(20, { message: "Username must be at most 20 characters long" }).min(4, { message: "Username must be at least 3 characters long" }),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });


export type SignUpFormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined> | null;
  message?: string | null;
  data?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};
export const userSignUp= async (_prevs : SignUpFormState , formData : FormData) : Promise<SignUpFormState> =>  {
const validatedForm = {
username: formData.get("username") as string || "",
email: formData.get("email") as string || "",
password: formData.get("password") as string || "",
confirmPassword: formData.get("confirmPassword") as string || "",

};

    try{


const validation = userZodSchema.safeParse(validatedForm);



if (!validation.success) {
    return {
        success : false as const,
         errors: validation.error.flatten().fieldErrors,
         data: validatedForm
        } 
}

    const response = await fetch(process.env.NEXT_PUBLIC_URL_RENDER + "/users/signup",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                username: validation.data.username,
                email: validation.data.email,
                password: validation.data.password,
            }
        )
    });
    const data = await response.json();
    if(!response.ok){
        return {
            success: false as const,
            message: "Connection fatal error",
            errors: null,
            data : validatedForm
        }
    }
    console.log('user signed',data);
    return {
        success: true as const,
        errors: null,
        message: "User signed up successfully",
       
    } ;
} catch (error) {
    console.log(error);
    return {
        success: false as const,
        message: "Connection error",
        errors: null,
        data : validatedForm
      
    }
}
}


