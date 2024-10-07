"use client";
import { Claims } from "@auth0/nextjs-auth0";

type Props = {
    userData: Claims
}

export default function Profile({ userData }: Props){

    console.log(userData);

    return (
        <div className="p-6">
            <p>{userData.email}</p>
        </div>
    )
}