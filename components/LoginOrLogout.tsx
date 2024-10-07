"use client"

type Props = {
    sessionBool: boolean
}

export default function LoginOrLogout({ sessionBool }: Props){

    return (
        <>
            {!sessionBool && <button className="flex m-3 bg-red-600 hover:bg-red-900 rounded-full">
                <a className="block p-3 w-full h-full" href="/api/auth/login">Login</a>
            </button>}
            {sessionBool && <button className="flex m-3 bg-red-600 hover:bg-red-900 rounded-full">
                <a className="block p-3 w-full h-full" href="/api/auth/logout">Logout</a>
            </button>}
        </>
    )
}