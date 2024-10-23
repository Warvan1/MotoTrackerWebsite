type Props = {
    title: string
    url: string
}

export default function NavBarButton({ title, url }: Props){

    return (
        <a href={url}>
            <button className="flex m-3 p-3 bg-primary hover:bg-primaryContrast text-textButton rounded-full">{title}</button>
        </a>
    )
}