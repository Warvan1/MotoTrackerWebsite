import { Session } from "@auth0/nextjs-auth0";

type Options = {
    method?: string,
    session: Session,
}

export async function fetcher(url: string, options: Options){
    if(options.method === undefined){
        options.method = "GET"
    }

    const res = await fetch(`${process.env.AUTH0_AUDIENCE}${url}`, {
        method: 'GET',
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