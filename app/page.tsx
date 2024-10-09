import NavBar from '@/components/NavBar';
import { addUser } from '@/utilities/addUser';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
    const session = await getSession()
    if(session) await addUser(session)

    return (
        <div>
            <NavBar sessionBool={!!session}/>
        </div>
    );
}
