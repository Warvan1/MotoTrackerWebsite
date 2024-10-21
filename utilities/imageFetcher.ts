import { Session } from "@auth0/nextjs-auth0";

export async function fetchImageBase64(session: Session ,car_id : number){
    const res = await fetch(`${process.env.AUTH0_API_BASE_URL}/downloadCarImage?car_id=${car_id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            userid: session.user.sub
        }
    })
    if(!res.ok) return ""

    const buffer = await res.arrayBuffer()
    const base64String = Buffer.from(buffer).toString('base64')

    return `data:image/jpeg;base64,${base64String}`
}