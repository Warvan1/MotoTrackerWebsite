import { Session } from "@auth0/nextjs-auth0";
import { fetcher } from "./fetcher";

export async function addUser(session: Session){
    await fetcher("/adduser", {
        method: 'POST',
        session: session,
        body: {
            userid: session.user.sub,
            email: session.user.email,
            email_verified: session.user.email_verified
        }
    })
}