import { fetcher } from "@/utilities/fetcher";
import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST'){
        return res.status(401).json({error: 'use a post request'})
    }
    const session = await getSession(req, res);
    if(!session){
        return res.status(401).json({error: 'token not found'})
    }

    return res.status(200).json(await fetcher("/setcurrentcar", {session: session, car_id: req.body.car_id}))
}