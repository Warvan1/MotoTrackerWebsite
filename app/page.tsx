import NavBar from '@/components/NavBar';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
    const session = await getSession();
    //TODO: /getUser and /addUser if needed api call on page load? for all pages?

    return (
        <div>
            <NavBar sessionBool={!!session}/>
        </div>
    );
}
