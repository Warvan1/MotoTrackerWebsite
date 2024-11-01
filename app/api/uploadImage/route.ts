import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getSession();
    if(!session){
        return NextResponse.json({error: 'token not found'}, { status: 401 })
    }
    const url = new URL(req.url)
    const car_id = url.searchParams.get("car_id");

    if(!car_id){
        return NextResponse.json({error: 'car_id not found'}, { status: 401 })
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null

    if(!file){
        return NextResponse.json({error: 'file not found'}, { status: 401 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const imageBuffer = Buffer.from(arrayBuffer);

    await fetch(`${process.env.AUTH0_API_BASE_URL}/uploadCarImage?car_id=${car_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "image/jpeg",
            Authorization: `Bearer ${session.accessToken}`,
            userid: session.user.sub
        },
        body: imageBuffer
    })

    return NextResponse.json({ message: "Image uploaded successfully" });
}