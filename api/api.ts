"use server"

import {type DbDossier} from "@/lib/type"

export const getDossiers  = async () : Promise<DbDossier[]> =>  {
try{
    const response = await fetch(process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers");
    const data = await response.json();
    console.log(data);
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



