import NavBar from '@/components/NavBar';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
    const session = await getSession();

    return (
        <div>
            <NavBar sessionBool={!!session}/>
        </div>
    );
}
