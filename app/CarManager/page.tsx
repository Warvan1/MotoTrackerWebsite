import CarManagerList from '@/components/CarManagerList';
import NavBar from '@/components/NavBar';
import { addUser } from '@/utilities/addUser';
import { fetcher } from '@/utilities/fetcher';
import { Cars } from '@/utilities/types';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function CarManager() {
    const session = await getSession()
    if(!session) redirect("/api/auth/login")
    await addUser(session)

    const cars: Cars = await fetcher("/getcars", { session: session })

    return (
        <div>
            <NavBar sessionBool={true}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Car Manager</p>
            <CarManagerList cars={cars}/>
        </div>
    );
}