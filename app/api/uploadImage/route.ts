import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getSession();
    if(!session){
        return NextResponse.json({error: 'token not found'}, { status: 401 })
    }
    const url = new URL(req.url)
    const car_id = url.searchParams.get("car_id");

    if(!car_id) {
        return NextResponse.json({error: 'car_id not found'}, { status: 401 })
    }

    const contentType = req.headers.get("content-type")
    if(contentType !== "image/jpeg") {
        return NextResponse.json({error: 'only jpeg images allowed'}, { status: 401 })
    }

    const imageBuffer = await req.arrayBuffer()

    await fetch(`${process.env.AUTH0_API_BASE_URL}/uploadCarImage?car_id=${car_id}`, {
        method: "POST",
        headers: {
            "Content-Type": contentType,
            Authorization: `Bearer ${session.accessToken}`,
            userid: session.user.sub
        },
        body: imageBuffer
    })

    return NextResponse.json({ message: "Image uploaded successfully" });
}