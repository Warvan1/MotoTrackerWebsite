type Options = {
    method?: string,
    body?: BodyInit
}

export async function clientFetcher(url: string, options: Options){
    if(options.method === undefined){
        options.method = "GET"
    }

    try{
        const res = await fetch(`${url}`, {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: options.body
        });

        return await res.json();
    }
    catch(error){
        console.error('error fetching data', error);
    }

}