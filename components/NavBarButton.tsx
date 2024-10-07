type Props = {
    title: string
    url: string
}

export default function NavBarButton({ title, url }: Props){

    return (
        <a href={url}>
            <button className="flex m-3 p-3 bg-red-600 hover:bg-red-900 rounded-full">{title}</button>
        </a>
    )
}