import AddCarButton from '@/components/AddCarButton';
import CarManagerList from '@/components/CarManagerList';
import NavBar from '@/components/NavBar';
import { fetcher } from '@/utilities/fetcher';
import { Car } from '@/utilities/types';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function CarManager() {
    const session = await getSession();
    if(!session){
        redirect("/api/auth/login");
    }

    const cars: { cars: Car[], current_car: number } = await fetcher("/getcars", { session: session })

    return (
        <div>
            <NavBar sessionBool={true}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Car Manager</p>
            <AddCarButton/>
            <CarManagerList cars={cars}/>
        </div>
    );
}