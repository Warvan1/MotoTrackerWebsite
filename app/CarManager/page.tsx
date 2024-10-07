import CarManagerCard from '@/components/CarManagerCard';
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

    const cars: { cars: Car[], current_car: string } = await fetcher("/getcars", { session: session })

    return (
        <div>
            <NavBar sessionBool={!!session}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Car Manager</p>
            {cars.cars.map((car, index: number) => (
                <CarManagerCard key={index} car={car}/>
            ))}
        </div>
    );
}