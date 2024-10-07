import Link from "next/link";

type Props = {
    title: string
    url: string
}

export default function NavBarButton({ title, url }: Props){

    return (
        <Link href={url}>
            <button className="flex m-3 p-3 bg-red-600 hover:bg-red-900 rounded-full">{title}</button>
        </Link>
    )
}