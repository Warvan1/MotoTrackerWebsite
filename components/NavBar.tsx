import LoginOrLogout from "./LoginOrLogout";
import NavBarButton from "./NavBarButton";

type Props = {
    sessionBool: boolean
}

export default async function NavBar({ sessionBool }: Props){

    return (
        <div className="flex justify-center top-0 w-screen bg-blue-600">
            <p className="p-4 text-3xl">MotoTracker</p>
            <NavBarButton title="Home" url="/"/>
            <NavBarButton title="Dashboard" url="/Dashboard"/>
            <NavBarButton title="Maintenance Log" url="/"/>
            <NavBarButton title="Statistics" url="/"/>
            <NavBarButton title="Car manager" url="/"/>
            <LoginOrLogout sessionBool={sessionBool}/>
        </div>
    )
}