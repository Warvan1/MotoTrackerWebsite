import AddMaintenanceLog from '@/components/AddMaintenanceLog';
import Card from '@/components/Card';
import DashboardCard from '@/components/DashboardCard';
import DisplayImage from '@/components/DisplayImage';
import NavBar from '@/components/NavBar';
import { addUser } from '@/utilities/addUser';
import { fetcher } from '@/utilities/fetcher';
import { fetchImageBase64 } from '@/utilities/imageFetcher';
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

    let imageSrc = ""
    if(currentCar !== null) imageSrc = await fetchImageBase64(session, currentCar?.car_id);

    return (
        <div>
            <NavBar sessionBool={true}/>
            {currentCar != null && <>
                <p className='flex justify-center p-2 text-text text-lg'>Dashboard</p>
                <div className='flex justify-center'>
                    <AddMaintenanceLog currentCar={currentCar}/>
                </div>
                <Card>
                    <div className='flex'>
                        <p className="p-1 text-xl text-text">{currentCar.name}</p>
                    </div>
                    <div className='flex'>
                        <p className="py-1 pr-8 pl-1 text-sm text-text">{currentCar.year}</p>
                        <p className="py-1 pr-8 pl-1 text-sm text-text">{currentCar.make}</p>
                        <p className="py-1 pr-8 pl-1 text-sm text-text">{currentCar.model}</p>
                    </div>
                    <div className='flex'>
                        <p className="py-1 pr-8 pl-1 text-sm text-text">Total Costs: {currentCar.total_costs}</p>
                    </div>
                    <div className='flex'>
                        <p className="py-1 pr-8 pl-1 text-sm text-text">Miles: {currentCar.miles}</p>
                    </div>
                </Card>
                {imageSrc != "" && <Card>
                    <DisplayImage imageSrc={imageSrc} />
                </Card>}
                <Card>
                    <div className='flex'>
                        <p className="p-1 text-xl text-text">Fuel</p>
                    </div>
                    <div className='flex'>
                        <p className="py-1 pr-8 pl-1 text-sm text-text">Miles Per Gallon: {mpg}</p>
                    </div>
                    <div className='flex'>
                        <p className="py-1 pr-8 pl-1 text-sm text-text">Dollars Per Gallon: {dpg}</p>
                    </div>
                    <div className='flex'>
                        <p className="py-1 pr-8 pl-1 text-sm text-text">Dollars Per Mile: {dpm}</p>
                    </div>
                </Card>
                <DashboardCard title="Oil Change" timestamp={parseInt(currentCar.oil_change_time)} milesDifference={currentCar.miles - currentCar.oil_change_miles} />
                <DashboardCard title="Tire Rotation" timestamp={parseInt(currentCar.tire_rotation_time)} milesDifference={currentCar.miles - currentCar.tire_rotation_miles} />
                <DashboardCard title="Air Filter" timestamp={parseInt(currentCar.air_filter_time)} milesDifference={currentCar.miles - currentCar.air_filter_miles} />
                <DashboardCard title="Inspection" timestamp={parseInt(currentCar.inspection_time)} milesDifference={null} />
                <DashboardCard title="Registration" timestamp={parseInt(currentCar.registration_time)} milesDifference={null} />
            </>}
        </div>
    );
}