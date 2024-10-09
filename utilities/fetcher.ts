import { Session } from "@auth0/nextjs-auth0";

type Options = {
    method?: string,
    session: Session,
    car_id?: number,
    body?: BodyInit,
    cache?: RequestCache
}

export async function fetcher(url: string, options: Options){
    if(options.method === undefined){
        options.method = "GET"
    }
    if(options.car_id !== undefined){
        url = `${url}?car_id=${options.car_id}`
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

    const res = await fetch(`${process.env.AUTH0_API_BASE_URL}${url}`, fetchOptions);
    const data = await res.json();
    return data;
}