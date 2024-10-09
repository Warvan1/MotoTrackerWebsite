import { fetcher } from "@/utilities/fetcher";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const session = await getSession();
    if(!session){
        return NextResponse.json({error: 'token not found'}, { status: 401})
    }

    const body = await req.json()

    return NextResponse.json(await fetcher("/addcar", {
        method: 'POST',
        session: session,
        body: body
    }))
}