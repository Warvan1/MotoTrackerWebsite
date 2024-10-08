import NavBar from '@/components/NavBar';
import { fetcher } from '@/utilities/fetcher';
import { Car } from '@/utilities/types';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const session = await getSession();
    if(!session){
        redirect("/api/auth/login");
    }

    const currentCar: Car = await fetcher("/getcurrentcar", { session: session })

    return (
        <div>
            <NavBar sessionBool={true}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Dashboard</p>
            <p className='flex justify-center p-2 top-0 w-screen text-white'>{currentCar.name}</p>
        </div>
    );
}