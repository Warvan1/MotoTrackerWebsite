import { fetcher } from "@/utilities/fetcher";
import { FetcherOptions } from "@/utilities/types";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const session = await getSession();
    if(!session){
        return NextResponse.json({error: 'token not found'}, { status: 401 })
    }

    const body = await req.json();

    if(typeof body.url !== "string"){
        return NextResponse.json({error: 'url not found'}, { status: 401 })
    }

    const options: FetcherOptions = {
        session: session 
    }

    if(typeof body.method === "string") options.method = body.method
    if(typeof body.car_id === "number") options.car_id = body.car_id
    if(typeof body.cache === "string") options.cache = body.cache
    if(body.body !== undefined) options.body = body.body
    
    return NextResponse.json(await fetcher(body.url, options));
}