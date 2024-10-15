import DashboardCard from '@/components/DashboardCard';
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

    let mpg : number = 0
    if(currentCar !== null && currentCar.miles > 0 && parseFloat(currentCar.total_gallons) > 0){
        mpg = Math.round(currentCar.miles / parseFloat(currentCar.total_gallons) * 100) / 100
    }

    let dpg : number = 0
    if(currentCar !== null && parseFloat(currentCar.total_fuel_costs) > 0 && parseFloat(currentCar.total_gallons) > 0){
        dpg = Math.round(parseFloat(currentCar.total_fuel_costs) / parseFloat(currentCar.total_gallons) * 100) / 100
    }

    let dpm : number = 0
    if(currentCar !== null && parseFloat(currentCar.total_fuel_costs) > 0 && currentCar.miles > 0){
        dpm = Math.round(parseFloat(currentCar.total_fuel_costs) / currentCar.miles * 100) / 100
    }

    return (
        <div>
            <NavBar sessionBool={true}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Dashboard</p>
            {currentCar != null && <>
                <p className='flex justify-center p-2 top-0 w-screen text-white'>{currentCar.name}</p>
                <div className='flex justify-center'>
                    <div className="m-3 p-3 w-[24rem] bg-red-600 rounded-3xl">
                        <div className='flex'>
                            <p className="p-1 text-xl">{currentCar.name}</p>
                        </div>
                        <div className='flex'>
                            <p className="py-1 pr-8 pl-1 text-sm">{currentCar.year}</p>
                            <p className="py-1 pr-8 pl-1 text-sm">{currentCar.make}</p>
                            <p className="py-1 pr-8 pl-1 text-sm">{currentCar.model}</p>
                        </div>
                        <div className='flex'>
                            <p className="py-1 pr-8 pl-1 text-sm">Total Costs: {currentCar.total_costs}</p>
                        </div>
                        <div className='flex'>
                            <p className="py-1 pr-8 pl-1 text-sm">Miles: {currentCar.miles}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="m-3 p-3 w-[24rem] bg-red-600 rounded-3xl">
                        <div className='flex'>
                            <p className="p-1 text-xl">Fuel</p>
                        </div>
                        <div className='flex'>
                            <p className="py-1 pr-8 pl-1 text-sm">Miles Per Gallon: {mpg}</p>
                        </div>
                        <div className='flex'>
                            <p className="py-1 pr-8 pl-1 text-sm">Dollars Per Gallon: {dpg}</p>
                        </div>
                        <div className='flex'>
                            <p className="py-1 pr-8 pl-1 text-sm">Dollars Per Mile: {dpm}</p>
                        </div>
                    </div>
                </div>
                <DashboardCard title="Oil Change" timestamp={parseInt(currentCar.oil_change_time)} milesDifference={currentCar.miles - currentCar.oil_change_miles} />
                <DashboardCard title="Tire Rotation" timestamp={parseInt(currentCar.tire_rotation_time)} milesDifference={currentCar.miles - currentCar.tire_rotation_miles} />
                <DashboardCard title="Air Filter" timestamp={parseInt(currentCar.air_filter_time)} milesDifference={currentCar.miles - currentCar.air_filter_miles} />
                <DashboardCard title="Inspection" timestamp={parseInt(currentCar.inspection_time)} milesDifference={null} />
                <DashboardCard title="Registration" timestamp={parseInt(currentCar.registration_time)} milesDifference={null} />
            </>}
        </div>
    );
}