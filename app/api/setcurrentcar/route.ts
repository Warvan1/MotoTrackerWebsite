import { fetcher } from "@/utilities/fetcher";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getSession();
    if(!session){
        return NextResponse.json({error: 'token not found'}, { status: 401})
    }

    const body = await req.json()
    if(body.car_id === undefined){
        return NextResponse.json({error: 'car_id required'}, { status: 401})
    }

    return NextResponse.json(await fetcher("/setcurrentcar", {session: session, car_id: body.car_id}))
}