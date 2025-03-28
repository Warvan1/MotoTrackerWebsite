import CarManagerList from '@/components/CarManagerList';
import NavBar from '@/components/NavBar';
import { addUser } from '@/utilities/addUser';
import { fetcher } from '@/utilities/fetcher';
import { fetchImageBase64 } from '@/utilities/imageFetcher';
import { Cars } from '@/utilities/types';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function CarManager() {
    const session = await getSession()
    if(!session) redirect("/api/auth/login")
    await addUser(session)

    let cars: Cars = await fetcher("/getcars", { session: session })

    if(cars !== null){
        for(let i = 0; i < cars.cars.length; i++){
            cars.cars[i].imageSrc = await fetchImageBase64(session, cars.cars[i].car_id)
        }
    }
    else{
        cars = {
            cars: [],
            current_car: 0
        }
    }

    return (
        <div>
            <NavBar sessionBool={true}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Car Manager</p>
            <CarManagerList cars={cars} user={session.user.sub}/>
        </div>
    );
}