import NavBar from '@/components/NavBar';
import { fetcher } from '@/utilities/fetcher';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const session = await getSession();

    if(!session){
        redirect("/api/auth/login");
    }

    const currentCar = await fetcher("/getcurrentcar", { session: session })

    console.log(currentCar)

    return (
        <div>
            <NavBar sessionBool={!!session}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Dashboard</p>

        </div>
    );
}