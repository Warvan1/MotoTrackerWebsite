import NavBar from '@/components/NavBar';
import { addUser } from '@/utilities/addUser';
import { fetcher } from '@/utilities/fetcher';
import { Car } from '@/utilities/types';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const session = await getSession()
    if(!session) redirect("/api/auth/login")
    await addUser(session)

    const currentCar: Car | null = await fetcher("/getcurrentcar", { session: session })

    return (
        <div>
            <NavBar sessionBool={true}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Dashboard</p>
            {currentCar != null && <p className='flex justify-center p-2 top-0 w-screen text-white'>{currentCar.name}</p>}
        </div>
    );
}