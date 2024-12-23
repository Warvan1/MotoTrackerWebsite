import { redirect } from "next/navigation";
import { FetcherOptions } from "./types";

export async function fetcher(url: string, options: FetcherOptions){
    if(options.method === undefined){
        options.method = "GET"
    }
    let prefix = "?"
    if(options.car_id !== undefined){
        url = `${url}${prefix}car_id=${options.car_id}`
        prefix = "&"
    }
    if(options.filter !== undefined){
        url = `${url}${prefix}filter=${options.filter}`
        prefix = "&"
    }
    if(options.page !== undefined){
        url = `${url}${prefix}page=${options.page}`
        prefix = "&"
    }
    if(options.statistics !== undefined){
        url = `${url}${prefix}statistics=${options.statistics}`
        prefix = "&"
    }
    if(options.maintenance_id !== undefined){
        url = `${url}${prefix}maintenance_id=${options.maintenance_id}`
    }

    const fetchOptions: RequestInit = {
        method: options.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${options.session.accessToken}`,
            userid: options.session.user.sub
        },
    }

    if(options.cache !== undefined){
        fetchOptions.cache = options.cache
    }
    if(options.body !== undefined){
        fetchOptions.body = JSON.stringify(options.body)
    }

    try{
        const res = await fetch(`${process.env.AUTH0_API_BASE_URL}${url}`, fetchOptions);
        //if the api returns 401 it is probably because of an expired auth0 key
        //this shouldnt happen often so just logout
        if(res.status === 401){
            redirect("/api/auth/logout")
        }
        else{
            return await res.json();
        }
    } catch (error) {
        //catch network conectivity errors
        if(error instanceof TypeError){
            redirect("/FailedConnection")
        }
    }
}