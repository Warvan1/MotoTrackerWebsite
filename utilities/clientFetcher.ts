export async function clientFetcher(body: object){
    try{
        const res = await fetch("/api/serverfetcherproxy", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        return await res.json();
    }
    catch(error){
        console.error('error fetching data', error);
    }
}