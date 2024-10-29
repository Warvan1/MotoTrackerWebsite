import NavBar from '@/components/NavBar';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
    const session = await getSession()

    return (
        <div>
            <NavBar sessionBool={!!session}/>
            <p className='flex justify-center p-2 text-text text-lg'>Failed To Connect To Server</p>
        </div>
    )
}