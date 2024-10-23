import NavBarButton from "./NavBarButton";
import ThemeToggleButton from "./ThemeToggleButton";

type Props = {
    sessionBool: boolean
}

export default async function NavBar({ sessionBool }: Props){

    return (
        <div className="flex justify-center top-0 w-screen bg-primaryContainer">
            <p className="p-4 text-3xl text-text">MotoTracker</p>
            <NavBarButton title="Home" url="/"/>
            <NavBarButton title="Dashboard" url="/Dashboard"/>
            <NavBarButton title="Maintenance Log" url="/MaintenanceLog/1"/>
            <NavBarButton title="Statistics" url="/Statistics"/>
            <NavBarButton title="Car Manager" url="/CarManager"/>
            {!sessionBool && <NavBarButton title="Login" url="/api/auth/login"/>}
            {sessionBool && <NavBarButton title="Logout" url="/api/auth/logout"/>}
            <ThemeToggleButton />
        </div>
    )
}