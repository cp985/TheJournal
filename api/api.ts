"use server"

import {type DbDossier, type DbUser} from "@/lib/type"

//auth dossiers list
export const getDossiers  = async (limit?: number) : Promise<DbDossier[]> =>  {
try{

    const url = limit ? process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers?limit=" + limit : process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers";
    const response = await fetch(url);
    const data = await response.json();
    console.log('data from api',data);
    return data as DbDossier[];
} catch (error) {
    console.log(error);
    return [];
}
}

//limited dossiers list

// export const getLimitDossiers  = async () : Promise<DbDossier[]> =>  {
// try{
//     const response = await fetch(process.env.NEXT_PUBLIC_URL_RENDER + "/dossiers?limit=3");
//     const data = await response.json();
//     console.log(data);
//     return data as DbDossier[];
// } catch (error) {
//     console.log(error);
//     return [];
// }
// }


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



