import { Session } from "@auth0/nextjs-auth0";

type Options = {
    method?: string,
    session: Session,
    car_id?: number
}

export async function fetcher(url: string, options: Options){
    if(options.method === undefined){
        options.method = "GET"
    }
    if(options.car_id !== undefined){
        url = `${url}?car_id=${options.car_id}`
    }

    const res = await fetch(`${process.env.AUTH0_AUDIENCE}${url}`, {
        method: options.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${options.session.accessToken}`,
            userid: options.session.user.sub
        },
        cache: "no-store"
    });
    const data = await res.json();
    return data;
}