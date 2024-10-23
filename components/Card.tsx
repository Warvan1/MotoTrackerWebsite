import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Card({ children }: Props){

    return (
        <div className="flex justify-center">
            <div className="m-3 p-3 w-[24rem] bg-primaryContainer rounded-3xl">
                {children}
            </div>
        </div>
    )
}